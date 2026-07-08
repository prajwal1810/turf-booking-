"use client";

import { useEffect, useMemo, useState } from "react";

function formatSlot(slot) {
  const start = slot.start || slot.slot_start_time;
  const end = slot.end || slot.slot_end_time;
  return `${toDisplay(start)} - ${toDisplay(end)}`;
}

function toDisplay(value) {
  if (!value) return "";
  const [hour] = value.split(":").map(Number);
  return `${hour % 12 || 12} ${hour >= 12 ? "PM" : "AM"}`;
}

export default function BookingClient({ today, maxDate }) {
  const [date, setDate] = useState(today);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const availableCount = useMemo(() => slots.filter((slot) => slot.status === "available").length, [slots]);

  async function loadSlots(nextDate = date) {
    setError("");
    const response = await fetch(`/api/slots?date=${nextDate}`, { cache: "no-store" });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "Could not load slots.");
      return;
    }
    setSlots(payload.slots);
  }

  useEffect(() => {
    loadSlots(date);
  }, [date]);

  async function submitBooking(event) {
    event.preventDefault();
    if (!selectedSlot) return;
    setLoading(true);
    setError("");
    setMessage("");

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        slot_start_time: selectedSlot.start,
        player_name: name,
        player_phone: phone,
      }),
    });
    const payload = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(payload.error || "Booking failed.");
      await loadSlots(date);
      return;
    }

    setMessage(`You're booked for ${formatSlot(payload.booking)} on ${date}. See you at Hyderabad Five-A-Side, Banjara Hills.`);
    setName("");
    setPhone("");
    setSelectedSlot(null);
    await loadSlots(date);
  }

  return (
    <section className="section booking-layout">
      <aside className="form-panel">
        <div className="field">
          <label htmlFor="date">Date</label>
          <input id="date" type="date" min={today} max={maxDate} value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <div className="ticket">
          <strong>Availability</strong>
          <p>{availableCount} of 7 slots open for this date.</p>
        </div>
        {selectedSlot ? (
          <form onSubmit={submitBooking}>
            <h3>{formatSlot(selectedSlot)}</h3>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" value={name} onChange={(event) => setName(event.target.value)} minLength={2} required />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone number</label>
              <input id="phone" value={phone} onChange={(event) => setPhone(event.target.value)} pattern="[0-9]{10}" placeholder="10 digit mobile" required />
            </div>
            <button className="button-primary" disabled={loading}>{loading ? "Booking..." : "Confirm booking"}</button>
          </form>
        ) : (
          <p className="lead">Tap an available time on the board to book.</p>
        )}
        {error ? <p className="error">{error}</p> : null}
        {message ? (
          <div className="notice">
            {message} Need help? <a href="https://wa.me/919876543210">WhatsApp us</a>.
          </div>
        ) : null}
      </aside>

      <div className="slot-grid">
        {slots.map((slot) => (
          <button
            className={`slot ${slot.status} ${selectedSlot?.start === slot.start ? "selected" : ""}`}
            disabled={slot.status !== "available"}
            key={slot.start}
            onClick={() => setSelectedSlot(slot)}
            type="button"
          >
            <time>{formatSlot(slot)}</time>
            <span>{slot.status === "available" ? "Available" : slot.status}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
