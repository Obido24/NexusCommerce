import type { Address, CartItem, Category, Coupon, Order, Product, User } from "@/lib/types";

const now = new Date("2026-06-08T09:00:00.000Z").toISOString();

export const demoUsers: User[] = [
  {
    id: "usr_admin",
    name: "Midr Admin",
    email: "admin@midr.store",
    passwordHash: "$2a$12$V7zC0VuP7YH4ja8vMKLFXeJlf06SOuQFD82TnyBdNx4laD8Zt9V9K",
    role: "ADMIN",
    createdAt: now
  },
  {
    id: "usr_customer",
    name: "Amara Cole",
    email: "customer@midr.store",
    passwordHash: "$2a$12$V7zC0VuP7YH4ja8vMKLFXeJlf06SOuQFD82TnyBdNx4laD8Zt9V9K",
    role: "CUSTOMER",
    phone: "+234 810 646 4613",
    createdAt: now
  }
];

export const demoCategories: Category[] = [
  {
    id: "cat_clothes",
    name: "Clothes",
    slug: "clothes",
    description: "Everyday fits, occasion wear, and refined ready-to-wear pieces.",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "cat_bags",
    name: "Bags",
    slug: "bags",
    description: "Structured totes, crossbody bags, and statement carry pieces.",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "cat_perfume",
    name: "Perfume",
    slug: "perfume",
    description: "Signature fragrances for daily wear, gifting, and special events.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "cat_accessories",
    name: "Accessories",
    slug: "accessories",
    description: "Scarves, small leather goods, and finishing touches.",
    image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?auto=format&fit=crop&w=1200&q=80"
  }
];

export const demoProducts: Product[] = [
  {
    id: "prd_ankara_dress",
    name: "Midr Ankara Wrap Dress",
    slug: "midr-ankara-wrap-dress",
    sku: "MID-CLS-101",
    description:
      "A polished wrap dress with a flattering waist tie, soft lining, and bold Ankara-inspired print for brunch, work events, and weekend outings.",
    price: 72,
    comparePrice: 95,
    categoryId: "cat_clothes",
    category: "Clothes",
    status: "ACTIVE",
    featured: true,
    bestSeller: true,
    tags: ["dress", "ankara", "occasion"],
    images: [
      {
        id: "img_dress_1",
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
        alt: "Stylish fashion model wearing a patterned dress",
        position: 0
      }
    ],
    inventory: {
      productId: "prd_ankara_dress",
      quantity: 64,
      reserved: 8,
      reorderPoint: 14,
      warehouse: "Midr Lagos",
      lastRestockedAt: "2026-06-02T10:00:00.000Z"
    },
    variants: [
      { id: "var_dress_s", name: "Size", value: "Small", sku: "MID-CLS-101-S", price: 72 },
      { id: "var_dress_m", name: "Size", value: "Medium", sku: "MID-CLS-101-M", price: 72 }
    ],
    reviews: [
      {
        id: "rev_dress_1",
        productId: "prd_ankara_dress",
        userId: "usr_customer",
        userName: "Amara Cole",
        rating: 5,
        title: "Beautiful fit",
        comment: "The material feels premium and the shape is very flattering.",
        createdAt: "2026-05-24T10:00:00.000Z"
      }
    ],
    createdAt: now
  },
  {
    id: "prd_leather_tote",
    name: "Midr Structured Leather Tote",
    slug: "midr-structured-leather-tote",
    sku: "MID-BAG-210",
    description:
      "A roomy structured tote with a smooth finish, reinforced handles, and a laptop-friendly interior for workdays and travel.",
    price: 118,
    comparePrice: 145,
    categoryId: "cat_bags",
    category: "Bags",
    status: "ACTIVE",
    featured: true,
    bestSeller: true,
    tags: ["bag", "tote", "work"],
    images: [
      {
        id: "img_tote_1",
        url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80",
        alt: "Brown leather handbag on a clean background",
        position: 0
      },
      {
        id: "img_tote_2",
        url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80",
        alt: "Fashion handbag with structured silhouette",
        position: 1
      }
    ],
    inventory: {
      productId: "prd_leather_tote",
      quantity: 38,
      reserved: 5,
      reorderPoint: 10,
      warehouse: "Midr Lagos",
      lastRestockedAt: "2026-05-29T10:00:00.000Z"
    },
    variants: [
      { id: "var_tote_black", name: "Color", value: "Black", sku: "MID-BAG-210-BLK", price: 118 },
      { id: "var_tote_tan", name: "Color", value: "Tan", sku: "MID-BAG-210-TAN", price: 118 }
    ],
    reviews: [
      {
        id: "rev_tote_1",
        productId: "prd_leather_tote",
        userId: "usr_customer",
        userName: "Amara Cole",
        rating: 5,
        title: "Looks expensive",
        comment: "It is sturdy, elegant, and fits my laptop perfectly.",
        createdAt: "2026-05-30T10:00:00.000Z"
      }
    ],
    createdAt: now
  },
  {
    id: "prd_oud_perfume",
    name: "Midr Oud Bloom Perfume",
    slug: "midr-oud-bloom-perfume",
    sku: "MID-PRF-070",
    description: "A warm oud fragrance softened with rose, amber, and vanilla. Made for evening wear and memorable gifting.",
    price: 54,
    comparePrice: 68,
    categoryId: "cat_perfume",
    category: "Perfume",
    status: "ACTIVE",
    featured: true,
    bestSeller: true,
    tags: ["perfume", "oud", "gift"],
    images: [
      {
        id: "img_perfume_1",
        url: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80",
        alt: "Luxury perfume bottle on a soft neutral background",
        position: 0
      }
    ],
    inventory: {
      productId: "prd_oud_perfume",
      quantity: 82,
      reserved: 14,
      reorderPoint: 20,
      warehouse: "Midr Abuja",
      lastRestockedAt: "2026-06-04T10:00:00.000Z"
    },
    variants: [
      { id: "var_perfume_50", name: "Size", value: "50ml", sku: "MID-PRF-070-50", price: 54 },
      { id: "var_perfume_100", name: "Size", value: "100ml", sku: "MID-PRF-070-100", price: 88 }
    ],
    reviews: [],
    createdAt: now
  },
  {
    id: "prd_linen_set",
    name: "Midr Linen Co-ord Set",
    slug: "midr-linen-coord-set",
    sku: "MID-CLS-144",
    description: "A breathable two-piece linen set with a relaxed fit, clean tailoring, and easy day-to-night styling.",
    price: 86,
    comparePrice: 105,
    categoryId: "cat_clothes",
    category: "Clothes",
    status: "ACTIVE",
    featured: false,
    bestSeller: false,
    tags: ["linen", "set", "casual"],
    images: [
      {
        id: "img_linen_1",
        url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80",
        alt: "Elegant casual fashion outfit in a studio setting",
        position: 0
      }
    ],
    inventory: {
      productId: "prd_linen_set",
      quantity: 29,
      reserved: 4,
      reorderPoint: 9,
      warehouse: "Midr Lagos",
      lastRestockedAt: "2026-05-21T10:00:00.000Z"
    },
    variants: [],
    reviews: [],
    createdAt: now
  },
  {
    id: "prd_evening_clutch",
    name: "Midr Satin Evening Clutch",
    slug: "midr-satin-evening-clutch",
    sku: "MID-BAG-330",
    description: "A compact satin clutch with a soft sheen, magnetic closure, and detachable chain for dinner dates and events.",
    price: 42,
    categoryId: "cat_bags",
    category: "Bags",
    status: "ACTIVE",
    featured: false,
    bestSeller: true,
    tags: ["clutch", "event", "bag"],
    images: [
      {
        id: "img_clutch_1",
        url: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1200&q=80",
        alt: "Small elegant handbag on a display surface",
        position: 0
      }
    ],
    inventory: {
      productId: "prd_evening_clutch",
      quantity: 12,
      reserved: 3,
      reorderPoint: 16,
      warehouse: "Midr Lagos",
      lastRestockedAt: "2026-04-19T10:00:00.000Z"
    },
    variants: [],
    reviews: [],
    createdAt: now
  },
  {
    id: "prd_fresh_mist",
    name: "Midr Fresh Mist Perfume",
    slug: "midr-fresh-mist-perfume",
    sku: "MID-PRF-040",
    description: "A fresh daytime scent with citrus, clean musk, and jasmine for everyday wear.",
    price: 38,
    categoryId: "cat_perfume",
    category: "Perfume",
    status: "ACTIVE",
    featured: false,
    bestSeller: false,
    tags: ["perfume", "fresh", "daily"],
    images: [
      {
        id: "img_mist_1",
        url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=80",
        alt: "Perfume bottle with clean minimal styling",
        position: 0
      }
    ],
    inventory: {
      productId: "prd_fresh_mist",
      quantity: 95,
      reserved: 9,
      reorderPoint: 24,
      warehouse: "Midr Abuja",
      lastRestockedAt: "2026-06-03T10:00:00.000Z"
    },
    variants: [],
    reviews: [],
    createdAt: now
  }
];

