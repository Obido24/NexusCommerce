import { type NextRequest } from "next/server";
import { getWishlistProducts, toggleWishlist } from "@/lib/store";
import { handleApiError, jsonOk, rateLimit } from "@/lib/api";

export async function GET(request: NextRequest) {
  try {
    rateLimit(request);
    return jsonOk({ products: getWishlistProducts() });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, 80);
    const { productId } = (await request.json()) as { productId: string };
    return jsonOk({ productIds: toggleWishlist(productId) });
  } catch (error) {
    return handleApiError(error);
  }
}
