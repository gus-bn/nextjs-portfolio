'use client';

import { useEffect, useMemo, useState } from 'react';

import type { Availability, TimeRange } from '@/lib/availability';
import { cn } from '@/lib/utils';

/** Minutes since local midnight, start inclusive and end exclusive. */
interface Span {
  from: number;
  to: number;
}

interface DayModel {
  date: string;
  working: Span[];
  busy: Span[];
  free: Span[];
  past: number;
}

const DAY = 1440;

function parts(instant: Date, timeZone: string): { date: string; minutes: number } {
  const values = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(instant)
      .map((part) => [part.type, part.value]),
  );
  return {
    date: `${values.year}-${values.month}-${values.day}`,
    minutes: Number(values.hour) * 60 + Number(values.minute),
  };
}

/** A range cut at local midnights, as minutes on each local date it touches. */
function split(range: TimeRange, timeZone: string, into: Map<string, Span[]>) {
  let cursor = new Date(range.start);
  const end = new Date(range.end);
  while (cursor < end) {
    const local = parts(cursor, timeZone);
    const untilMidnight = new Date(cursor.getTime() + (DAY - local.minutes) * 60_000);
    const pieceEnd = end < untilMidnight ? end : untilMidnight;
    const to = pieceEnd === end ? local.minutes + (end.getTime() - cursor.getTime()) / 60_000 : DAY;
    const list = into.get(local.date) ?? [];
    list.push({ from: local.minutes, to: Math.min(DAY, Math.round(to)) });
    into.set(local.date, list);
    cursor = pieceEnd;
  }
}

function merge(spans: Span[]): Span[] {
  const out: Span[] = [];
  for (const span of [...spans].sort((a, b) => a.from - b.from)) {
    const last = out.at(-1);
    if (last && span.from <= last.to) last.to = Math.max(last.to, span.to);
    else if (span.to > span.from) out.push({ ...span });
  }
  return out;
}

function subtract(base: Span[], cuts: Span[]): Span[] {
  let pieces = base.map((span) => ({ ...span }));
  for (const cut of cuts) {
    pieces = pieces.flatMap((piece) => {
      if (cut.to <= piece.from || cut.from >= piece.to) return [piece];
      const rest: Span[] = [];
      if (piece.from < cut.from) rest.push({ from: piece.from, to: cut.from });
      if (cut.to < piece.to) rest.push({ from: cut.to, to: piece.to });
      return rest;
    });
  }
  return pieces.filter((piece) => piece.to - piece.from >= 15);
}

function buildDays(data: Availability, timeZone: string, now: Date): DayModel[] {
  const working = new Map<string, Span[]>();
  const busy = new Map<string, Span[]>();
  for (const day of data.days) {
    day.working.forEach((range) => split(range, timeZone, working));
    day.busy.forEach((range) => split(range, timeZone, busy));
  }
  const today = parts(now, timeZone);
  // The dates the API answered for. Shown in another zone, the edges of the
  // first and last day can spill outside them; those minutes are dropped.
  return data.days.map((day) => day.date).map((date) => {
    const past = date < today.date ? DAY : date === today.date ? today.minutes : 0;
    const dayWorking = merge(working.get(date) ?? []);
    const dayBusy = merge(busy.get(date) ?? []);
    const free = subtract(dayWorking, [...dayBusy, { from: 0, to: past }]);
    return { date, working: dayWorking, busy: dayBusy, free, past };
  });
}

function clock(minutes: number): string {
  const hours = Math.floor(minutes / 60) % 24;
  const mins = minutes % 60;
  const suffix = hours < 12 ? 'am' : 'pm';
  const twelve = hours % 12 === 0 ? 12 : hours % 12;
  return mins === 0 ? `${twelve}${suffix}` : `${twelve}:${String(mins).padStart(2, '0')}${suffix}`;
}

function dayLabel(date: string, style: 'short' | 'long'): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    weekday: style,
    month: 'short',
    day: 'numeric',
  });
}

function zoneName(timeZone: string): string {
  const city = timeZone.split('/').at(-1)?.replaceAll('_', ' ') ?? timeZone;
  const offset =
    new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'shortOffset' })
      .formatToParts(new Date())
      .find((part) => part.type === 'timeZoneName')?.value ?? '';
  return `${city} (${offset})`;
}

