import { type NextRequest } from "next/server";
import { ApiError, handleApiError, jsonOk, parseJson, rateLimit, requireRole } from "@/lib/api";
import { getCategoryProductCounts, upsertCategory } from "@/lib/store";
import { categorySchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  try {
    rateLimit(request);
    return jsonOk({ categories: getCategoryProductCounts() });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, 60);
    await requireRole(request, ["ADMIN"]);
    const input = await parseJson(request, categorySchema);
    let category;
    try {
      category = upsertCategory(input);
    } catch (error) {
      throw new ApiError(error instanceof Error ? error.message : "Could not create category", 409);
    }
    return jsonOk({ category }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
