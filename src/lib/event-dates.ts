// Work out whether an event is over, so the site can drop it from the
// upcoming list and promote the next one on its own.

const MONTHS = [
  "january", "february", "march", "april", "may", "june", "july",
  "august", "september", "october", "november", "december",
];

const DAY_MS = 24 * 60 * 60 * 1000;

type DatedEvent = {
  date: string;
  startDatetime: string;
  endDatetime: string;
};

// A bare "YYYY-MM-DD" end date means the whole day, so it ends at the close
// of that day rather than at midnight when it starts.
function parseIso(value: string, endOfDay: boolean): number | null {
  if (!value) return null;
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value);
  const t = Date.parse(dateOnly && endOfDay ? `${value}T23:59:59-05:00` : value);
  return Number.isNaN(t) ? null : t;
}

// Fallback for events that only have display text such as
// "July 9 – 12, 2026" or "Thursday, August 6". Uses the last day mentioned.
// With no year, a date that passed recently counts as this year's (and is
// over); one that passed long ago is assumed to be next year's.
function parseDisplayDate(text: string, now: number): number | null {
  const m = text.match(
    /([A-Za-z]+)\s+(\d{1,2})(?:\s*[–-]\s*(\d{1,2}))?(?:,?\s*(\d{4}))?/,
  );
  if (!m) return null;
  const month = MONTHS.indexOf(m[1].toLowerCase());
  if (month === -1) return null;
  const day = Number(m[3] ?? m[2]);
  const thisYear = new Date(now).getFullYear();
  const at = (y: number) => new Date(y, month, day, 23, 59, 59).getTime();
  if (m[4]) return at(Number(m[4]));
  const t = at(thisYear);
  return now - t > 180 * DAY_MS ? at(thisYear + 1) : t;
}

export function eventStartMs(e: DatedEvent): number | null {
  return parseIso(e.startDatetime, false);
}

export function eventEndMs(e: DatedEvent, now: number): number | null {
  return (
    parseIso(e.endDatetime, true) ??
    parseIso(e.startDatetime, true) ??
    parseDisplayDate(e.date, now)
  );
}

export function isEventOver(e: DatedEvent, now: number): boolean {
  const end = eventEndMs(e, now);
  return end !== null && end < now;
}
