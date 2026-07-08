export const BOOKING_WINDOW_DAYS = 14;

export const SLOT_TIMES = [
  ["16:00", "17:00"],
  ["17:00", "18:00"],
  ["18:00", "19:00"],
  ["19:00", "20:00"],
  ["20:00", "21:00"],
  ["21:00", "22:00"],
  ["22:00", "23:00"],
];

export function todayIso() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export function maxBookableDateIso() {
  const date = new Date();
  date.setDate(date.getDate() + BOOKING_WINDOW_DAYS - 1);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export function isDateInWindow(date) {
  return date >= todayIso() && date <= maxBookableDateIso();
}

export function formatSlot(start, end) {
  return `${toDisplayTime(start)} - ${toDisplayTime(end)}`;
}

function toDisplayTime(value) {
  const [hour, minute] = value.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return minute ? `${displayHour}:${String(minute).padStart(2, "0")} ${suffix}` : `${displayHour} ${suffix}`;
}
