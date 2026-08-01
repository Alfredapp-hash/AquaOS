import { z } from "zod";

export const livestockReceivingSchema = z
  .object({
    supplierId: z.string().min(1, "Supplier is required"),
    purchaseOrderId: z.string().optional(),
    speciesId: z.string().min(1, "Species is required"),
    tankId: z.string().min(1, "Initial tank is required"),
    actorId: z.string().min(1, "Receiving employee is required"),
    shipmentReference: z.string().trim().max(80).optional(),
    quantityOrdered: z.coerce.number().int().nonnegative(),
    quantityShipped: z.coerce.number().int().nonnegative(),
    quantityReceived: z.coerce.number().int().positive(),
    quantityDoa: z.coerce.number().int().nonnegative(),
    unitPurchaseCost: z.coerce.number().nonnegative(),
    freightCost: z.coerce.number().nonnegative().default(0),
    packingCost: z.coerce.number().nonnegative().default(0),
    retailPrice: z.coerce.number().positive(),
    status: z.enum(["QUARANTINE", "NOT_FOR_SALE", "AVAILABLE"]),
    notes: z.string().trim().max(2000).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.quantityDoa > value.quantityReceived) {
      ctx.addIssue({ code: "custom", path: ["quantityDoa"], message: "DOA cannot exceed quantity received" });
    }
    if (value.quantityReceived > value.quantityShipped) {
      ctx.addIssue({ code: "custom", path: ["quantityReceived"], message: "Received quantity cannot exceed shipped quantity" });
    }
    if (value.quantityShipped > value.quantityOrdered) {
      ctx.addIssue({ code: "custom", path: ["quantityShipped"], message: "Shipped quantity cannot exceed ordered quantity" });
    }
  });

export type LivestockReceivingInput = z.infer<typeof livestockReceivingSchema>;

export function calculateReceiving(input: Pick<LivestockReceivingInput, "quantityReceived" | "quantityDoa" | "unitPurchaseCost" | "freightCost" | "packingCost">) {
  const livingQuantity = input.quantityReceived - input.quantityDoa;
  const purchaseCost = input.quantityReceived * input.unitPurchaseCost;
  const landedBatchCost = purchaseCost + input.freightCost + input.packingCost;
  const landedUnitCost = livingQuantity > 0 ? landedBatchCost / livingQuantity : 0;
  return { livingQuantity, purchaseCost, landedBatchCost, landedUnitCost };
}
