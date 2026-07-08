import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { cancelBooking, createBooking, getBookingsForDate, getSlotsForDate } from "@/lib/store";

async function requireAdmin() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return null;
}

export async function GET(request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const [bookings, slots] = await Promise.all([getBookingsForDate(date), getSlotsForDate(date)]);
  return NextResponse.json({ bookings, slots });
}

export async function POST(request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = await request.json();
  if (body.action !== "block") {
    return NextResponse.json({ error: "Unsupported action." }, { status: 400 });
  }

  try {
    const booking = await createBooking({
      date: body.date,
      slot_start_time: body.slot_start_time,
      player_name: "Owner blocked",
      player_phone: "",
      status: "blocked",
    });
    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 409 });
  }
}

export async function PATCH(request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = await request.json();
  if (body.action !== "cancel") {
    return NextResponse.json({ error: "Unsupported action." }, { status: 400 });
  }

  try {
    const booking = await cancelBooking(body.id);
    return NextResponse.json({ booking });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
