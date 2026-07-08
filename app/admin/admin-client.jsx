"use client";

import { useEffect, useState } from "react";

function todayIso() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function formatSlot(booking) {
  return `${toDisplay(booking.slot_start_time)} - ${toDisplay(booking.slot_end_time)}`;
}

function toDisplay(value) {
  const [hour] = value.split(":").map(Number);
  return `${hour % 12 || 12} ${hour >= 12 ? "PM" : "AM"}`;
}

export default function AdminClient() {
  const [date, setDate] = useState(todayIso());
  const [bookings, setBookings] = useState([]);
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState("");

  async function loadDashboard() {
    const response = await fetch(`/api/admin/bookings?date=${date}`, { cache: "no-store" });
    const payload = await response.json();
    if (response.status === 401) {
      window.location.href = "/admin";
      return;
    }
    if (!response.ok) {
      setError(payload.error || "Could not load admin data.");
      return;
    }
    setBookings(payload.bookings);
    setSlots(payload.slots);
  }

  async function cancelBooking(id) {
    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action: "cancel" }),
    });
    await loadDashboard();
  }

  async function blockSlot(start) {
    const response = await fetch("/api/admin/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, slot_start_time: start, action: "block" }),
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "Could not block slot.");
      return;
    }
    await loadDashboard();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin";
  }

  useEffect(() => {
    loadDashboard();
  }, [date]);

  return (
    <section className="admin-dashboard">
      <aside className="admin-panel">
        <div className="admin-toolbar">
          <h2>Day view</h2>
          <button className="admin-secondary" onClick={logout} type="button">Logout</button>
        </div>
        <div className="admin-field">
          <label htmlFor="admin-date">Date</label>
          <input id="admin-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <h3>Block open slot</h3>
        <div className="admin-action-list">
          {slots.filter((slot) => slot.status === "available").map((slot) => (
            <button className="admin-secondary" key={slot.start} onClick={() => blockSlot(slot.start)} type="button">
              Block {toDisplay(slot.start)} - {toDisplay(slot.end)}
            </button>
          ))}
        </div>
        {error ? <p className="admin-error">{error}</p> : null}
      </aside>

      <div className="admin-booking-list">
        {bookings.length ? bookings.map((booking) => (
          <div className="admin-booking-row" key={booking.id}>
            <strong>{formatSlot(booking)}</strong>
            <div>
              <span className="admin-pill">{booking.status}</span>
              <p>{booking.player_name}{booking.player_phone ? ` / ${booking.player_phone}` : ""}</p>
            </div>
            <button className="admin-danger" onClick={() => cancelBooking(booking.id)} type="button">Cancel</button>
          </div>
        )) : <div className="admin-empty">No active bookings for this date.</div>}
      </div>
    </section>
  );
}
