"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { calculateReceiving, livestockReceivingSchema } from "@/lib/validation/livestock-receiving";

export type ReceivingActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  batchId?: string;
  fieldErrors?: Record<string, string[]>;
};

export const initialReceivingState: ReceivingActionState = { status: "idle" };

export async function receiveLivestockAction(
  _previousState: ReceivingActionState,
  formData: FormData,
): Promise<ReceivingActionState> {
  const parsed = livestockReceivingSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      status: "error",
      message: "Correct the highlighted receiving information.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const input = parsed.data;
  const totals = calculateReceiving(input);

  if (totals.livingQuantity <= 0) {
    return { status: "error", message: "A batch must contain at least one living animal." };
  }

  try {
    const batch = await prisma.$transaction(async (tx) => {
      const tank = await tx.storeTank.findUnique({ where: { id: input.tankId }, select: { locationId: true } });
      if (!tank) throw new Error("The selected tank no longer exists.");

      const shipment = await tx.shipment.create({
        data: {
          supplierId: input.supplierId,
          purchaseOrderId: input.purchaseOrderId || null,
          reference: input.shipmentReference || null,
          arrivalDate: new Date(),
          freightCost: input.freightCost,
          packingCost: input.packingCost,
        },
      });

      const createdBatch = await tx.livestockBatchItem.create({
        data: {
          shipmentId: shipment.id,
          speciesId: input.speciesId,
          currentTankId: input.tankId,
          quantityOrdered: input.quantityOrdered,
          quantityShipped: input.quantityShipped,
          quantityReceived: input.quantityReceived,
          quantityDoa: input.quantityDoa,
          quantityAvailable: input.status === "AVAILABLE" ? totals.livingQuantity : 0,
          unitPurchaseCost: input.unitPurchaseCost,
          allocatedFreight: input.freightCost + input.packingCost,
          landedUnitCost: totals.landedUnitCost,
          retailPrice: input.retailPrice,
          status: input.status,
          healthStatus: input.notes || null,
        },
      });

      if (input.quantityDoa > 0) {
        await tx.mortalityRecord.create({
          data: {
            livestockBatchId: createdBatch.id,
            tankId: input.tankId,
            recordedById: input.actorId,
            quantity: input.quantityDoa,
            cause: "Dead on arrival",
            occurredAt: new Date(),
            notes: input.notes || null,
            supplierCreditEligible: true,
          },
        });
      }

      await tx.auditEvent.create({
        data: {
          locationId: tank.locationId,
          actorId: input.actorId,
          action: "CREATE",
          entityType: "LivestockBatchItem",
          entityId: createdBatch.id,
          metadata: {
            shipmentId: shipment.id,
            quantityReceived: input.quantityReceived,
            quantityDoa: input.quantityDoa,
            livingQuantity: totals.livingQuantity,
            landedBatchCost: totals.landedBatchCost,
            landedUnitCost: totals.landedUnitCost,
            initialStatus: input.status,
          },
        },
      });

      if (input.purchaseOrderId) {
        await tx.purchaseOrder.update({
          where: { id: input.purchaseOrderId },
          data: { status: "PARTIALLY_RECEIVED" },
        });
      }

      return createdBatch;
    });

    revalidatePath("/");
    revalidatePath("/livestock");
    revalidatePath("/livestock/receive");

    return { status: "success", message: "Livestock batch received and assigned to its initial tank.", batchId: batch.id };
  } catch (error) {
    console.error("Livestock receiving failed", error);
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Receiving could not be completed.",
    };
  }
}
