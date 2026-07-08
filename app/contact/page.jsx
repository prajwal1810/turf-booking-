export default function ContactPage() {
  return (
    <main className="main">
      <section className="section">
        <p className="eyebrow">Call or WhatsApp</p>
        <h1>Contact</h1>
        <p className="lead">Hyderabad Five-A-Side, Banjara Hills, Hyderabad. For slot questions, call or message 9876543210.</p>
        <div className="button-row">
          <a className="button-primary" href="tel:9876543210">Call 9876543210</a>
          <a className="button-secondary" href="https://wa.me/919876543210">Open WhatsApp</a>
        </div>
      </section>

      <section className="section">
        <iframe
          className="contact-map"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=Banjara%20Hills%20Hyderabad&output=embed"
          title="Banjara Hills Hyderabad map"
        />
      </section>
    </main>
  );
}
