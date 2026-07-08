export default function HomePage() {
  return (
    <main className="main">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Banjara Hills football turf</p>
          <h1>Hyderabad Five-A-Side</h1>
          <p className="lead">
            Book a 1-hour floodlit football slot for your squad. Fast reservations, clear timings, and no account
            signup before the game.
          </p>
          <div className="hero-meta" aria-label="Quick venue facts">
            <span className="important">Open 4 PM-11 PM</span>
            <span>5-a-side football</span>
            <span>Banjara Hills</span>
          </div>
          <div className="button-row">
            <a className="button-primary" href="/book">Book a slot</a>
            <a className="button-secondary" href="https://wa.me/919876543210">WhatsApp</a>
          </div>
        </div>
      </section>

      <section className="section info-grid" aria-label="Turf details">
        <div className="panel">
          <strong>Hours</strong>
          <p>Daily from 4 PM to 11 PM. Seven fixed 1-hour slots.</p>
        </div>
        <div className="panel">
          <strong>Facilities</strong>
          <p>Turf, floodlights, and a small outdoor seating area for waiting players.</p>
        </div>
        <div className="panel">
          <strong>Location</strong>
          <p>Banjara Hills, Hyderabad. Exact map and contact details are on the contact page.</p>
        </div>
      </section>

      <section className="section split-section">
        <div>
          <p className="eyebrow">Match night made simple</p>
          <h2>Arrive, lace up, play.</h2>
        </div>
        <p className="section-copy">
          Hyderabad Five-A-Side keeps booking simple: choose today or any date in the next 14 days, select an open
          1-hour slot, enter your name and phone number, and your time is reserved instantly. No payment gateway,
          no account signup, no long forms.
        </p>
      </section>

      <section className="section steps-grid" aria-label="How booking works">
        <div className="step-card">
          <span>01</span>
          <h3>Pick date</h3>
          <p>Choose any available date in the booking window and check the live slot board.</p>
        </div>
        <div className="step-card">
          <span>02</span>
          <h3>Select slot</h3>
          <p>Available timings are shown like a match schedule. Booked and blocked slots are disabled.</p>
        </div>
        <div className="step-card">
          <span>03</span>
          <h3>Confirm</h3>
          <p>Add your name and 10-digit phone number. The slot is locked as soon as you confirm.</p>
        </div>
      </section>

      <section className="section gallery-grid" aria-label="Football turf photos">
        <img
          src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=900&q=80"
          alt="Football on a grass pitch"
        />
        <img
          src="https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=900&q=80"
          alt="Football players competing"
        />
        <img
          src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=80"
          alt="Football stadium lights"
        />
      </section>

      <section className="section detail-band">
        <div>
          <p className="eyebrow">Facilities</p>
          <h2>Built for evening football.</h2>
        </div>
        <div className="detail-list">
          <p><strong>Playing surface:</strong> Football turf suitable for 5-a-side games and short training sessions.</p>
          <p><strong>Lighting:</strong> Floodlights for the full evening schedule from 4 PM to 11 PM.</p>
          <p><strong>Waiting area:</strong> Small outdoor seating space for substitutes and the next team.</p>
          <p><strong>Support:</strong> Call or WhatsApp 9876543210 for booking questions and venue directions.</p>
        </div>
      </section>

      <section className="section terms-preview">
        <div>
          <p className="eyebrow">Booking terms</p>
          <h2>Clear rules before kickoff.</h2>
        </div>
        <div className="terms-list">
          <p>Bookings are for fixed 1-hour slots. Please arrive 10 minutes before your start time.</p>
          <p>Player cancellations are handled by contacting the owner on WhatsApp. Admin can cancel or block slots.</p>
          <p>No payment is collected on the website. Any advance or ground fee can be handled directly with the turf.</p>
          <p>Management may block slots for maintenance, private events, or weather-related issues.</p>
          <a className="button-secondary" href="/terms">Read full terms</a>
        </div>
      </section>
    </main>
  );
}
