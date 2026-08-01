# AquaOS v0.1 Architecture

## Product slices

1. Owner dashboard and morning brief
2. Revenue and sales analytics
3. Merchandise inventory
4. Livestock inventory
5. Customers and aquarium profiles
6. Service scheduling and overdue-service alerts
7. Vendors, purchasing, and reorder workflows
8. Reporting and exports

## Application structure

- `app/` contains Next.js routes and layouts.
- `components/` will contain reusable dashboard, table, form, and navigation components.
- `lib/` will contain database access, calculations, permissions, validation, and formatting.
- `prisma/` owns the relational data model and migrations.

## Data principles

- Every business record is scoped to a store.
- Merchandise and livestock share a product ledger but are differentiated by inventory type.
- Inventory changes are recorded as movements rather than silently overwriting history.
- Sales preserve unit price and unit cost so historical margin remains accurate.
- Aquarium records store each customer’s normal service interval and last service date.
- Overdue service is calculated deterministically from those two fields; no AI is required.

## Dashboard calculations

- Revenue: sum of completed sales in the selected period.
- Gross profit: sale-item revenue minus recorded unit cost.
- Average ticket: revenue divided by transaction count.
- Inventory value: quantity on hand multiplied by unit cost.
- Low stock: quantity on hand at or below reorder point.
- Dead inventory: no recorded sale during the configured aging threshold.
- Overdue service: current date later than last service plus normal service interval.

## Recommended delivery sequence

### Milestone 1 — Foundation

Authentication, store tenancy, navigation shell, database, seed data, permission model.

### Milestone 2 — Analytics and sales

Dashboard metrics, date filtering, revenue charts, category analysis, owner brief.

### Milestone 3 — Inventory

Products, livestock, stock movements, receiving, reorder center, aging and velocity reports.

### Milestone 4 — CRM and service

Customers, aquarium profiles, calendar, recurring cadence, overdue-service work queue.

### Milestone 5 — Reporting and hardening

Exports, audit history, tests, accessibility, responsive technician views, deployment.
