import Link from "next/link";
import { LivestockReceivingForm } from "@/components/livestock-receiving-form";

export default function ReceiveLivestockPage() {
  return (
    <main className="page">
      <header className="page-header">
        <div><span className="eyebrow">Livestock / Receiving</span><h1>Receive a livestock shipment</h1><p className="muted">Create a traceable batch, capture DOA, calculate landed cost, and assign living inventory to a store tank.</p></div>
        <Link href="/livestock" className="secondary-button">Back to livestock</Link>
      </header>
      <LivestockReceivingForm />
    </main>
  );
}
