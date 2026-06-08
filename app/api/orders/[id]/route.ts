import { type NextRequest } from "next/server";
import { handleApiError, jsonError, jsonOk, parseJson, rateLimit, requireRole } from "@/lib/api";
import { store, updateOrderStatus } from "@/lib/store";
import { orderStatusSchema } from "@/lib/validators";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = store.orders.find((item) => item.id === id);
  return order ? jsonOk({ order }) : jsonError("Order not found", 404);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    rateLimit(request, 60);
    await requireRole(request, ["ADMIN"]);
    const input = await parseJson(request, orderStatusSchema);
    const { id } = await params;
    const order = updateOrderStatus(id, input.status);
    return order ? jsonOk({ order }) : jsonError("Order not found", 404);
  } catch (error) {
    return handleApiError(error);
  }
}
