import type { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";

export const CART_SESSION_COOKIE_NAME = "midr_cart_id";

export type CartOwner = {
  userId: string;
  cookieValue?: string;
};

export async function getCartOwner(request: NextRequest): Promise<CartOwner> {
  const session = await getSessionFromRequest(request);
  if (session) return { userId: session.id };

  const existing = request.cookies.get(CART_SESSION_COOKIE_NAME)?.value;
  if (existing) return { userId: existing };

  const guestId = `guest_${crypto.randomUUID()}`;
  return { userId: guestId, cookieValue: guestId };
}

export function cartSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  };
}

export function attachCartSessionCookie<T extends NextResponse>(response: T, owner: CartOwner) {
  if (owner.cookieValue) {
    response.cookies.set(CART_SESSION_COOKIE_NAME, owner.cookieValue, cartSessionCookieOptions());
  }
  return response;
}
