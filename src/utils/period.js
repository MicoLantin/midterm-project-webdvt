const MS_PER_DAY = 24 * 60 * 60 * 1000;

export const PERIODS = ['daily', 'weekly', 'monthly'];

// Transaction dates are stored as plain "YYYY-MM-DD" strings. Parsing them
// with `new Date(isoString)` treats them as UTC, which can land on the wrong
// local day near timezone boundaries — so this builds the Date from local
// year/month/day components instead.
function parseLocalDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfWeek(date) {
  const d = startOfDay(date);
  const mondayOffset = (d.getDay() + 6) % 7; // getDay(): 0=Sun..6=Sat -> 0=Mon..6=Sun
  d.setDate(d.getDate() - mondayOffset);
  return d;
}

function startOfMonth(date) {
  const d = startOfDay(date);
  d.setDate(1);
  return d;
}

// Whether a transaction's date falls within the current daily/weekly/monthly
// period, relative to today.
export function isInCurrentPeriod(isoDate, period) {
  const txDate = parseLocalDate(isoDate);
  const today = new Date();

  if (period === 'monthly') {
    const start = startOfMonth(today);
    return txDate.getFullYear() === start.getFullYear() && txDate.getMonth() === start.getMonth();
  }

  const start = period === 'weekly' ? startOfWeek(today) : startOfDay(today);
  const days = period === 'weekly' ? 7 : 1;
  const end = new Date(start.getTime() + days * MS_PER_DAY);
  return txDate >= start && txDate < end;
}
