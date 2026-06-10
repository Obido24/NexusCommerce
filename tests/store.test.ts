import { describe, expect, it } from "vitest";
import { addToCart, adjustInventory, createOrder, deleteCategory, getAnalyticsReport, getCart, getCategoryProductCounts, getCustomerProfile, getDashboardStats, getInventoryReport, listProducts, store, updateCustomerDisabled, updateOrderStatus, upsertCategory } from "@/lib/store";

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

  it("updates order status for admin fulfillment", () => {
    const order = store.orders[0];
    const updated = updateOrderStatus(order.id, "SHIPPED");
    expect(updated?.status).toBe("SHIPPED");
  });

  it("updates customer account status", () => {
    const customer = store.users.find((user) => user.role === "CUSTOMER")!;
    expect(getCustomerProfile(customer.id)?.user.email).toBe(customer.email);
    expect(updateCustomerDisabled(customer.id, true)?.disabled).toBe(true);
    expect(updateCustomerDisabled(customer.id, false)?.disabled).toBe(false);
  });

  it("adjusts inventory for admin stock control", () => {
    const product = store.products[0];
    const before = product.inventory.quantity;
    const inventory = adjustInventory(product.id, { action: "RESTOCK", quantity: 5 });
    expect(inventory?.quantity).toBe(before + 5);
    expect(getInventoryReport().some((item) => item.product.id === product.id)).toBe(true);
  });

  it("builds an analytics report for admin dashboards", () => {
    const report = getAnalyticsReport();
    expect(report.averageOrderValue).toBeGreaterThan(0);
    expect(report.categoryRevenue.length).toBeGreaterThan(0);
    expect(report.paymentBreakdown.length).toBeGreaterThan(0);
    expect(report.funnel[0].label).toBe("Visitors");
  });
});
