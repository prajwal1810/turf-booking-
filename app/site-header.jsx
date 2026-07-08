"use client";

import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="topbar">
      <a className="brand" href="/">
        <img src="/hyderabad-five-logo.png" alt="Hyderabad Five-A-Side logo" />
      </a>
      <nav className="nav" aria-label="Main navigation">
        <a href="/">Home</a>
        <a className="cta" href="/book">Book slot</a>
        <a href="/terms">Terms</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>
  );
}
