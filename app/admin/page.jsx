import AdminClient from "./admin-client";
import AdminLoginClient from "./admin-login-client";
import { isAdmin } from "@/lib/auth";

export default async function AdminPage() {
  const authed = await isAdmin();

  if (!authed) {
    return <AdminLoginClient />;
  }

  return (
    <main className="admin-main">
      <section className="admin-hero">
        <div>
          <p className="admin-kicker">Private dashboard</p>
          <h1>Owner control room</h1>
          <p className="admin-muted">View daily bookings, block maintenance slots, and cancel reservations from one focused screen.</p>
        </div>
      </section>
      <AdminClient />
    </main>
  );
}
