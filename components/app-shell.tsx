import Link from "next/link";
import type { ReactNode } from "react";

const navigation = [
  ["Dashboard", "/"],
  ["Point of sale", "/pos"],
  ["Merchandise", "/inventory"],
  ["Livestock", "/livestock"],
  ["Store tanks", "/tanks"],
  ["Purchasing", "/purchasing"],
  ["Customers", "/customers"],
  ["Service", "/service"],
  ["Invoices", "/billing"],
  ["Reports", "/reports"],
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark">A</div>
        <div>
          <strong>AquariumOS</strong>
          <p className="muted compact">Temecula Aquatics</p>
        </div>
        <nav aria-label="Primary navigation">
          {navigation.map(([label, href]) => (
            <Link href={href} key={href} className="nav-link">
              {label}
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="status-dot" /> System operational
        </div>
      </aside>
      <div className="app-content">
        <header className="topbar">
          <div>
            <span className="eyebrow">Main location</span>
            <strong>Friday, July 31</strong>
          </div>
          <div className="topbar-actions">
            <button className="secondary-button">Search</button>
            <div className="avatar">BS</div>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
