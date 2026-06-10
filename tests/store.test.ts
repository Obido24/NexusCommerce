import { describe, expect, it } from "vitest";
import { addToCart, createOrder, deleteCategory, getCart, getCategoryProductCounts, getDashboardStats, listProducts, store, upsertCategory } from "@/lib/store";

describe("commerce store", () => {
  it("filters products by search query", () => {
    const results = listProducts({ query: "perfume" });
    expect(results.some((product) => product.slug === "midr-oud-bloom-perfume")).toBe(true);
  });

  it("adds products to cart and calculates totals", () => {
    addToCart("prd_oud_perfume", 2);
    const cart = getCart();
    expect(cart.items.some((item) => item.productId === "prd_oud_perfume")).toBe(true);
    expect(cart.total).toBeGreaterThan(cart.subtotal);
  });

  it("creates an order from the active cart", () => {
    addToCart("prd_ankara_dress", 1);
    const before = store.orders.length;
    const order = createOrder({
      provider: "stripe",
      address: {
        id: "addr_test",
        userId: "usr_customer",
        label: "Test",
        firstName: "Amara",
        lastName: "Cole",
        line1: "12 Admiralty Way",
        city: "Lekki",
        state: "Lagos",
        postalCode: "105102",
        country: "NG"
      }
    });
    expect(order.orderNumber).toMatch(/^MID-/);
    expect(store.orders.length).toBe(before + 1);
  });

  it("summarizes dashboard analytics", () => {
    const stats = getDashboardStats();
    expect(stats.totalProducts).toBeGreaterThan(0);
    expect(stats.totalRevenue).toBeGreaterThan(0);
  });

  it("creates and deletes unused categories", () => {
    const category = upsertCategory({
      name: `Test Category ${Date.now()}`,
      description: "Temporary category for admin testing."
    });
    expect(getCategoryProductCounts().some((item) => item.id === category.id && item.productCount === 0)).toBe(true);
    expect(deleteCategory(category.id)).toBe(true);
  });
});
