import { demoAddresses, demoCart, demoCategories, demoCoupons, demoOrders, demoProducts, demoUsers, demoWishlist } from "@/lib/mock-data";
import type { Address, CartItem, Coupon, DashboardStats, Order, OrderStatus, Product, ProductStatus, User } from "@/lib/types";

type StoreState = {
  users: User[];
  products: Product[];
  categories: typeof demoCategories;
  orders: Order[];
  carts: Record<string, CartItem[]>;
  wishlists: Record<string, string[]>;
  addresses: Address[];
  coupons: Coupon[];
};

const globalForStore = globalThis as unknown as { nexusStore?: StoreState };

export const store: StoreState =
  globalForStore.nexusStore ??
  (globalForStore.nexusStore = {
    users: structuredClone(demoUsers),
    products: structuredClone(demoProducts),
    categories: structuredClone(demoCategories),
    orders: structuredClone(demoOrders),
    carts: { usr_customer: structuredClone(demoCart) },
    wishlists: { usr_customer: structuredClone(demoWishlist) },
    addresses: structuredClone(demoAddresses),
    coupons: structuredClone(demoCoupons)
  });

export const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

export function listProducts(filters?: { query?: string; category?: string; status?: ProductStatus; sort?: string }) {
  let products = [...store.products];
  if (filters?.query) {
    const query = filters.query.toLowerCase();
    products = products.filter((product) => [product.name, product.description, product.category, product.sku].join(" ").toLowerCase().includes(query));
  }
  if (filters?.category && filters.category !== "all") {
    products = products.filter((product) => product.category.toLowerCase() === filters.category?.toLowerCase() || product.categoryId === filters.category);
  }
  if (filters?.status) {
    products = products.filter((product) => product.status === filters.status);
  }
  if (filters?.sort === "price-asc") products.sort((a, b) => a.price - b.price);
  if (filters?.sort === "price-desc") products.sort((a, b) => b.price - a.price);
  if (filters?.sort === "newest") products.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return products;
}

export const getProductBySlug = (slug: string) => store.products.find((product) => product.slug === slug);
export const getProductById = (id: string) => store.products.find((product) => product.id === id);

