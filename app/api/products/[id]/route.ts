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
    const product = upsertProduct({ ...input, id });
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
