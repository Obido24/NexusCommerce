import { describe, expect, it } from "vitest";
import { getCartItemCount } from "@/lib/cart";

describe("cart helpers", () => {
  it("counts total cart quantity across all items", () => {
    expect(getCartItemCount([{ quantity: 1 }, { quantity: 2 }, { quantity: 3 }])).toBe(6);
  });

  it("falls back safely for empty or invalid cart items", () => {
    expect(getCartItemCount(undefined)).toBe(0);
    expect(getCartItemCount([{ quantity: 0 }, { quantity: -1 }, { quantity: Number.NaN }])).toBe(0);
  });
});
