import BookingClient from "./booking-client";
import { maxBookableDateIso, todayIso } from "@/lib/slots";

export default function BookPage() {
  return (
    <main className="main">
      <section className="section">
        <p className="eyebrow">Book your game</p>
        <h1>Pick a 1-hour slot</h1>
        <p className="lead">Slots run daily from 4 PM to 11 PM. Choose a date, select an open slot, and confirm with your name and phone number.</p>
      </section>
      <BookingClient today={todayIso()} maxDate={maxBookableDateIso()} />
    </main>
  );
}
