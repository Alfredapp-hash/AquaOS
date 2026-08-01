"use client";

import { useMemo, useState } from "react";

export function LivestockReceivingForm() {
  const [quantityReceived, setQuantityReceived] = useState(24);
  const [quantityDoa, setQuantityDoa] = useState(1);
  const [unitCost, setUnitCost] = useState(16.5);
  const [freight, setFreight] = useState(46);
  const [packing, setPacking] = useState(0);

  const totals = useMemo(() => {
    const alive = Math.max(0, quantityReceived - quantityDoa);
    const landedTotal = quantityReceived * unitCost + freight + packing;
    const landedUnit = alive > 0 ? landedTotal / alive : 0;
    return { alive, landedTotal, landedUnit };
  }, [quantityReceived, quantityDoa, unitCost, freight, packing]);

  return (
    <div className="two-column">
      <form className="panel" onSubmit={(event) => event.preventDefault()}>
        <h2>Shipment and batch details</h2>
        <div className="form-grid">
          <div className="field"><label htmlFor="supplier">Supplier</label><select id="supplier" defaultValue="Quality Marine"><option>Quality Marine</option><option>Sea Dwelling Creatures</option><option>Biota</option><option>Aquatic Arts</option></select></div>
          <div className="field"><label htmlFor="po">Purchase order</label><select id="po" defaultValue="PO-2026-0071"><option>PO-2026-0071</option><option>Receive without PO</option></select></div>
          <div className="field"><label htmlFor="species">Species</label><input id="species" defaultValue="Ocellaris Clownfish" /></div>
          <div className="field"><label htmlFor="scientific">Scientific name</label><input id="scientific" defaultValue="Amphiprion ocellaris" /></div>
          <div className="field"><label htmlFor="received">Quantity received</label><input id="received" type="number" min="0" value={quantityReceived} onChange={e=>setQuantityReceived(Number(e.target.value))} /></div>
          <div className="field"><label htmlFor="doa">Dead on arrival</label><input id="doa" type="number" min="0" max={quantityReceived} value={quantityDoa} onChange={e=>setQuantityDoa(Number(e.target.value))} /></div>
          <div className="field"><label htmlFor="cost">Unit purchase cost</label><input id="cost" type="number" min="0" step="0.01" value={unitCost} onChange={e=>setUnitCost(Number(e.target.value))} /></div>
          <div className="field"><label htmlFor="retail">Retail price</label><input id="retail" type="number" min="0" step="0.01" defaultValue="39.99" /></div>
          <div className="field"><label htmlFor="freight">Allocated freight</label><input id="freight" type="number" min="0" step="0.01" value={freight} onChange={e=>setFreight(Number(e.target.value))} /></div>
          <div className="field"><label htmlFor="packing">Packing charges</label><input id="packing" type="number" min="0" step="0.01" value={packing} onChange={e=>setPacking(Number(e.target.value))} /></div>
          <div className="field"><label htmlFor="tank">Initial tank</label><select id="tank" defaultValue="SW-Q2"><option>SW-Q1</option><option>SW-Q2</option><option>SW-12</option></select></div>
          <div className="field"><label htmlFor="status">Initial status</label><select id="status" defaultValue="QUARANTINE"><option value="QUARANTINE">Quarantine</option><option value="NOT_FOR_SALE">Not for sale</option><option value="AVAILABLE">Available</option></select></div>
          <div className="field full"><label htmlFor="notes">Receiving notes</label><textarea id="notes" rows={4} placeholder="Condition, acclimation notes, claim details, or treatment observations" /></div>
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:18}}><button className="secondary-button" type="button">Save draft</button><button className="primary-button" type="submit">Complete receiving</button></div>
      </form>

      <aside className="panel">
        <span className="eyebrow">Receiving calculation</span><h2>Batch summary</h2>
        <div className="summary-list">
          <div className="summary-row"><span className="muted">Received alive</span><strong>{totals.alive}</strong></div>
          <div className="summary-row"><span className="muted">DOA rate</span><strong className={quantityDoa>0?"warning":"positive"}>{quantityReceived?((quantityDoa/quantityReceived)*100).toFixed(1):"0.0"}%</strong></div>
          <div className="summary-row"><span className="muted">Purchase value</span><strong>${(quantityReceived*unitCost).toFixed(2)}</strong></div>
          <div className="summary-row"><span className="muted">Landed batch cost</span><strong>${totals.landedTotal.toFixed(2)}</strong></div>
          <div className="summary-row"><span className="muted">True landed unit cost</span><strong>${totals.landedUnit.toFixed(2)}</strong></div>
        </div>
        <p className="muted" style={{marginTop:18}}>Completing receiving will create the shipment batch, assign living quantity to the selected tank, record DOA losses, establish landed cost, and preserve supplier claim eligibility.</p>
      </aside>
    </div>
  );
}
