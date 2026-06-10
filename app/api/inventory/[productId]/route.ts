import { type NextRequest } from "next/server";
import { handleApiError, jsonError, jsonOk, parseJson, rateLimit, requireRole } from "@/lib/api";
import { adjustInventory } from "@/lib/store";
import { inventoryAdjustmentSchema } from "@/lib/validators";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ productId: string }> }) {
  try {
    rateLimit(request, 80);
    await requireRole(request, ["ADMIN"]);
    const { productId } = await params;
    const input = await parseJson(request, inventoryAdjustmentSchema);
    const inventory = adjustInventory(productId, { ...input, quantity: input.quantity ?? 0 });
    return inventory ? jsonOk({ inventory }) : jsonError("Product not found", 404);
  } catch (error) {
    return handleApiError(error);
  }
}
