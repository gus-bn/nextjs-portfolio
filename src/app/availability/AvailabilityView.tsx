'use client';

import { ChevronLeft, ChevronRight, Loader2, RefreshCw } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react';

import { ThemeToggle } from '@/components/theme/ThemeToggle';
import type { Availability, AvailabilityResult, TimeRange } from '@/lib/availability';
import { cn } from '@/lib/utils';

/**
 * My calendar in whole weeks, Monday to Sunday, as a week grid that shows only when I am busy.
 * Available time is left empty on purpose: nothing here is booked, it is
 * just my availability. Live: it re-reads every minute and whenever the tab
 * comes back.
 */

const WEEK = 7;
/** The hours the grid shows, in the zone being viewed. */
const FIRST_HOUR = 8;
const LAST_HOUR = 18;
const HOUR_PX = 64;
const GAP_PX = 2;
const REFRESH_MS = 60_000;
const DAY = 1440;
/** Monday to Friday, in my own time zone. I am busy then even when no event says so. */
const LUNCH = { from: 13 * 60, to: 14 * 60, weekdays: [1, 2, 3, 4, 5] };

/** Minutes since local midnight, end exclusive. */
interface Span {
  from: number;
  to: number;
}

interface Block extends Span {
  kind: 'busy' | 'lunch';
}

interface DayModel {
  date: string;
  blocks: Block[];
}

// --- time --------------------------------------------------------------------

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
    const midnight = new Date(cursor.getTime() + (DAY - local.minutes) * 60_000);
    const last = end <= midnight;
    const to = last ? local.minutes + Math.round((end.getTime() - cursor.getTime()) / 60_000) : DAY;
    const list = into.get(local.date) ?? [];
    list.push({ from: local.minutes, to: Math.min(DAY, to) });
    into.set(local.date, list);
    cursor = last ? end : midnight;
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

