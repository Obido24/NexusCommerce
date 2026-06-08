import { describe, expect, it } from "vitest";
import { addToCart, createOrder, getCart, getDashboardStats, listProducts, store } from "@/lib/store";

describe("commerce store", () => {
  it("filters products by search query", () => {
    const results = listProducts({ query: "tablet" });
    expect(results.some((product) => product.slug === "nexus-ultra-pro-tablet")).toBe(true);
  });

  it("adds products to cart and calculates totals", () => {
    addToCart("prd_watch_chronos", 2);
    const cart = getCart();
    expect(cart.items.some((item) => item.productId === "prd_watch_chronos")).toBe(true);
    expect(cart.total).toBeGreaterThan(cart.subtotal);
  });

  it("creates an order from the active cart", () => {
    addToCart("prd_audio_v2", 1);
    const before = store.orders.length;
    const order = createOrder({
      provider: "stripe",
      address: {
        id: "addr_test",
        userId: "usr_customer",
        label: "Test",
        firstName: "Taylor",
        lastName: "Morgan",
        line1: "42 Commerce Ave",
        city: "Austin",
        state: "TX",
        postalCode: "78701",
        country: "US"
      }
    });
    expect(order.orderNumber).toMatch(/^NX-/);
    expect(store.orders.length).toBe(before + 1);
  });

  it("summarizes dashboard analytics", () => {
    const stats = getDashboardStats();
    expect(stats.totalProducts).toBeGreaterThan(0);
    expect(stats.totalRevenue).toBeGreaterThan(0);
  });
});
