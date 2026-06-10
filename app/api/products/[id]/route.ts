import { type NextRequest } from "next/server";
import { handleApiError, jsonError, jsonOk, parseJson, rateLimit, requireRole } from "@/lib/api";
import { deleteProduct, getProductById, upsertProduct } from "@/lib/store";
import { productSchema } from "@/lib/validators";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  return product ? jsonOk({ product }) : jsonError("Product not found", 404);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    rateLimit(request, 60);
    await requireRole(request, ["ADMIN"]);
    const { id } = await params;
    const input = await parseJson(request, productSchema.partial().extend({ name: productSchema.shape.name, price: productSchema.shape.price, categoryId: productSchema.shape.categoryId }));
    const product = upsertProduct({
      ...input,
      id,
      inventory:
        input.quantity !== undefined || input.reserved !== undefined || input.reorderPoint !== undefined || input.warehouse
          ? {
              productId: id,
              quantity: input.quantity ?? 20,
              reserved: input.reserved ?? 0,
              reorderPoint: input.reorderPoint ?? 8,
              warehouse: input.warehouse ?? "Midr Lagos",
              lastRestockedAt: new Date().toISOString()
            }
          : undefined
    });
    return jsonOk({ product });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    rateLimit(request, 60);
    await requireRole(request, ["ADMIN"]);
    const { id } = await params;
    return jsonOk({ deleted: deleteProduct(id) });
  } catch (error) {
    return handleApiError(error);
  }
}
