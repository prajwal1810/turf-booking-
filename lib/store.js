import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { getStore } from "@netlify/blobs";
import { SLOT_TIMES, isDateInWindow } from "./slots";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "bookings.json");
const BLOB_KEY = "bookings";

function shouldUseNetlifyBlobs() {
  return process.env.NETLIFY === "true" || Boolean(process.env.NETLIFY_BLOBS_CONTEXT);
}

function getBookingsBlobStore() {
  return getStore({ name: "turf-bookings", consistency: "strong" });
}

async function ensureStore() {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(DATA_FILE, "utf8");
  } catch {
    await writeFile(DATA_FILE, "[]", "utf8");
  }
}

async function readFileBookings() {
  await ensureStore();
  const raw = await readFile(DATA_FILE, "utf8");
  return JSON.parse(raw);
}

async function writeFileBookings(bookings) {
  await ensureStore();
  await writeFile(DATA_FILE, JSON.stringify(bookings, null, 2), "utf8");
}

async function readBookings() {
  if (!shouldUseNetlifyBlobs()) {
    return readFileBookings();
  }

  const store = getBookingsBlobStore();
  const bookings = await store.get(BLOB_KEY, { type: "json" });
  return Array.isArray(bookings) ? bookings : [];
}

async function writeBookings(bookings) {
  if (!shouldUseNetlifyBlobs()) {
    await writeFileBookings(bookings);
    return;
  }

  const store = getBookingsBlobStore();
  await store.setJSON(BLOB_KEY, bookings);
}

export async function getSlotsForDate(date) {
  const bookings = await readBookings();
  const activeBookings = bookings.filter((booking) => booking.date === date && booking.status !== "cancelled");

  return SLOT_TIMES.map(([start, end]) => {
    const match = activeBookings.find((booking) => booking.slot_start_time === start);
    return {
      start,
      end,
      status: match?.status || "available",
      booking: match || null,
    };
  });
}

export async function getBookingsForDate(date) {
  const bookings = await readBookings();
  return bookings
    .filter((booking) => booking.date === date && booking.status !== "cancelled")
    .sort((a, b) => a.slot_start_time.localeCompare(b.slot_start_time));
}

export async function createBooking({ date, slot_start_time, player_name, player_phone, status = "booked" }) {
  if (!isDateInWindow(date)) {
    throw new Error("Date is outside the booking window.");
  }

  const slot = SLOT_TIMES.find(([start]) => start === slot_start_time);
  if (!slot) {
    throw new Error("Invalid slot selected.");
  }

  const [start, end] = slot;
  const bookings = await readBookings();
  const alreadyTaken = bookings.some(
    (booking) =>
      booking.date === date &&
      booking.slot_start_time === start &&
      booking.status !== "cancelled",
  );

  if (alreadyTaken) {
    throw new Error("That slot is already booked.");
  }

  const booking = {
    id: randomUUID(),
    date,
    slot_start_time: start,
    slot_end_time: end,
    player_name: status === "blocked" ? "Owner blocked" : player_name.trim(),
    player_phone: status === "blocked" ? "" : player_phone.trim(),
    status,
    created_at: new Date().toISOString(),
  };

  bookings.push(booking);
  await writeBookings(bookings);
  return booking;
}

export async function cancelBooking(id) {
  const bookings = await readBookings();
  const index = bookings.findIndex((booking) => booking.id === id);
  if (index === -1) {
    throw new Error("Booking not found.");
  }
  bookings[index] = { ...bookings[index], status: "cancelled" };
  await writeBookings(bookings);
  return bookings[index];
}
