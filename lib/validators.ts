import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8).regex(/[A-Z]/, "Password must contain an uppercase letter").regex(/[0-9]/, "Password must contain a number")
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  sku: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  price: z.coerce.number().positive(),
  comparePrice: z.coerce.number().positive().optional(),
  categoryId: z.string().min(1),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).default("ACTIVE"),
  featured: z.boolean().optional(),
  bestSeller: z.boolean().optional(),
  imageUrl: z.string().url().optional(),
  quantity: z.coerce.number().int().min(0).max(100000).optional(),
  reserved: z.coerce.number().int().min(0).max(100000).optional(),
  reorderPoint: z.coerce.number().int().min(0).max(100000).optional(),
  warehouse: z.string().min(2).optional()
});

export const categorySchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  image: z.string().url().optional()
});

export const cartSchema = z.object({
  productId: z.string().min(1),
  quantity: z.coerce.number().int().min(1).max(99).default(1)
});

export const checkoutSchema = z.object({
  provider: z.enum(["stripe", "paypal", "flutterwave", "paystack", "manual"]),
  couponCode: z.string().optional(),
  address: z.object({
    id: z.string().optional().default("addr_checkout"),
    userId: z.string().optional().default("usr_customer"),
    label: z.string().default("Shipping"),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    line1: z.string().min(3),
    line2: z.string().optional(),
    city: z.string().min(2),
    state: z.string().min(2),
    postalCode: z.string().min(2),
    country: z.string().min(2)
  })
});

export const orderStatusSchema = z.object({
  status: z.enum(["PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"])
});

export const reviewSchema = z.object({
  productId: z.string().min(1),
  rating: z.coerce.number().int().min(1).max(5),
  title: z.string().min(2),
  comment: z.string().min(5)
});
