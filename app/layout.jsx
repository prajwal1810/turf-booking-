import "./globals.css";
import SiteHeader from "./site-header";

export const metadata = {
  title: "Hyderabad Five-A-Side",
  description: "Book 1-hour football turf slots in Banjara Hills, Hyderabad.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <SiteHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
