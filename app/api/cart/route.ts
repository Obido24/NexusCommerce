import { type NextRequest } from "next/server";
import { addToCart, getCart, removeFromCart, updateCart } from "@/lib/store";
import { cartSchema } from "@/lib/validators";
import { handleApiError, jsonOk, parseJson, rateLimit } from "@/lib/api";
import { attachCartSessionCookie, getCartOwner } from "@/lib/cart-session";

export async function GET(request: NextRequest) {
  try {
    rateLimit(request);
    const owner = await getCartOwner(request);
    return attachCartSessionCookie(jsonOk({ cart: getCart(owner.userId) }), owner);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, 80);
    const owner = await getCartOwner(request);
    const input = await parseJson(request, cartSchema);
    return attachCartSessionCookie(jsonOk({ cart: addToCart(input.productId, input.quantity ?? 1, owner.userId) }), owner);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    rateLimit(request, 80);
    const owner = await getCartOwner(request);
    const input = await parseJson(request, cartSchema);
    return attachCartSessionCookie(jsonOk({ cart: updateCart(input.productId, input.quantity ?? 1, owner.userId) }), owner);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    rateLimit(request, 80);
    const owner = await getCartOwner(request);
    const productId = request.nextUrl.searchParams.get("productId");
    return attachCartSessionCookie(jsonOk({ cart: productId ? removeFromCart(productId, owner.userId) : getCart(owner.userId) }), owner);
  } catch (error) {
    return handleApiError(error);
  }
}
