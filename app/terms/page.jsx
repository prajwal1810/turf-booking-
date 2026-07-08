export default function TermsPage() {
  return (
    <main className="main">
      <section className="section split-section">
        <div>
          <p className="eyebrow">Hyderabad Five-A-Side</p>
          <h1>Booking terms</h1>
        </div>
        <p className="section-copy">
          These terms keep the slot system fair for players and easy for the owner to manage. The website is for
          reservation only; payment, if required, is handled directly with the turf.
        </p>
      </section>

      <section className="section terms-page-grid">
        <div className="panel">
          <strong>Slot timing</strong>
          <p>Each booking reserves one fixed 1-hour football slot between 4 PM and 11 PM.</p>
        </div>
        <div className="panel">
          <strong>Arrival</strong>
          <p>Players should arrive 10 minutes early so the game can start on time.</p>
        </div>
        <div className="panel">
          <strong>Confirmation</strong>
          <p>Your slot is confirmed on screen after submitting name and phone number.</p>
        </div>
        <div className="panel">
          <strong>Cancellation</strong>
          <p>Player cancellation is handled by calling or WhatsApp messaging the turf owner.</p>
        </div>
        <div className="panel">
          <strong>Owner blocks</strong>
          <p>The owner can block slots for maintenance, private games, or weather-related ground conditions.</p>
        </div>
        <div className="panel">
          <strong>Conduct</strong>
          <p>Players are expected to respect time limits, staff instructions, and other teams using the venue.</p>
        </div>
      </section>

      <section className="section notice">
        For questions or changes to a booking, WhatsApp <a href="https://wa.me/919876543210">9876543210</a>.
      </section>
    </main>
  );
}
