import { type NextRequest } from "next/server";
import { addToCart, getCart, removeFromCart, updateCart } from "@/lib/store";
import { cartSchema } from "@/lib/validators";
import { handleApiError, jsonOk, parseJson, rateLimit } from "@/lib/api";

export async function GET(request: NextRequest) {
  try {
    rateLimit(request);
    return jsonOk({ cart: getCart() });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, 80);
    const input = await parseJson(request, cartSchema);
    return jsonOk({ cart: addToCart(input.productId, input.quantity ?? 1) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    rateLimit(request, 80);
    const input = await parseJson(request, cartSchema);
    return jsonOk({ cart: updateCart(input.productId, input.quantity ?? 1) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    rateLimit(request, 80);
    const productId = request.nextUrl.searchParams.get("productId");
    return jsonOk({ cart: productId ? removeFromCart(productId) : getCart() });
  } catch (error) {
    return handleApiError(error);
  }
}
