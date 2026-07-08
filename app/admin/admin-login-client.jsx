"use client";

import { useState } from "react";

export default function AdminLoginClient() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const payload = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(payload.error || "Login failed.");
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <main className="admin-login-main">
      <section className="admin-login-card">
        <p className="admin-kicker">Owner access</p>
        <h1>Admin sign in</h1>
        <p className="admin-muted">Enter the private owner password to manage bookings, blocked slots, and cancellations.</p>
        <form onSubmit={login}>
          <div className="admin-field">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          <button className="admin-primary" disabled={loading}>{loading ? "Checking..." : "Sign in"}</button>
          {error ? <p className="admin-error">{error}</p> : null}
        </form>
      </section>
    </main>
  );
}
