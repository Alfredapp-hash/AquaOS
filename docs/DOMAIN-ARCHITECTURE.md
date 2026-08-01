# AquariumOS Domain Architecture

## Architectural direction

AquariumOS begins as a modular monolith with strict domain boundaries. This preserves transactional consistency for POS and inventory while allowing high-change domains to be separated into services later.

## Bounded domains

### Identity and tenancy
Company, location, user, role, permission, sessions and location access.

### Catalog and merchandise inventory
Products, variants, location balances, lot/serial metadata and the immutable movement ledger.

### Livestock operations
Species, shipments, livestock batch items, landed cost, holding tanks, transfers, quarantine, treatment and mortality.

### Purchasing
Suppliers, purchase orders, partial receipts, back orders, freight allocation, DOA claims and credits.

### Commerce
POS carts, sales, line items, discounts, payments, refunds, deposits, store credit and receipts.

### Customer records
Customer identity, consent, tags, communication history, lifetime metrics and duplicate detection.

### Customer aquariums
Aquarium identity, equipment, livestock, water tests, emergency details and complete timeline.

### Field service
Appointments, recurrence, technician assignment, offline job execution, checklists, materials, service logs and cadence scoring.

### Billing
Estimates, approvals, invoices, partial payments, recurring billing state and accounts receivable.

### Analytics
Read-optimized facts and aggregates for revenue, margin, inventory, supplier, livestock, service and customer performance.

### Governance
Audit events, exports, retention, notification policy and integration delivery logs.

## Core invariants

1. A completed sale must create balanced inventory movements in the same transaction.
2. A livestock sale must reference a livestock batch and therefore retain shipment and landed-cost lineage.
3. A livestock batch cannot report more sold, available and deceased quantity than was received alive after approved adjustments.
4. Every manual inventory adjustment must identify actor, timestamp, quantity and reason.
5. Products under treatment or marked not for sale require an authorized override before sale.
6. Completing a service job creates an immutable service log.
7. Service-consumed inventory creates movement records against the assigned truck or store location.
8. Sensitive actions create audit events and never overwrite prior events.
9. Location-scoped users cannot query or mutate unauthorized location data.
10. Payment processor tokens may be stored; raw card numbers may not.

## Analytics strategy

Transactional tables remain the source of truth. Analytics should use derived daily fact tables or materialized views rather than embedding calculated totals in mutable source records.

Initial aggregates:

- `daily_sales_fact`
- `product_sales_fact`
- `livestock_batch_profitability_fact`
- `supplier_performance_fact`
- `inventory_age_fact`
- `service_job_profitability_fact`
- `customer_value_fact`
- `service_cadence_fact`

All aggregates must be rebuildable from source transactions.

## Offline strategy

POS and technician clients use locally persisted operation queues with generated idempotency keys. The server records each accepted key and rejects duplicate replays. Conflicts use domain-specific resolution rather than last-write-wins for inventory or payments.

## Suggested application structure

```text
src/
  app/
  domains/
    identity/
    catalog/
    inventory/
    livestock/
    purchasing/
    commerce/
    customers/
    aquariums/
    service/
    billing/
    analytics/
    governance/
  components/
  db/
  lib/
  integrations/
  jobs/
```

Each domain owns its commands, queries, validation, permissions and tests. UI routes may compose domain queries but must not directly implement financial or inventory rules.

## First vertical slice

Build one fully connected workflow before broad UI expansion:

1. Create supplier, species and store tank.
2. Create and receive livestock purchase order.
3. Record DOA and calculate landed unit cost.
4. Put surviving livestock into quarantine or available status.
5. Sell livestock through POS to a customer.
6. Attach the animal to the customer's aquarium.
7. Verify inventory, batch profitability, customer history and dashboard metrics.

This slice validates the platform's central competitive relationship end to end.
