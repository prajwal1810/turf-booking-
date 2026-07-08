import { NextResponse } from "next/server";
import { getSlotsForDate } from "@/lib/store";
import { isDateInWindow } from "@/lib/slots";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date || !isDateInWindow(date)) {
    return NextResponse.json({ error: "Choose a date inside the next 14 days." }, { status: 400 });
  }

  const slots = await getSlotsForDate(date);
  return NextResponse.json({ slots });
}
