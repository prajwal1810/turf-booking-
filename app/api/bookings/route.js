import { NextResponse } from "next/server";
import { createBooking } from "@/lib/store";

export async function POST(request) {
  const body = await request.json();
  const playerName = String(body.player_name || "").trim();
  const playerPhone = String(body.player_phone || "").trim();

  if (playerName.length < 2) {
    return NextResponse.json({ error: "Enter the player's name." }, { status: 400 });
  }

  if (!/^\d{10}$/.test(playerPhone)) {
    return NextResponse.json({ error: "Enter a valid 10 digit phone number." }, { status: 400 });
  }

  try {
    const booking = await createBooking({
      date: body.date,
      slot_start_time: body.slot_start_time,
      player_name: playerName,
      player_phone: playerPhone,
    });
    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 409 });
  }
}