function hhmm(minutes: number): string {
  const hour = Math.floor(minutes / 60) % 24;
  return `${String(hour).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
}

function at(date: string): Date {
  return new Date(`${date}T12:00:00Z`);
}

function weekday(date: string): string {
  return at(date).toLocaleDateString('en-US', { timeZone: 'UTC', weekday: 'short' });
}

function longDate(date: string): string {
  return at(date).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

function shortDate(date: string): string {
  return at(date).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric' });
}

function zoneLabel(timeZone: string): string {
  const city = timeZone.split('/').at(-1)?.replaceAll('_', ' ') ?? timeZone;
  const offset =
    new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'shortOffset' })
      .formatToParts(new Date())
      .find((part) => part.type === 'timeZoneName')?.value ?? '';
  return `${city} ${offset}`.trim();
}

function clockTime(instant: Date, timeZone: string): string {
  return instant.toLocaleTimeString('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/** The instant a wall-clock time on a date is in a zone (no DST in Mexico). */
function instant(date: string, minutes: number, timeZone: string): Date {
  const guess = new Date(`${date}T00:00:00Z`).getTime() + minutes * 60_000;
  const seen = parts(new Date(guess), timeZone);
  const seenAt = new Date(`${seen.date}T00:00:00Z`).getTime() + seen.minutes * 60_000;
  return new Date(guess - (seenAt - guess));
}

function subtract(spans: Span[], cut: Span): Span[] {
  return spans.flatMap((span) => {
    if (cut.to <= span.from || cut.from >= span.to) return [span];
    const rest: Span[] = [];
    if (span.from < cut.from) rest.push({ from: span.from, to: cut.from });
    if (cut.to < span.to) rest.push({ from: cut.to, to: span.to });
    return rest;
  });
}

// --- the model ---------------------------------------------------------------

function buildDays(data: Availability, timeZone: string): DayModel[] {
  const busy = new Map<string, Span[]>();
  const lunch = new Map<string, Span[]>();
  for (const day of data.days) {
    day.busy.forEach((range) => split(range, timeZone, busy));
    if (!LUNCH.weekdays.includes(at(day.date).getUTCDay())) continue;
    const range = {
      start: instant(day.date, LUNCH.from, data.time_zone).toISOString(),
      end: instant(day.date, LUNCH.to, data.time_zone).toISOString(),
    };
    split(range, timeZone, lunch);
  }
  return data.days.map(({ date }) => {
    const lunches = merge(lunch.get(date) ?? []);
    // Meetings that run into lunch are drawn around it.
    const meetings = lunches.reduce((spans, cut) => subtract(spans, cut), merge(busy.get(date) ?? []));
    const blocks: Block[] = [
      ...meetings.map((span) => ({ ...span, kind: 'busy' as const })),
      ...lunches.map((span) => ({ ...span, kind: 'lunch' as const })),
    ].sort((a, b) => a.from - b.from);
    return { date, blocks };
  });
}

/** Blocks inside the hours the grid shows. */
function visibleBlocks(day: DayModel): Block[] {
  return day.blocks
    .map((block) => ({
      ...block,
      from: Math.max(block.from, FIRST_HOUR * 60),
      to: Math.min(block.to, LAST_HOUR * 60),
    }))
    .filter((block) => block.to > block.from);
}

const LABEL = { busy: 'Busy', lunch: 'Lunch' } as const;

// --- the grid ----------------------------------------------------------------

function DayColumn({ day, nowMinute }: { day: DayModel; nowMinute: number | null }) {
  const start = FIRST_HOUR * 60;
  const span = (LAST_HOUR - FIRST_HOUR) * 60;
  const place = (from: number, to: number): CSSProperties => ({
    top: `${((from - start) / span) * 100}%`,
    height: `calc(${((to - from) / span) * 100}% - ${GAP_PX}px)`,
  });

  return (
    <div className="absolute inset-0">
      {visibleBlocks(day).map((block) => (
        <div
          key={block.from}
          data-past={nowMinute !== null && block.to <= nowMinute}
          title={`${LABEL[block.kind]} ${hhmm(block.from)} to ${hhmm(block.to)}`}
          style={place(block.from, block.to)}
          data-kind={block.kind}
          className="sched-busy absolute inset-x-1 overflow-hidden rounded-md px-2 py-1 text-xs leading-tight font-semibold"
        >
          {LABEL[block.kind]}
          {block.to - block.from >= 45 && (
            <span className="block font-medium tabular-nums">
              {hhmm(block.from)} to {hhmm(block.to)}
            </span>
          )}
        </div>
      ))}
      {nowMinute !== null && nowMinute > start && nowMinute < LAST_HOUR * 60 && (
        <span
          aria-hidden
          style={{ top: `${((nowMinute - start) / span) * 100}%` }}
          className="sched-now absolute inset-x-0 z-10 h-0.5"
        />
      )}
    </div>
  );
}

function WeekGrid({
  days,
  today,
  nowFor,
}: {
  days: DayModel[];
  today: string;
  nowFor: (date: string) => number | null;
}) {
  const hours = Array.from({ length: LAST_HOUR - FIRST_HOUR + 1 }, (_, i) => FIRST_HOUR + i);
  const columns = { gridTemplateColumns: `4rem repeat(${days.length}, minmax(0, 1fr))` };
  const height = (LAST_HOUR - FIRST_HOUR) * HOUR_PX;
  return (
    <div className="sched-sheet min-w-[44rem] overflow-hidden rounded-xl">
      <div className="sched-band grid" style={columns}>
        <span />
        {days.map((day) => {
          const isToday = day.date === today;
          return (
            <div
              key={day.date}
              className="flex min-w-0 items-center justify-center gap-2 py-3 text-sm font-semibold"
            >
              <span className={isToday ? '' : 'text-[var(--s-band-muted)]'}>
                {weekday(day.date)}
              </span>
              <span
                className={cn(
                  'grid h-8 w-8 place-items-center rounded-full text-base font-bold tabular-nums',
                  isToday && 'bg-[var(--s-today)] text-white',
                )}
              >
                {Number(day.date.slice(8))}
              </span>
            </div>
          );
        })}
      </div>
      <div className="grid py-4" style={columns}>
        <div aria-hidden className="relative" style={{ height }}>
          {hours.map((hour, index) => (
            <span
              key={hour}
              style={{ top: index * HOUR_PX }}
              className="absolute right-3 -translate-y-1/2 text-xs font-semibold text-[var(--s-muted)] tabular-nums"
            >
              {String(hour).padStart(2, '0')}:00
            </span>
          ))}
        </div>
        {days.map((day) => (
          <div
            key={day.date}
            role="group"
            aria-label={`${longDate(day.date)}: ${
              day.blocks.length
                ? day.blocks
                    .map((b) => `${LABEL[b.kind].toLowerCase()} ${hhmm(b.from)} to ${hhmm(b.to)}`)
                    .join(', ')
                : 'available'
            }`}
            className="relative min-w-0 border-l border-[var(--s-line)]"
            style={{ height }}
          >
            <div aria-hidden className="pointer-events-none absolute inset-0">
              {hours.map((hour, index) => (
                <span
                  key={hour}
                  style={{ top: index * HOUR_PX }}
                  className="absolute inset-x-0 border-t border-[var(--s-line)]"
                />
              ))}
            </div>
            <DayColumn day={day} nowMinute={nowFor(day.date)} />
          </div>
        ))}
      </div>
    </div>
  );
}

// --- the page ----------------------------------------------------------------

export function AvailabilityView({
  initial,
  name,
}: {
  initial: AvailabilityResult;
  name: string;
}) {
  const [result, setResult] = useState(initial);
  const [syncedAt, setSyncedAt] = useState<Date | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [failed, setFailed] = useState(!initial.ok);
  const [now, setNow] = useState(() =>
    initial.ok ? new Date(initial.data.generated_at) : new Date(),
  );
  const [viewerZone, setViewerZone] = useState<string | null>(null);
  const [useMine, setUseMine] = useState(false);
  const [page, setPage] = useState(0);

  const sync = useCallback(async () => {
    setSyncing(true);
    try {
      const response = await fetch('/availability/data', { cache: 'no-store' });
      const next = (await response.json()) as AvailabilityResult;
      if (next.ok) {
        setResult(next);
        setSyncedAt(new Date());
        setFailed(false);
      } else {
        setFailed(true);
      }
    } catch {
      setFailed(true);
    } finally {
      setSyncing(false);
    }
  }, []);

  // Live: the clock every second, the calendar every minute and on return.
  useEffect(() => {
    setViewerZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    setNow(new Date());
    if (initial.ok) setSyncedAt(new Date());
    const clock = setInterval(() => setNow(new Date()), 1000);
    const poll = setInterval(() => void sync(), REFRESH_MS);
    const onFocus = () => {
      if (document.visibilityState === 'visible') void sync();
    };
    document.addEventListener('visibilitychange', onFocus);
    return () => {
      clearInterval(clock);
      clearInterval(poll);
      document.removeEventListener('visibilitychange', onFocus);
    };
  }, [initial.ok, sync]);

  const data = result.ok ? result.data : null;
  const homeZone = data?.time_zone ?? 'America/Mexico_City';
  const differs = viewerZone !== null && viewerZone !== homeZone;
  const zone = useMine && differs && viewerZone ? viewerZone : homeZone;
  const days = useMemo(() => (data ? buildDays(data, zone) : []), [data, zone]);
  const today = parts(now, zone);
  // The API answers from Monday of the current week, so pages are Mon-Sun.
  const pages = Math.max(1, Math.ceil(days.length / WEEK));
  const safePage = Math.min(page, pages - 1);
  const week = days.slice(safePage * WEEK, safePage * WEEK + WEEK);
  const nowFor = (date: string) =>
    date === today.date ? today.minutes : date < today.date ? DAY : null;

  return (
    <div className="mx-auto flex min-h-dvh max-w-[96rem] flex-col px-4 py-6 sm:px-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{name}&apos;s schedule</h1>
          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-[var(--s-muted)]">
            <span aria-hidden className="sched-busy inline-block h-3.5 w-3.5 rounded-[4px]" />
            Busy
            <span
              aria-hidden
              data-kind="lunch"
              className="sched-busy ml-2 inline-block h-3.5 w-3.5 rounded-[4px]"
            />
            Lunch. Everything else, I&apos;m available.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 text-sm font-medium text-[var(--s-muted)]"
            role="status"
          >
            <span className="sched-live" data-state={failed ? 'error' : 'live'} aria-hidden />
            <span className="tabular-nums">
              {failed
                ? 'Offline, retrying'
                : syncedAt
                  ? `Live, synced ${clockTime(syncedAt, zone)}`
                  : 'Live'}
            </span>
            <button
              type="button"
              onClick={() => void sync()}
              aria-label="Refresh now"
              title="Refresh now"
              className="sched-btn w-9 px-0"
            >
              {syncing ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <RefreshCw className="h-4 w-4" aria-hidden />
              )}
            </button>
          </div>
          <ThemeToggle className="sched-btn w-9 px-0" />
        </div>
      </header>

      {data && (
        <div className="mt-6 mb-4 flex flex-wrap items-center gap-x-4 gap-y-3">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="sched-btn w-9 px-0"
              aria-label="Previous week"
              disabled={safePage === 0}
              onClick={() => setPage(safePage - 1)}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              className="sched-btn w-9 px-0"
              aria-label="Next week"
              disabled={safePage >= pages - 1}
              onClick={() => setPage(safePage + 1)}
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
            {safePage > 0 && (
              <button type="button" className="sched-btn" onClick={() => setPage(0)}>
                This week
              </button>
            )}
          </div>
          {week.length > 0 && (
            <p className="text-lg font-bold">
              {shortDate(week[0]!.date)} to {shortDate(week.at(-1)!.date)}
            </p>
          )}
          <div className="sm:ml-auto">
            {differs && viewerZone ? (
              <div role="radiogroup" aria-label="Time zone" className="inline-flex gap-1.5">
                {[
                  { mine: false, label: zoneLabel(homeZone) },
                  { mine: true, label: `Your time, ${zoneLabel(viewerZone)}` },
                ].map((option) => (
                  <button
                    key={String(option.mine)}
                    type="button"
                    role="radio"
                    aria-checked={useMine === option.mine}
                    onClick={() => setUseMine(option.mine)}
                    className={cn(
                      'sched-btn',
                      useMine === option.mine &&
                        'border-[var(--s-band)] bg-[var(--s-band)] text-[var(--s-band-text)]',
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : (
              <span className="text-sm font-semibold text-[var(--s-muted)]">
                {zoneLabel(zone)}
              </span>
            )}
          </div>
        </div>
      )}
      {data?.calendar_error && (
        <p className="mb-4 rounded-lg bg-[var(--s-busy)] px-4 py-3 text-sm font-semibold text-white">
          One of my calendars is not answering right now, so some busy time may be missing.
        </p>
      )}

      {!data ? (
        <div className="grid flex-1 place-items-center">
          <p className="sched-sheet max-w-md rounded-xl p-6 text-center font-medium">
            {!result.ok && result.reason === 'not_configured'
              ? 'The calendar is not connected yet.'
              : 'I could not load the calendar right now. It will retry on its own.'}
          </p>
        </div>
      ) : (
        <div className="min-h-0 flex-1 overflow-x-auto pb-2">
          <WeekGrid days={week} today={today.date} nowFor={nowFor} />
        </div>
      )}
    </div>
  );
}
