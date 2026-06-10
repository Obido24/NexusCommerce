import { type NextRequest } from "next/server";
import { ApiError, handleApiError, jsonOk, parseJson, rateLimit, requireRole } from "@/lib/api";
import { deleteCategory, store, upsertCategory } from "@/lib/store";
import { categorySchema } from "@/lib/validators";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    rateLimit(request, 60);
    await requireRole(request, ["ADMIN"]);
    const { id } = await params;
    const existing = store.categories.find((category) => category.id === id);
    if (!existing) throw new ApiError("Category not found", 404);
    const input = await parseJson(request, categorySchema);
    let category;
    try {
      category = upsertCategory({ ...input, id });
    } catch (error) {
      throw new ApiError(error instanceof Error ? error.message : "Could not update category", 409);
    }
    return jsonOk({ category });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    rateLimit(request, 60);
    await requireRole(request, ["ADMIN"]);
    const { id } = await params;
    let deleted;
    try {
      deleted = deleteCategory(id);
    } catch (error) {
      throw new ApiError(error instanceof Error ? error.message : "Could not delete category", 409);
    }
    return jsonOk({ deleted });
  } catch (error) {
    return handleApiError(error);
  }
}
