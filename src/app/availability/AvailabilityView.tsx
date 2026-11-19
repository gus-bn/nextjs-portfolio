"use client";

import { ChevronLeft, ChevronRight, Loader2, RefreshCw } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import type {
  Availability,
  AvailabilityResult,
  TimeRange,
} from "@/lib/availability";
import { cn } from "@/lib/utils";

/**
 * My coming two weeks as the ChecaTurno console's calendar preview draws
 * them, minus every name: half-hour tiles in my working windows, green where
 * I am free, busy time as plain blocks, a red line for now, and the chosen
 * day as a list beside the grid. Live: it re-reads every minute and whenever
 * the tab comes back.
 */

const SLOT = 30;
const WEEK = 7;
/** Tall enough that a half hour holds its time. */
const HOUR_PX = 76;
const GAP_PX = 3;
const REFRESH_MS = 60_000;
const DAY = 1440;
const DEFAULT_HOURS = { first: 9, last: 18 };
const MIN_SPAN_HOURS = 6;

type Tone = "free" | "busy" | "past";

/** Minutes since local midnight, end exclusive. */
interface Span {
  from: number;
  to: number;
}

interface Slot extends Span {
  tone: Tone;
}

interface DayModel {
  date: string;
  slots: Slot[];
  busy: Span[];
  free: number;
}

interface Run extends Span {
  tone: Tone;
  slots: number;
}

// --- time --------------------------------------------------------------------

function parts(
  instant: Date,
  timeZone: string,
): { date: string; minutes: number } {
  const values = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
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
    const midnight = new Date(
      cursor.getTime() + (DAY - local.minutes) * 60_000,
    );
    const last = end <= midnight;
    const to = last
      ? local.minutes + Math.round((end.getTime() - cursor.getTime()) / 60_000)
      : DAY;
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
  return `${String(hour).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

function at(date: string): Date {
  return new Date(`${date}T12:00:00Z`);
}

function weekday(date: string): string {
  return at(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "short",
  });
}

function longDate(date: string): string {
  return at(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function shortDate(date: string): string {
  return at(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
  });
}

function zoneLabel(timeZone: string): string {
  const city = timeZone.split("/").at(-1)?.replaceAll("_", " ") ?? timeZone;
  const offset =
    new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" })
      .formatToParts(new Date())
      .find((part) => part.type === "timeZoneName")?.value ?? "";
  return `${city} ${offset}`.trim();
}

function clockTime(instant: Date, timeZone: string): string {
  return instant.toLocaleTimeString("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function dayStatus(day: DayModel): string {
  return day.slots.length === 0 ? 'Off' : freeLabel(day.free);
}

function freeLabel(count: number): string {
  if (count === 0) return "Fully booked";
  return count === 1 ? "1 free slot" : `${count} free slots`;
}

function duration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest} min`;
  return rest ? `${hours} h ${rest} min` : `${hours} h`;
}

// --- the model ---------------------------------------------------------------

function buildDays(
  data: Availability,
  timeZone: string,
  now: Date,
): DayModel[] {
  const working = new Map<string, Span[]>();
  const busy = new Map<string, Span[]>();
  for (const day of data.days) {
    day.working.forEach((range) => split(range, timeZone, working));
    day.busy.forEach((range) => split(range, timeZone, busy));
  }
  const today = parts(now, timeZone);
  return data.days.map(({ date }) => {
    const dayBusy = merge(busy.get(date) ?? []);
    const pastUntil =
      date < today.date ? DAY : date === today.date ? today.minutes : 0;
    const slots: Slot[] = [];
    for (const window of merge(working.get(date) ?? [])) {
      for (let start = window.from; start + SLOT <= window.to; start += SLOT) {
        const end = start + SLOT;
        const tone: Tone =
          start < pastUntil
            ? "past"
            : dayBusy.some((block) => block.from < end && block.to > start)
              ? "busy"
              : "free";
        slots.push({ from: start, to: end, tone });
      }
    }
    return {
      date,
      slots,
      busy: dayBusy,
      free: slots.filter((slot) => slot.tone === "free").length,
    };
  });
}

