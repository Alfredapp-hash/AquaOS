const metrics = [
  ["Monthly revenue", "$84,260", "+11.4% vs last month"],
  ["Gross profit", "$35,840", "42.5% margin"],
  ["Inventory value", "$96,410", "Merchandise + livestock"],
  ["Average ticket", "$86.20", "+$7.40 month over month"],
  ["Low-stock items", "17", "6 require immediate order"],
  ["Services overdue", "21", "Based on each customer’s cadence"],
];

const insights = [
  "Frozen food is the fastest-growing category this month (+38%).",
  "Reef Crystals Salt is the top-selling product by units.",
  "$4,820 is tied up in inventory with no sale in 180+ days.",
  "Three livestock species currently have negative realized margin.",
];

export default function DashboardPage() {
  return (
    <main style={{ maxWidth: 1440, margin: "0 auto", padding: "32px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "end", marginBottom: 28 }}>
        <div><p className="muted">AquaOS / Owner command center</p><h1 style={{ fontSize: 38, margin: 0 }}>Good evening, Mike.</h1></div>
        <div className="panel"><strong>July performance</strong><div className="positive">Revenue is pacing 11.4% ahead.</div></div>
      </header>

      <section className="dashboard-grid">
        {metrics.map(([label, value, detail]) => <article className="panel" key={label}><div className="muted">{label}</div><div style={{ fontSize: 30, fontWeight: 750, margin: "8px 0" }}>{value}</div><small>{detail}</small></article>)}
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginTop: 16 }}>
        <article className="panel"><h2>Revenue trend</h2><div style={{ height: 280, display: "grid", placeItems: "center", border: "1px dashed rgba(124,211,252,.25)", borderRadius: 14 }}><span className="muted">Chart integration scaffold</span></div></article>
        <article className="panel"><h2>Owner’s morning brief</h2>{insights.map((item) => <p key={item}>• {item}</p>)}</article>
      </section>

      <section className="dashboard-grid" style={{ marginTop: 16 }}>
        {['Inventory','Livestock','Customers','Service calendar','Vendors','Reports'].map((module) => <article className="panel" key={module}><h3>{module}</h3><p className="muted">Module route and data views planned for v0.1.</p></article>)}
      </section>
    </main>
  );
}
