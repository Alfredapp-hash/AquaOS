import Link from "next/link";
import { livestockBatches, storeTanks } from "@/lib/demo-data";

export default function LivestockPage() {
  const received = livestockBatches.reduce((sum, batch) => sum + batch.received, 0);
  const available = livestockBatches.reduce((sum, batch) => sum + batch.available, 0);
  const losses = livestockBatches.reduce((sum, batch) => sum + batch.doa + batch.mortality, 0);
  const mortalityRate = ((losses / received) * 100).toFixed(1);
  const retailValue = livestockBatches.reduce((sum, batch) => sum + batch.available * batch.retail, 0);

  return (
    <main className="page">
      <header className="page-header">
        <div><span className="eyebrow">Livestock operations</span><h1>Every animal, batch, tank, and dollar</h1><p className="muted">Shipment-level traceability with landed cost and mortality visibility.</p></div>
        <Link href="/livestock/receive" className="primary-button">Receive livestock</Link>
      </header>

      <section className="dashboard-grid">
        <article className="panel"><span className="muted">Available livestock</span><div className="metric-value">{available}</div><small>Across {livestockBatches.length} active batches</small></article>
        <article className="panel"><span className="muted">Retail value</span><div className="metric-value">${retailValue.toLocaleString(undefined,{maximumFractionDigits:0})}</div><small>Current available quantity</small></article>
        <article className="panel"><span className="muted">Mortality + DOA</span><div className="metric-value">{mortalityRate}%</div><small>{losses} of {received} received animals</small></article>
        <article className="panel"><span className="muted">Quarantine batches</span><div className="metric-value">1</div><small>8 animals currently unavailable</small></article>
      </section>

      <section className="panel" style={{marginTop:16}}>
        <h2>Active shipment batches</h2>
        <div className="table-wrap"><table><thead><tr><th>Batch</th><th>Species</th><th>Supplier</th><th>Tank</th><th>Available</th><th>Losses</th><th>Landed cost</th><th>Retail</th><th>Status</th></tr></thead><tbody>
          {livestockBatches.map((batch)=><tr key={batch.id}><td><strong>{batch.id}</strong></td><td>{batch.species}<div className="muted">{batch.scientific}</div></td><td>{batch.supplier}</td><td>{batch.tank}</td><td>{batch.available}</td><td className={batch.doa+batch.mortality>5?"danger":""}>{batch.doa+batch.mortality}</td><td>${batch.landedCost.toFixed(2)}</td><td>${batch.retail.toFixed(2)}</td><td><span className="badge">{batch.status}</span></td></tr>)}
        </tbody></table></div>
      </section>

      <section className="panel" style={{marginTop:16}}><h2>Store tank status</h2><div className="dashboard-grid">{storeTanks.map(tank=><article key={tank.name}><strong>{tank.name}</strong><p className="muted compact">{tank.type} · {tank.volume} gal</p><p>{tank.livestock} animals</p><span className={tank.alert?"warning":"positive"}>{tank.status}</span></article>)}</div></section>
    </main>
  );
}