function gridHours(days: DayModel[]): { first: number; last: number } {
  const spans = days.flatMap((day) => [...day.slots, ...day.busy]);
  if (spans.length === 0) return DEFAULT_HOURS;
  let first = Math.max(
    0,
    Math.floor(Math.min(...spans.map((s) => s.from)) / 60) - 1,
  );
  let last = Math.min(
    24,
    Math.ceil(Math.max(...spans.map((s) => s.to)) / 60) + 1,
  );
  // Busy time far outside the working day should not squash the grid.
  const slots = days.flatMap((day) => day.slots);
  if (slots.length) {
    first = Math.max(
      first,
      Math.floor(Math.min(...slots.map((s) => s.from)) / 60) - 3,
    );
    last = Math.min(
      last,
      Math.ceil(Math.max(...slots.map((s) => s.to)) / 60) + 3,
    );
  }
  while (last - first < MIN_SPAN_HOURS) {
    if (last < 24) last += 1;
    if (last - first < MIN_SPAN_HOURS && first > 0) first -= 1;
  }
  return { first, last };
}

/** The day as a list: runs of free or past slots, and every busy block. */
function agenda(day: DayModel, nowMinute: number | null): Run[] {
  const runs: Run[] = [];
  for (const slot of day.slots) {
    if (slot.tone === "busy") continue;
    const last = runs.at(-1);
    if (last && last.tone === slot.tone && last.to === slot.from) {
      last.to = slot.to;
      last.slots += 1;
    } else {
      runs.push({ ...slot, slots: 1 });
    }
  }
  for (const block of day.busy) {
    const past = nowMinute !== null ? block.to <= nowMinute : false;
    runs.push({ ...block, tone: past ? "past" : "busy", slots: 0 });
  }
  return runs.sort((a, b) => a.from - b.from);
}

function nextOpening(days: DayModel[]): { date: string; run: Run } | null {
  for (const day of days) {
    const run = agenda(day, null).find((item) => item.tone === "free");
    if (run) return { date: day.date, run };
  }
  return null;
}

// --- pieces ------------------------------------------------------------------

function Swatch({ tone }: { tone: Tone }) {
  return (
    <span
      aria-hidden
      data-tone={tone}
      className="sched-tile h-3.5 w-3.5 shrink-0 rounded-[4px]"
    />
  );
}

const LEGEND: { tone: Tone; label: string }[] = [
  { tone: "free", label: "Free" },
  { tone: "busy", label: "Busy" },
  { tone: "past", label: "Past" },
];

function DayColumn({
  day,
  first,
  last,
  selected,
  nowMinute,
  onSelect,
}: {
  day: DayModel;
  first: number;
  last: number;
  selected: boolean;
  nowMinute: number | null;
  onSelect: () => void;
}) {
  const start = first * 60;
  const span = (last - first) * 60;
  const place = (from: number, to: number): CSSProperties | null => {
    const top = Math.max(from, start);
    const bottom = Math.min(to, last * 60);
    if (bottom <= top) return null;
    return {
      top: `${((top - start) / span) * 100}%`,
      height: `calc(${((bottom - top) / span) * 100}% - ${GAP_PX}px)`,
    };
  };

  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={`${longDate(day.date)}, ${dayStatus(day)}`}
      onClick={onSelect}
      style={{ height: (last - first) * HOUR_PX }}
      className="sched-column relative block w-full min-w-0 cursor-pointer rounded-md"
    >
      {day.slots.map((slot) => {
        const style = place(slot.from, slot.to);
        if (!style) return null;
        return (
          <span
            key={slot.from}
            aria-hidden
            data-tone={slot.tone}
            style={style}
            className="sched-tile absolute inset-x-1 flex items-center overflow-hidden rounded-md px-2 text-xs font-bold whitespace-nowrap tabular-nums"
          >
            {slot.tone !== "busy" && hhmm(slot.from)}
          </span>
        );
      })}
      {day.busy.map((block) => {
        const style = place(block.from, block.to);
        if (!style) return null;
        const tall = block.to - block.from >= 45;
        return (
          <span
            key={block.from}
            aria-hidden
            data-past={nowMinute !== null && block.to <= nowMinute}
            title={`Busy ${hhmm(block.from)} to ${hhmm(block.to)}`}
            style={style}
            className="sched-block absolute inset-x-1 overflow-hidden rounded-md px-1.5 py-0.5 text-left text-xs leading-tight font-semibold"
          >
            Busy
            {tall && (
              <span className="block font-medium tabular-nums opacity-70">
                {hhmm(block.from)} to {hhmm(block.to)}
              </span>
            )}
          </span>
        );
      })}
      {nowMinute !== null && nowMinute >= start && nowMinute <= last * 60 && (
        <span
          aria-hidden
          style={{ top: `${((nowMinute - start) / span) * 100}%` }}
          className="sched-now absolute inset-x-0 z-10 h-0.5"
        />
      )}
    </button>
  );
}

