/**
 * Free/busy from the ChecaTurno console, for the unlisted /availability page.
 *
 * Runs on the server only: the API key never reaches the browser. The key
 * should be scoped to "Disponibilidad anónima" (read) in the console, which
 * opens GET /admin/calendar/busy and nothing else. That route already strips
 * every title, account and lead, so nothing here has anything to anonymize.
 */

export interface TimeRange {
  start: string;
  end: string;
}

export interface BusyDay {
  date: string;
  working: TimeRange[];
  busy: TimeRange[];
}

export interface Availability {
  time_zone: string;
  generated_at: string;
  calendar_error: boolean;
  days: BusyDay[];
}

export type AvailabilityResult =
  | { ok: true; data: Availability }
  | { ok: false; reason: 'not_configured' | 'unavailable' };

const DEFAULT_API_URL = 'https://api.checaturno.mx/v1';
const DAYS = 14;


export async function fetchAvailability(): Promise<AvailabilityResult> {
  const key = process.env.CHECATURNO_API_KEY;
  if (!key) return { ok: false, reason: 'not_configured' };
  const base = (process.env.CHECATURNO_API_URL || DEFAULT_API_URL).replace(/\/$/, '');
  try {
    const response = await fetch(`${base}/admin/calendar/busy?days=${DAYS}`, {
      headers: { Authorization: `Bearer ${key}`, Accept: 'application/json' },
      // Live on every request: the page and its /availability/data poll.
      cache: 'no-store',
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) {
      console.error('availability.fetch_failed', response.status);
      return { ok: false, reason: 'unavailable' };
    }
    return { ok: true, data: (await response.json()) as Availability };
  } catch (error) {
    console.error('availability.fetch_error', error);
    return { ok: false, reason: 'unavailable' };
  }
}
