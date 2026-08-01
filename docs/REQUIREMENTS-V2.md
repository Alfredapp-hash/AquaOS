# AquariumOS v2 Requirements Baseline

**Status:** Authoritative product baseline  
**Stage:** Pre-development planning  
**Market:** Independent aquarium retail, livestock, pond, installation, and maintenance businesses in the United States

## Product promise

AquariumOS connects the full operational chain:

`Supplier → Purchase order → Shipment → Livestock batch or merchandise lot → Store location/tank → Sale → Customer → Customer aquarium → Service job → Invoice → Profit or loss`

The product must be designed around this chain rather than around a generic retail catalog.

## MVP domains

| Domain | Priority | Core outcome |
|---|---:|---|
| Company, locations, users, roles | P0 | Secure multi-tenant operating foundation |
| Executive dashboard | P0 | Revenue, margin, inventory, service and customer visibility |
| POS | P0 | Mixed merchandise/livestock checkout with immediate inventory mutation |
| Merchandise inventory | P0 | Variants, stock by location, movements, reorder controls |
| Livestock inventory | P0 | Shipment batches, landed cost, tanks, status and mortality |
| Store tanks | P0 | Current stock, system identity and operational timeline |
| Purchasing | P0 | Purchase orders, partial receiving and inventory updates |
| Customer CRM | P0 | Purchase, service, payment and aquarium history |
| Customer aquariums | P0 | Equipment, livestock, service dates and operational notes |
| Service scheduling | P0 | Calendar, recurrence, assignment and overdue detection |
| Technician workflow | P0 | Mobile job execution, tests, checklist, products and photos |
| Estimates, invoices, payments | P0 | Commercial service workflow and receivables |
| Analytics | P0 | Sales, inventory, livestock and service reporting |
| Audit and export | P0 | Traceability and customer data portability |

## Requirement groups

The detailed product specification is organized by stable identifiers. Engineering work must preserve these identifiers in epics, acceptance criteria and tests.

- `DASH-*`: executive dashboard and filtering
- `POS-*`: checkout, returns, guarantees and deposits
- `INV-*`: merchandise records, stock controls and movement history
- `LIVE-*`: livestock batches, mortality, quarantine and landed profitability
- `TANK-*`: store holding systems, testing, treatment and schedules
- `SUP-*`, `PO-*`: suppliers, purchase orders, receiving and credits
- `CRM-*`: customer identity, history, metrics, tags and communications
- `AQUA-*`: customer aquariums, equipment, livestock and timelines
- `SERV-*`: calendar, recurrence, dispatch and service-cadence health
- `TECH-*`, `LOG-*`: technician execution and permanent service logs
- `EST-*`, `BILL-*`: estimates, invoices, payment states and reminders
- `LOY-*`, `MKT-*`: loyalty, segmentation, consent and outreach
- `RPT-*`: report filters, exports, saved views and delivery
- `MULTI-*`: location-specific operations and consolidated reporting
- `ROLE-*`: permissions, location access and audit requirements
- `PORTAL-*`, `ECOM-*`: post-MVP customer and commerce surfaces
- `ACC-*`: accounting summaries and exports
- `SEARCH-*`: permission-aware universal search

## MVP acceptance gates

A release is not considered an MVP until a test organization can complete all of the following end to end:

1. Create a company, location, roles and users.
2. Receive a merchandise purchase order and observe location stock increase.
3. Receive a livestock shipment, record DOA, allocate landed cost and assign animals to a tank.
4. Complete a mixed merchandise/livestock sale and identify the source livestock batch and tank.
5. Attach a sold animal to a customer aquarium.
6. Record a livestock mortality and see batch, supplier, tank and margin analytics update.
7. Schedule and complete recurring service using a technician-oriented mobile workflow.
8. Deduct service-consumed products from the correct inventory location.
9. Generate a permanent service log and invoice.
10. Identify a customer who exceeded contractual or observed service cadence.
11. View revenue, gross margin, inventory value, mortality cost and overdue service on the dashboard.
12. Export core business records and inspect an audit event for a sensitive action.

## Delivery phases

### Phase 1 — Operational foundation

Authentication, company/location tenancy, roles, products, livestock, store tanks, customers and basic dashboard.

### Phase 2 — Retail operations

POS, payments, receipts, refunds, movement ledger, purchase orders, receiving and store credit.

### Phase 3 — Service operations

Customer aquariums, recurrence, technician workflow, tests, checklists, service reports and invoicing.

### Phase 4 — Advanced analytics and retention

Mortality analytics, supplier scoring, service profitability, observed cadence, at-risk queues and saved reports.

### Phase 5 — Growth platform

Customer portal, e-commerce, expanded multi-location, marketing, accounting integrations and public API.

## Explicit non-goals for the first release

AI recommendations, autonomous purchasing, automated diagnosis, cryptocurrency payments, public livestock marketplaces, payroll, full accounting replacement and nationwide shipping-compliance automation are excluded from the initial release.