export const demoAddresses: Address[] = [
  {
    id: "addr_home",
    userId: "usr_customer",
    label: "Home",
    firstName: "Amara",
    lastName: "Cole",
    line1: "12 Admiralty Way",
    city: "Lekki",
    state: "Lagos",
    postalCode: "105102",
    country: "NG"
  }
];

export const demoOrders: Order[] = [
  {
    id: "ord_10045",
    orderNumber: "MID-10045",
    userId: "usr_customer",
    customerName: "Amara Cole",
    customerEmail: "customer@midr.store",
    status: "PROCESSING",
    items: [{ productId: "prd_leather_tote", name: "Midr Structured Leather Tote", quantity: 1, unitPrice: 118, total: 118 }],
    subtotal: 118,
    discount: 0,
    tax: 9.44,
    shipping: 18,
    total: 145.44,
    paymentProvider: "paystack",
    paymentStatus: "PAID",
    shippingAddress: demoAddresses[0],
    createdAt: "2026-06-03T11:30:00.000Z",
    updatedAt: "2026-06-04T08:12:00.000Z"
  },
  {
    id: "ord_10044",
    orderNumber: "MID-10044",
    userId: "usr_customer",
    customerName: "Amara Cole",
    customerEmail: "customer@midr.store",
    status: "SHIPPED",
    items: [{ productId: "prd_oud_perfume", name: "Midr Oud Bloom Perfume", quantity: 2, unitPrice: 54, total: 108 }],
    subtotal: 108,
    discount: 10.8,
    tax: 7.78,
    shipping: 0,
    total: 104.98,
    paymentProvider: "paystack",
    paymentStatus: "PAID",
    shippingAddress: demoAddresses[0],
    createdAt: "2026-05-29T14:15:00.000Z",
    updatedAt: "2026-05-30T09:00:00.000Z"
  }
];

export const demoCoupons: Coupon[] = [
  { id: "cpn_welcome", code: "WELCOME10", description: "10% off first order", percentOff: 10, active: true },
  { id: "cpn_midr", code: "MIDR25", description: "$25 Midr shopping credit", amountOff: 25, active: true }
];

export const demoCart: CartItem[] = [
  { productId: "prd_ankara_dress", quantity: 1 },
  { productId: "prd_fresh_mist", quantity: 1 }
];

export const demoWishlist = ["prd_leather_tote", "prd_oud_perfume"];
