export type Role = "CUSTOMER" | "ADMIN";
export type ProductStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";
export type OrderStatus = "PENDING" | "PAID" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED";
export type PaymentProvider = "stripe" | "paypal" | "flutterwave" | "paystack" | "manual";

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  phone?: string;
  image?: string;
  disabled?: boolean;
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
};

export type Inventory = {
  productId: string;
  quantity: number;
  reserved: number;
  reorderPoint: number;
  warehouse: string;
  lastRestockedAt: string;
};

export type ProductImage = {
  id: string;
  url: string;
  alt: string;
  position: number;
};

export type Review = {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  price: number;
  comparePrice?: number;
  categoryId: string;
  category: string;
  status: ProductStatus;
  featured: boolean;
  bestSeller: boolean;
  tags: string[];
  images: ProductImage[];
  inventory: Inventory;
  variants: Array<{ id: string; name: string; value: string; sku: string; price: number }>;
  reviews: Review[];
  createdAt: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type Address = {
  id: string;
  userId: string;
  label: string;
  firstName: string;
  lastName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
};

export type Order = {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  paymentProvider: PaymentProvider;
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
};

export type Coupon = {
  id: string;
  code: string;
  description: string;
  percentOff?: number;
  amountOff?: number;
  active: boolean;
};

export type DashboardStats = {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  salesSeries: Array<{ label: string; sales: number; orders: number }>;
  productPerformance: Array<{ name: string; revenue: number; units: number }>;
};

export type AnalyticsReport = DashboardStats & {
  averageOrderValue: number;
  paidOrderRate: number;
  lowStockCount: number;
  inventoryValue: number;
  categoryRevenue: Array<{ category: string; revenue: number; units: number }>;
  paymentBreakdown: Array<{ provider: PaymentProvider; orders: number; revenue: number }>;
  orderStatusBreakdown: Array<{ status: OrderStatus; count: number; revenue: number }>;
  inventoryRisk: Array<{ productId: string; name: string; sku: string; available: number; reorderPoint: number; warehouse: string; risk: "LOW" | "STABLE" }>;
  funnel: Array<{ label: string; count: number; rate: number }>;
};
