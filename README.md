# Hyderabad Five-A-Side Turf Booking

Local Next.js booking site for a single 5-a-side football turf in Banjara Hills.

## Local Admin

- Admin URL: `/admin`

## Run Locally

```powershell
pnpm install
pnpm run dev
```

In this Codex workspace, the app is currently running at:

```text
http://127.0.0.1:4182
```

## Features

- Public home, booking, and contact pages
- 1-hour slots from 4 PM to 11 PM
- 14-day booking window
- Player booking with name and 10-digit phone number
- Screen confirmation only
- Admin date view, manual slot blocking, and cancellation
- Local file-backed persistence in `data/bookings.json`
