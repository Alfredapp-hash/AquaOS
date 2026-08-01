import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const company = await prisma.company.upsert({
    where: { id: "demo-company" },
    update: {},
    create: { id: "demo-company", name: "Pacific Reef & Freshwater" },
  });

  const location = await prisma.location.upsert({
    where: { id: "demo-location" },
    update: {},
    create: { id: "demo-location", companyId: company.id, name: "Temecula Store" },
  });

  const role = await prisma.role.upsert({
    where: { id: "demo-owner-role" },
    update: {},
    create: { id: "demo-owner-role", companyId: company.id, name: "Owner", isSystem: true },
  });

  await prisma.user.upsert({
    where: { id: "demo-owner" },
    update: {},
    create: {
      id: "demo-owner",
      companyId: company.id,
      roleId: role.id,
      name: "Demo Owner",
      email: "owner@aquariumos.local",
      status: "ACTIVE",
      locations: { create: { locationId: location.id } },
    },
  });

  const supplier = await prisma.supplier.upsert({
    where: { id: "supplier-quality-marine" },
    update: {},
    create: { id: "supplier-quality-marine", companyId: company.id, name: "Quality Marine", leadTimeDays: 2 },
  });

  await prisma.purchaseOrder.upsert({
    where: { id: "po-demo-71" },
    update: {},
    create: {
      id: "po-demo-71",
      locationId: location.id,
      supplierId: supplier.id,
      orderNumber: "PO-2026-0071",
      status: "SUBMITTED",
      submittedAt: new Date(),
    },
  });

  await prisma.livestockSpecies.upsert({
    where: { id: "species-ocellaris" },
    update: {},
    create: {
      id: "species-ocellaris",
      commonName: "Ocellaris Clownfish",
      scientificName: "Amphiprion ocellaris",
      category: "Saltwater Fish",
    },
  });

  for (const tank of [
    { id: "tank-sw-q1", name: "SW-Q1", area: "Quarantine", gallons: 40 },
    { id: "tank-sw-q2", name: "SW-Q2", area: "Quarantine", gallons: 40 },
    { id: "tank-sw-12", name: "SW-12", area: "Sales Floor", gallons: 80 },
  ]) {
    await prisma.storeTank.upsert({
      where: { id: tank.id },
      update: {},
      create: {
        id: tank.id,
        locationId: location.id,
        name: tank.name,
        physicalArea: tank.area,
        volumeGallons: tank.gallons,
        waterType: "SALTWATER",
        systemType: tank.area === "Quarantine" ? "Quarantine" : "Sales",
      },
    });
  }
}

main()
  .then(() => console.log("AquariumOS seed complete"))
  .finally(async () => prisma.$disconnect());