export function upsertProduct(input: Partial<Product> & { name: string; price: number; categoryId: string }) {
  const category = store.categories.find((item) => item.id === input.categoryId) ?? store.categories[0];
  if (input.id) {
    const index = store.products.findIndex((product) => product.id === input.id);
    if (index >= 0) {
      store.products[index] = {
        ...store.products[index],
        ...input,
        category: category.name,
        categoryId: category.id
      };
      return store.products[index];
    }
  }
  const id = `prd_${Date.now()}`;
  const product: Product = {
    id,
    name: input.name,
    slug: input.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    sku: input.sku ?? `NX-${Math.floor(Math.random() * 9000 + 1000)}`,
    description: input.description ?? "New Midr Store product.",
    price: input.price,
    comparePrice: input.comparePrice,
    categoryId: category.id,
    category: category.name,
    status: input.status ?? "ACTIVE",
    featured: Boolean(input.featured),
    bestSeller: Boolean(input.bestSeller),
    tags: input.tags ?? [],
    images: input.images?.length
      ? input.images
      : [{ id: `img_${id}`, url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80", alt: input.name, position: 0 }],
    inventory: input.inventory ?? {
      productId: id,
      quantity: 20,
      reserved: 0,
      reorderPoint: 8,
      warehouse: "Midr Lagos",
      lastRestockedAt: new Date().toISOString()
    },
    variants: input.variants ?? [],
    reviews: input.reviews ?? [],
    createdAt: new Date().toISOString()
  };
  store.products.unshift(product);
  return product;
}

export function deleteProduct(id: string) {
  const before = store.products.length;
  store.products = store.products.filter((product) => product.id !== id);
  return store.products.length < before;
}

export function getCart(userId = "usr_customer") {
  const items = store.carts[userId] ?? [];
  const enriched = items
    .map((item) => {
      const product = getProductById(item.productId);
      return product ? { ...item, product, total: product.price * item.quantity } : null;
    })
    .filter(Boolean) as Array<CartItem & { product: Product; total: number }>;
  const subtotal = enriched.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 350 || subtotal === 0 ? 0 : 18;
  return { items: enriched, subtotal, tax, shipping, discount: 0, total: subtotal + tax + shipping };
}

export function addToCart(productId: string, quantity = 1, userId = "usr_customer") {
  const cart = (store.carts[userId] ??= []);
  const existing = cart.find((item) => item.productId === productId);
  if (existing) existing.quantity += quantity;
  else cart.push({ productId, quantity });
  return getCart(userId);
}

export function updateCart(productId: string, quantity: number, userId = "usr_customer") {
  const cart = (store.carts[userId] ??= []);
  const existing = cart.find((item) => item.productId === productId);
  if (existing) existing.quantity = Math.max(1, quantity);
  return getCart(userId);
}

export function removeFromCart(productId: string, userId = "usr_customer") {
  store.carts[userId] = (store.carts[userId] ?? []).filter((item) => item.productId !== productId);
  return getCart(userId);
}

export function toggleWishlist(productId: string, userId = "usr_customer") {
  const wishlist = (store.wishlists[userId] ??= []);
  if (wishlist.includes(productId)) store.wishlists[userId] = wishlist.filter((id) => id !== productId);
  else wishlist.push(productId);
  return store.wishlists[userId];
}

export function getWishlistProducts(userId = "usr_customer") {
  return (store.wishlists[userId] ?? []).map(getProductById).filter(Boolean) as Product[];
}

export function createOrder(input: { userId?: string; address: Address; provider: string; couponCode?: string }) {
  const userId = input.userId ?? "usr_customer";
  const user = store.users.find((item) => item.id === userId) ?? store.users[1];
  const cart = getCart(userId);
  const couponCode = input.couponCode?.toUpperCase();
  const coupon = couponCode ? store.coupons.find((item) => item.code === couponCode && item.active) : undefined;
  const discount = coupon?.percentOff ? cart.subtotal * (coupon.percentOff / 100) : coupon?.amountOff ?? 0;
  const total = Math.max(0, cart.subtotal - discount + cart.tax + cart.shipping);
  const order: Order = {
    id: `ord_${Date.now()}`,
    orderNumber: `MID-${Math.floor(Math.random() * 90000 + 10000)}`,
    userId,
    customerName: user.name,
    customerEmail: user.email,
    status: "PAID",
    items: cart.items.map((item) => ({
      productId: item.productId,
      name: item.product.name,
      quantity: item.quantity,
      unitPrice: item.product.price,
      total: item.total
    })),
    subtotal: cart.subtotal,
    discount,
    tax: cart.tax,
    shipping: cart.shipping,
    total,
    paymentProvider: input.provider as Order["paymentProvider"],
    paymentStatus: "PAID",
    shippingAddress: input.address,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  store.orders.unshift(order);
  store.carts[userId] = [];
  return order;
}

export function updateOrderStatus(orderId: string, status: OrderStatus) {
  const order = store.orders.find((item) => item.id === orderId);
  if (!order) return null;
  order.status = status;
  order.updatedAt = new Date().toISOString();
  return order;
}

export function getDashboardStats(): DashboardStats {
  const paidOrders = store.orders.filter((order) => order.paymentStatus === "PAID");
  const productMap = new Map<string, { name: string; revenue: number; units: number }>();
  for (const order of paidOrders) {
    for (const item of order.items) {
      const current = productMap.get(item.productId) ?? { name: item.name, revenue: 0, units: 0 };
      current.revenue += item.total;
      current.units += item.quantity;
      productMap.set(item.productId, current);
    }
  }
  return {
    totalProducts: store.products.length,
    totalOrders: store.orders.length,
    totalCustomers: store.users.filter((user) => user.role === "CUSTOMER").length,
    totalRevenue: paidOrders.reduce((sum, order) => sum + order.total, 0),
    salesSeries: [
      { label: "Jan", sales: 10800, orders: 34 },
      { label: "Feb", sales: 12420, orders: 39 },
      { label: "Mar", sales: 15100, orders: 47 },
      { label: "Apr", sales: 13860, orders: 42 },
      { label: "May", sales: 18440, orders: 55 },
      { label: "Jun", sales: 22190, orders: 63 }
    ],
    productPerformance: [...productMap.values()].sort((a, b) => b.revenue - a.revenue)
  };
}
