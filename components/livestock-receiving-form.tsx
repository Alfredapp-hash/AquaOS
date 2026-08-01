"use client";

import { useActionState, useMemo, useState } from "react";
import { initialReceivingState, receiveLivestockAction } from "@/app/livestock/receive/actions";

export function LivestockReceivingForm() {
  const [state, formAction, pending] = useActionState(receiveLivestockAction, initialReceivingState);
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

  const errors = Object.values(state.fieldErrors ?? {}).flat();

  return (
    <div className="two-column">
      <form className="panel" action={formAction}>
        <input type="hidden" name="actorId" value="demo-owner" />
        <input type="hidden" name="quantityOrdered" value={quantityReceived} />
        <input type="hidden" name="quantityShipped" value={quantityReceived} />
        <h2>Shipment and batch details</h2>

        {state.message ? (
          <div className={state.status === "success" ? "notice success" : "notice error"} role="status">
            <strong>{state.message}</strong>
            {state.batchId ? <div className="muted">Batch ID: {state.batchId}</div> : null}
          </div>
        ) : null}
        {errors.length ? <div className="notice error"><ul>{errors.map((error) => <li key={error}>{error}</li>)}</ul></div> : null}

        <div className="form-grid">
          <div className="field"><label htmlFor="supplier">Supplier</label><select id="supplier" name="supplierId" defaultValue="supplier-quality-marine"><option value="supplier-quality-marine">Quality Marine</option></select></div>
          <div className="field"><label htmlFor="po">Purchase order</label><select id="po" name="purchaseOrderId" defaultValue="po-demo-71"><option value="po-demo-71">PO-2026-0071</option><option value="">Receive without PO</option></select></div>
          <div className="field"><label htmlFor="species">Species</label><select id="species" name="speciesId" defaultValue="species-ocellaris"><option value="species-ocellaris">Ocellaris Clownfish — Amphiprion ocellaris</option></select></div>
          <div className="field"><label htmlFor="reference">Shipment reference</label><input id="reference" name="shipmentReference" placeholder="Invoice, airway bill, or box reference" /></div>
          <div className="field"><label htmlFor="received">Quantity received</label><input id="received" name="quantityReceived" type="number" min="1" value={quantityReceived} onChange={e=>setQuantityReceived(Number(e.target.value))} /></div>
          <div className="field"><label htmlFor="doa">Dead on arrival</label><input id="doa" name="quantityDoa" type="number" min="0" max={quantityReceived} value={quantityDoa} onChange={e=>setQuantityDoa(Number(e.target.value))} /></div>
          <div className="field"><label htmlFor="cost">Unit purchase cost</label><input id="cost" name="unitPurchaseCost" type="number" min="0" step="0.01" value={unitCost} onChange={e=>setUnitCost(Number(e.target.value))} /></div>
          <div className="field"><label htmlFor="retail">Retail price</label><input id="retail" name="retailPrice" type="number" min="0.01" step="0.01" defaultValue="39.99" /></div>
          <div className="field"><label htmlFor="freight">Allocated freight</label><input id="freight" name="freightCost" type="number" min="0" step="0.01" value={freight} onChange={e=>setFreight(Number(e.target.value))} /></div>
          <div className="field"><label htmlFor="packing">Packing charges</label><input id="packing" name="packingCost" type="number" min="0" step="0.01" value={packing} onChange={e=>setPacking(Number(e.target.value))} /></div>
          <div className="field"><label htmlFor="tank">Initial tank</label><select id="tank" name="tankId" defaultValue="tank-sw-q2"><option value="tank-sw-q1">SW-Q1 — Quarantine</option><option value="tank-sw-q2">SW-Q2 — Quarantine</option><option value="tank-sw-12">SW-12 — Sales Floor</option></select></div>
          <div className="field"><label htmlFor="status">Initial status</label><select id="status" name="status" defaultValue="QUARANTINE"><option value="QUARANTINE">Quarantine</option><option value="NOT_FOR_SALE">Not for sale</option><option value="AVAILABLE">Available</option></select></div>
          <div className="field full"><label htmlFor="notes">Receiving notes</label><textarea id="notes" name="notes" rows={4} placeholder="Condition, acclimation notes, claim details, or treatment observations" /></div>
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:18}}><button className="secondary-button" type="reset" disabled={pending}>Reset</button><button className="primary-button" type="submit" disabled={pending}>{pending ? "Receiving…" : "Complete receiving"}</button></div>
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
        <p className="muted" style={{marginTop:18}}>Completing receiving now writes the shipment, batch, DOA record, tank assignment, purchase-order status, and audit event together. Any failure rolls back the entire operation.</p>
      </aside>
    </div>
  );
}
