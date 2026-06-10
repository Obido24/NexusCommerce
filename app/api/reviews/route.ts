import { type NextRequest } from "next/server";
import { handleApiError, jsonError, jsonOk, parseJson, rateLimit } from "@/lib/api";
import { store } from "@/lib/store";
import { reviewSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, 30);
    const input = await parseJson(request, reviewSchema);
    const product = store.products.find((item) => item.id === input.productId);
    if (!product) return jsonError("Product not found", 404);
    const review = {
      id: `rev_${Date.now()}`,
      productId: input.productId,
      userId: "usr_customer",
      userName: "Amara Cole",
      rating: input.rating,
      title: input.title,
      comment: input.comment,
      createdAt: new Date().toISOString()
    };
    product.reviews.unshift(review);
    return jsonOk({ review }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
