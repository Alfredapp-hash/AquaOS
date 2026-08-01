import Link from "next/link";
import { dashboardMetrics } from "@/lib/demo-data";

const insights = [
  "Frozen food is the fastest-growing category this month (+38%).",
  "Reef Crystals Salt is the top-selling merchandise item by units.",
  "$4,820 is tied up in inventory with no sale in 180+ days.",
  "Blue Green Chromis mortality is above the configured threshold.",
];

const modules = [
  ["Livestock operations", "/livestock", "Batches, mortality, quarantine, landed cost, and tank assignment."],
  ["Receive livestock", "/livestock/receive", "Capture a shipment, DOA losses, freight, and initial tank placement."],
  ["Merchandise inventory", "/inventory", "Stock levels, movement history, aging, and reorder controls."],
  ["Service calendar", "/service", "Recurring appointments and customer cadence monitoring."],
];

export default function DashboardPage() {
  return (
    <main className="page">
      <header className="page-header">
        <div><span className="eyebrow">Owner command center</span><h1>Good evening, Brian.</h1><p className="muted">A unified view of retail, livestock, service, and profitability.</p></div>
        <div className="panel"><strong>July performance</strong><div className="positive">Revenue is pacing 11.4% ahead.</div></div>
      </header>

      <section className="dashboard-grid">
        {dashboardMetrics.map(([label,value,detail])=><article className="panel" key={label}><div className="muted">{label}</div><div className="metric-value">{value}</div><small>{detail}</small></article>)}
      </section>

      <section className="two-column" style={{marginTop:16}}>
        <article className="panel"><h2>Revenue by department</h2><div style={{height:280,display:"grid",placeItems:"center",border:"1px dashed rgba(124,211,252,.25)",borderRadius:14}}><div><strong>Merchandise 48%</strong><p className="muted">Livestock 27% · Service 21% · Other 4%</p></div></div></article>
        <article className="panel"><h2>Owner’s morning brief</h2>{insights.map(item=><p key={item}>• {item}</p>)}</article>
      </section>

      <section className="dashboard-grid" style={{marginTop:16}}>
        {modules.map(([title,href,description])=><Link href={href} className="panel" key={href}><h3>{title}</h3><p className="muted">{description}</p><span className="positive">Open module →</span></Link>)}
      </section>
    </main>
  );
}
