import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { CART_SESSION_COOKIE_NAME, getCartOwner } from "@/lib/cart-session";

function requestWithCookie(cookie?: string) {
  return new NextRequest("http://localhost/api/cart", {
    headers: cookie ? { cookie } : undefined
  });
}

describe("cart session ownership", () => {
  it("creates a guest cart owner when no auth or cart cookie exists", async () => {
    const owner = await getCartOwner(requestWithCookie());

    expect(owner.userId).toMatch(/^guest_/);
    expect(owner.cookieValue).toBe(owner.userId);
  });

  it("reuses an existing guest cart cookie", async () => {
    const owner = await getCartOwner(requestWithCookie(`${CART_SESSION_COOKIE_NAME}=guest_existing`));

    expect(owner.userId).toBe("guest_existing");
    expect(owner.cookieValue).toBeUndefined();
  });
});