function updatedAgo(iso: string, now: Date): string {
  const minutes = Math.max(0, Math.round((now.getTime() - new Date(iso).getTime()) / 60_000));
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} min ago`;
  return `${Math.round(minutes / 60)} h ago`;
}

export function AvailabilityView({ data }: { data: Availability }) {
  const [viewerZone, setViewerZone] = useState<string | null>(null);
  const [useMine, setUseMine] = useState(false);
  const [now, setNow] = useState(() => new Date(data.generated_at));
  const [week, setWeek] = useState(0);

  // The visitor's zone and the clock are only known in the browser.
  useEffect(() => {
    setViewerZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(timer);
  }, []);

  const differs = viewerZone !== null && viewerZone !== data.time_zone;
  const zone = useMine && differs && viewerZone ? viewerZone : data.time_zone;
  const days = useMemo(() => buildDays(data, zone, now), [data, zone, now]);
  const weeks = [days.slice(0, 7), days.slice(7, 14)].filter((chunk) => chunk.length > 0);
  const shown = weeks[Math.min(week, weeks.length - 1)] ?? [];

  // The grid's hours: the working day, widened to whatever is busy inside it.
  const spans = shown.flatMap((day) => day.working);
  const startHour = spans.length ? Math.floor(Math.min(...spans.map((s) => s.from)) / 60) : 8;
  const endHour = spans.length ? Math.ceil(Math.max(...spans.map((s) => s.to)) / 60) : 20;
  const top = startHour * 60;
  const height = Math.max(60, (endHour - startHour) * 60);
  const position = (span: Span) => {
    const from = Math.max(span.from, top);
    const to = Math.min(span.to, top + height);
    return { top: `${((from - top) / height) * 100}%`, height: `${((to - from) / height) * 100}%` };
  };
  const visible = (span: Span) => span.to > top && span.from < top + height;

  return (
    <div className="flex flex-col gap-6">
      {data.calendar_error && (
        <p className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm">
          One of my calendars is not answering right now, so some busy time may be missing. Check
          with me before counting on a slot.
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
          <Legend className="bg-accent/25 ring-1 ring-accent/50" label="Free" />
          <Legend className="bg-foreground/70" label="Busy" />
          <Legend className="bg-muted" label="Outside working hours" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {differs && viewerZone && (
            <div
              role="radiogroup"
              aria-label="Time zone"
              className="inline-flex rounded-full border border-border p-1"
            >
              {[
                { mine: false, label: zoneName(data.time_zone) },
                { mine: true, label: `Your time, ${zoneName(viewerZone)}` },
              ].map((option) => (
                <button
                  key={String(option.mine)}
                  type="button"
                  role="radio"
                  aria-checked={useMine === option.mine}
                  onClick={() => setUseMine(option.mine)}
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                    useMine === option.mine
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
          {!differs && <span className="text-muted-foreground">{zoneName(zone)}</span>}
        </div>
      </div>

      {weeks.length > 1 && (
        <div className="flex items-center gap-2">
          {weeks.map((chunk, index) => (
            <button
              key={chunk[0]?.date}
              type="button"
              onClick={() => setWeek(index)}
              aria-pressed={week === index}
              className={cn(
                'rounded-md border px-3 py-1.5 text-sm transition-colors',
                week === index
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border text-muted-foreground hover:text-foreground',
              )}
            >
              {index === 0 ? 'Next 7 days' : 'The week after'}
            </button>
          ))}
        </div>
      )}

      {/* Phones: each day as its free windows. */}
      <ol className="flex flex-col gap-3 md:hidden">
        {shown.map((day) => (
          <li key={day.date} className="rounded-lg border border-border p-4">
            <p className="font-semibold">{dayLabel(day.date, 'long')}</p>
            {day.free.length > 0 ? (
              <ul className="mt-2 flex flex-wrap gap-2">
                {day.free.map((span) => (
                  <li
                    key={span.from}
                    className="rounded-md bg-accent/15 px-2.5 py-1 text-sm font-medium text-accent ring-1 ring-accent/40"
                  >
                    {clock(span.from)} to {clock(span.to)}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-sm text-muted-foreground">No free time.</p>
            )}
          </li>
        ))}
      </ol>

      {/* Tablet and up: the week as a grid. */}
      <div className="hidden overflow-hidden rounded-lg border border-border md:block">
        <div
          className="grid"
          style={{ gridTemplateColumns: `3.5rem repeat(${shown.length}, minmax(0, 1fr))` }}
        >
          <div className="border-b border-border" />
          {shown.map((day) => (
            <div
              key={day.date}
              className="border-b border-l border-border px-2 py-2 text-center text-sm font-semibold"
            >
              {dayLabel(day.date, 'short')}
            </div>
          ))}

          <div className="relative" style={{ height: `${(height / 60) * 3}rem` }}>
            {Array.from({ length: height / 60 }, (_, index) => (
              <span
                key={index}
                className="absolute right-2 -translate-y-1/2 text-[11px] text-muted-foreground"
                style={{ top: `${(index / (height / 60)) * 100}%` }}
              >
                {index === 0 ? '' : clock(top + index * 60)}
              </span>
            ))}
          </div>
          {shown.map((day) => (
            <div key={day.date} className="relative border-l border-border bg-muted">
              {Array.from({ length: height / 60 - 1 }, (_, index) => (
                <span
                  key={index}
                  aria-hidden
                  className="absolute inset-x-0 border-t border-border/60"
                  style={{ top: `${((index + 1) / (height / 60)) * 100}%` }}
                />
              ))}
              {day.working.filter(visible).map((span) => (
                <span
                  key={`w${span.from}`}
                  aria-hidden
                  className="absolute inset-x-0 bg-background"
                  style={position(span)}
                />
              ))}
              {day.free.filter(visible).map((span) => (
                <span
                  key={`f${span.from}`}
                  title={`Free ${clock(span.from)} to ${clock(span.to)}`}
                  className="absolute inset-x-1 rounded bg-accent/20 ring-1 ring-accent/40"
                  style={position(span)}
                >
                  <span className="sr-only">
                    Free {clock(span.from)} to {clock(span.to)}
                  </span>
                </span>
              ))}
              {day.busy.filter(visible).map((span) => (
                <span
                  key={`b${span.from}`}
                  title={`Busy ${clock(span.from)} to ${clock(span.to)}`}
                  className="absolute inset-x-1 overflow-hidden rounded bg-foreground/70 px-1.5 py-0.5 text-[11px] font-medium text-background"
                  style={position(span)}
                >
                  {span.to - span.from >= 30 ? 'Busy' : <span className="sr-only">Busy</span>}
                </span>
              ))}
              {day.past > top && (
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 bg-background/60 backdrop-grayscale"
                  style={position({ from: top, to: day.past })}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Updated {updatedAgo(data.generated_at, now)}. Refreshes every few minutes.
      </p>
    </div>
  );
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span aria-hidden className={cn('h-3 w-3 rounded-sm', className)} />
      {label}
    </span>
  );
}