function WeekGrid({
  days,
  selected,
  today,
  nowMinute,
  onSelect,
}: {
  days: DayModel[];
  selected: string;
  today: string;
  nowMinute: number;
  onSelect: (date: string) => void;
}) {
  const { first, last } = useMemo(() => gridHours(days), [days]);
  const hours = Array.from(
    { length: last - first },
    (_, index) => first + index,
  );
  const columns = {
    gridTemplateColumns: `3.25rem repeat(${days.length}, minmax(0, 1fr))`,
  };
  return (
    <div className="min-w-[44rem]">
      <div
        className="sticky top-0 z-20 grid border-b border-[var(--s-border)] bg-[var(--s-surface)]"
        style={columns}
      >
        <span />
        {days.map((day) => {
          const isToday = day.date === today;
          return (
            <button
              key={day.date}
              type="button"
              tabIndex={-1}
              aria-hidden
              onClick={() => onSelect(day.date)}
              className="flex min-w-0 flex-col items-center py-2.5"
            >
              <span className="flex items-center gap-1.5 text-sm font-bold">
                {weekday(day.date)}
                <span
                  className={cn(
                    "grid h-7 w-7 place-items-center rounded-full tabular-nums",
                    isToday && "bg-[var(--s-text)] text-[var(--s-surface)]",
                  )}
                >
                  {Number(day.date.slice(8))}
                </span>
              </span>
              <span
                className={cn(
                  "text-xs font-semibold",
                  day.free
                    ? "text-[var(--s-free-strong)]"
                    : "text-[var(--s-subtle)]",
                )}
              >
                {day.slots.length === 0 ? "Off" : freeLabel(day.free)}
              </span>
            </button>
          );
        })}
      </div>
      <div className="grid pt-2" style={columns}>
        <div
          aria-hidden
          className="relative"
          style={{ height: (last - first) * HOUR_PX }}
        >
          {hours.map((hour, index) => (
            <span
              key={hour}
              style={{ top: index * HOUR_PX }}
              className="absolute right-2 -translate-y-1/2 text-xs text-[var(--s-subtle)] tabular-nums"
            >
              {index === 0 ? "" : `${String(hour).padStart(2, "0")}:00`}
            </span>
          ))}
        </div>
        {days.map((day) => (
          <div key={day.date} className="relative min-w-0">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              {hours.map((hour, index) => (
                <span
                  key={hour}
                  style={{ top: index * HOUR_PX }}
                  className="absolute inset-x-0 border-t border-[var(--s-border)]"
                />
              ))}
            </div>
            <DayColumn
              day={day}
              first={first}
              last={last}
              selected={day.date === selected}
              nowMinute={
                day.date === today ? nowMinute : day.date < today ? DAY : null
              }
              onSelect={() => onSelect(day.date)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function DayAgenda({
  day,
  nowMinute,
}: {
  day: DayModel;
  nowMinute: number | null;
}) {
  const runs = useMemo(() => agenda(day, nowMinute), [day, nowMinute]);
  return (
    <section aria-live="polite" key={day.date} className="sched-enter">
      <h2 className="sched-display text-3xl leading-tight">
        {longDate(day.date)}
      </h2>
      <p
        className={cn(
          "mt-1 text-sm font-semibold",
          day.free ? "text-[var(--s-free-strong)]" : "text-[var(--s-muted)]",
        )}
      >
        {day.slots.length === 0
          ? "Not taking meetings this day"
          : freeLabel(day.free)}
      </p>
      {runs.length === 0 ? (
        <p className="mt-4 text-sm text-[var(--s-muted)]">
          Nothing on the calendar.
        </p>
      ) : (
        <ul className="mt-5 flex flex-col gap-3.5">
          {runs.map((run) => (
            <li
              key={`${run.tone}-${run.from}`}
              className="flex items-start gap-2.5 text-sm"
            >
              <span className="mt-1">
                <Swatch tone={run.tone} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold tabular-nums">
                  {hhmm(run.from)} to {hhmm(run.to)}
                </span>
                <span className="block text-[var(--s-muted)]">
                  {run.tone === "free"
                    ? `Free, ${run.slots === 1 ? "1 half hour" : `${run.slots} half hours`}`
                    : run.tone === "busy"
                      ? `Busy, ${duration(run.to - run.from)}`
                      : "Already passed"}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
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
  const [selected, setSelected] = useState<string | null>(null);

  const sync = useCallback(async () => {
    setSyncing(true);
    try {
      const response = await fetch("/availability/data", { cache: "no-store" });
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
      if (document.visibilityState === "visible") void sync();
    };
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      clearInterval(clock);
      clearInterval(poll);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, [initial.ok, sync]);

  const data = result.ok ? result.data : null;
  const homeZone = data?.time_zone ?? "America/Mexico_City";
  const differs = viewerZone !== null && viewerZone !== homeZone;
  const zone = useMine && differs && viewerZone ? viewerZone : homeZone;
  // Minute resolution for the model, so the per-second clock does not rebuild it.
  const minuteKey = Math.floor(now.getTime() / 60_000);
  const days = useMemo(
    () => (data ? buildDays(data, zone, new Date(minuteKey * 60_000)) : []),
    [data, zone, minuteKey],
  );
  const today = parts(now, zone);
  const pages = Math.max(1, Math.ceil(days.length / WEEK));
  const safePage = Math.min(page, pages - 1);
  const week = days.slice(safePage * WEEK, safePage * WEEK + WEEK);
  const day =
    week.find((item) => item.date === selected) ??
    week.find((item) => item.date === today.date) ??
    week[0];
  const weekFree = week.reduce((total, item) => total + item.free, 0);
  const opening = useMemo(() => nextOpening(days), [days]);
  const dayNow = (date: string) =>
    date === today.date ? today.minutes : date < today.date ? DAY : null;

  return (
    <div className="flex min-h-dvh flex-col lg:h-dvh">
      <header className="shrink-0 border-b border-[var(--s-border)] px-4 pt-6 pb-4 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="sched-enter min-w-0">
            <p className="text-xs font-semibold tracking-[0.18em] text-[var(--s-subtle)] uppercase">
              Availability
            </p>
            <h1 className="sched-display mt-1 text-4xl leading-none sm:text-5xl">
              {name}&apos;s <em>schedule</em>
            </h1>
            {opening ? (
              <p className="mt-3 text-sm text-[var(--s-muted)]">
                Next opening{" "}
                <span className="font-semibold text-[var(--s-text)]">
                  {opening.date === today.date
                    ? "today"
                    : longDate(opening.date)}{" "}
                  at {hhmm(opening.run.from)}
                </span>
                , free for {duration(opening.run.to - opening.run.from)}.
              </p>
            ) : (
              data && (
                <p className="mt-3 text-sm text-[var(--s-muted)]">
                  No openings in the next two weeks.
                </p>
              )
            )}
          </div>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 text-xs font-medium text-[var(--s-muted)]"
              role="status"
            >
              <span
                className="sched-live"
                data-state={failed ? "error" : "live"}
                aria-hidden
              />
              <span className="tabular-nums">
                {failed
                  ? "Offline, retrying"
                  : syncedAt
                    ? `Live, synced ${clockTime(syncedAt, zone)}`
                    : "Live"}
              </span>
              <button
                type="button"
                onClick={() => void sync()}
                aria-label="Refresh now"
                title="Refresh now"
                className="grid h-7 w-7 place-items-center rounded-md hover:text-[var(--s-text)]"
              >
                {syncing ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                ) : (
                  <RefreshCw className="h-3.5 w-3.5" aria-hidden />
                )}
              </button>
            </div>
            <ThemeToggle className="rounded-lg border-[var(--s-border)] bg-[var(--s-surface)]" />
          </div>
        </div>

        {data && (
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
            <div className="flex items-center gap-1">
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
                <button
                  type="button"
                  className="sched-btn"
                  onClick={() => setPage(0)}
                >
                  Today
                </button>
              )}
            </div>
            {week.length > 0 && (
              <p className="text-base font-bold">
                {shortDate(week[0]!.date)} to {shortDate(week.at(-1)!.date)}
              </p>
            )}
            <p
              className={cn(
                "text-base font-bold",
                weekFree
                  ? "text-[var(--s-free-strong)]"
                  : "text-[var(--s-muted)]",
              )}
            >
              {freeLabel(weekFree)}
            </p>
            <ul className="flex flex-wrap gap-x-3 gap-y-1 lg:ml-auto">
              {LEGEND.map((item) => (
                <li
                  key={item.tone}
                  className="flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Swatch tone={item.tone} />
                  {item.label}
                </li>
              ))}
            </ul>
            {differs && viewerZone ? (
              <div
                role="radiogroup"
                aria-label="Time zone"
                className="inline-flex rounded-lg border border-[var(--s-border)] bg-[var(--s-sunken)] p-0.5"
              >
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
                      "rounded-md px-2.5 py-1 text-xs font-semibold transition-colors",
                      useMine === option.mine
                        ? "bg-[var(--s-surface)] text-[var(--s-text)] shadow-sm"
                        : "text-[var(--s-muted)] hover:text-[var(--s-text)]",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : (
              <span className="text-xs font-semibold text-[var(--s-subtle)]">
                {zoneLabel(zone)}
              </span>
            )}
          </div>
        )}
        {data?.calendar_error && (
          <p className="mt-3 rounded-lg border border-[var(--s-now)]/40 bg-[var(--s-now)]/10 px-3 py-2 text-sm">
            One of my calendars is not answering right now, so some busy time
            may be missing. Check with me before counting on a slot.
          </p>
        )}
      </header>

      {!data ? (
        <div className="grid flex-1 place-items-center p-8">
          <p className="sched-panel max-w-md rounded-xl p-6 text-center text-[var(--s-muted)]">
            {!result.ok && result.reason === "not_configured"
              ? "The calendar is not connected yet."
              : "I could not load the calendar right now. It will retry on its own."}
          </p>
        </div>
      ) : (
        day && (
          <div className="min-h-0 flex-1 lg:grid lg:grid-cols-[minmax(0,1fr)_21rem] lg:grid-rows-[minmax(0,1fr)]">
            <div className="min-h-0 overflow-x-auto px-4 pt-3 pb-6 sm:px-8 lg:overflow-y-auto">
              <WeekGrid
                days={week}
                selected={day.date}
                today={today.date}
                nowMinute={today.minutes}
                onSelect={setSelected}
              />
            </div>
            <aside className="border-t border-[var(--s-border)] bg-[var(--s-surface)] px-4 py-6 sm:px-8 lg:overflow-y-auto lg:border-t-0 lg:border-l lg:px-7">
              <DayAgenda day={day} nowMinute={dayNow(day.date)} />
              <p className="mt-8 border-t border-[var(--s-border)] pt-4 text-xs leading-relaxed text-[var(--s-subtle)]">
                Busy time comes straight from my calendars, without details.
                Pick a free slot and message me to lock it in.
              </p>
            </aside>
          </div>
        )
      )}
    </div>
  );
}
