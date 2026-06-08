import type { Address, CartItem, Category, Coupon, Order, Product, User } from "@/lib/types";

const now = new Date("2026-06-08T09:00:00.000Z").toISOString();

export const demoUsers: User[] = [
  {
    id: "usr_admin",
    name: "Avery Admin",
    email: "admin@nexuscommerce.dev",
    passwordHash: "$2a$12$V7zC0VuP7YH4ja8vMKLFXeJlf06SOuQFD82TnyBdNx4laD8Zt9V9K",
    role: "ADMIN",
    createdAt: now
  },
  {
    id: "usr_customer",
    name: "Jordan Blake",
    email: "customer@nexuscommerce.dev",
    passwordHash: "$2a$12$V7zC0VuP7YH4ja8vMKLFXeJlf06SOuQFD82TnyBdNx4laD8Zt9V9K",
    role: "CUSTOMER",
    phone: "+1 555 0148",
    createdAt: now
  }
];

export const demoCategories: Category[] = [
  {
    id: "cat_audio",
    name: "Audio",
    slug: "audio",
    description: "Noise-controlled sound systems for work, travel, and focus.",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "cat_wearables",
    name: "Wearables",
    slug: "wearables",
    description: "Connected devices with premium industrial design.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "cat_computing",
    name: "Computing",
    slug: "computing",
    description: "Performance tablets and laptops for modern teams.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "cat_lifestyle",
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Refined essentials for offices, travel, and everyday commerce.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80"
  }
];

export const demoProducts: Product[] = [
  {
    id: "prd_audio_v2",
    name: "Nexus Pro Audio V2",
    slug: "nexus-pro-audio-v2",
    sku: "NX-AUD-200",
    description:
      "Adaptive spatial audio, clean call pickup, and all-day battery life for buyers who move between office, showroom, and travel without missing a beat.",
    price: 249,
    comparePrice: 299,
    categoryId: "cat_audio",
    category: "Audio",
    status: "ACTIVE",
    featured: true,
    bestSeller: true,
    tags: ["wireless", "audio", "travel"],
    images: [
      {
        id: "img_audio_1",
        url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80",
        alt: "Premium wireless headphones on a blue-gray surface",
        position: 0
      }
    ],
    inventory: {
      productId: "prd_audio_v2",
      quantity: 128,
      reserved: 16,
      reorderPoint: 30,
      warehouse: "Nexus East",
      lastRestockedAt: "2026-06-02T10:00:00.000Z"
    },
    variants: [
      { id: "var_audio_black", name: "Color", value: "Graphite", sku: "NX-AUD-200-GPH", price: 249 },
      { id: "var_audio_blue", name: "Color", value: "Nexus Blue", sku: "NX-AUD-200-BLU", price: 259 }
    ],
    reviews: [
      {
        id: "rev_audio_1",
        productId: "prd_audio_v2",
        userId: "usr_customer",
        userName: "Jordan Blake",
        rating: 5,
        title: "Exactly as polished as promised",
        comment: "The finish is premium and the call quality is excellent for daily operations.",
        createdAt: "2026-05-24T10:00:00.000Z"
      }
    ],
    createdAt: now
  },
  {
    id: "prd_tablet_ultra",
    name: "Nexus Ultra Pro Tablet",
    slug: "nexus-ultra-pro-tablet",
    sku: "NX-TAB-129",
    description:
      "A productivity tablet with a 12.9-inch Liquid OLED display, M3 Enterprise chip, secure biometric unlock, and a bright color-accurate panel for catalog and inventory teams.",
    price: 899,
    comparePrice: 1049,
    categoryId: "cat_computing",
    category: "Computing",
    status: "ACTIVE",
    featured: true,
    bestSeller: true,
    tags: ["tablet", "enterprise", "productivity"],
    images: [
      {
        id: "img_tablet_1",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBy3-nTKjY24sdK5a_aczN4UmzeVnI4rRDwia-OB8_hRIqjmhOCekhEUHM7vcQUdrRCAiCe-WiVemcWirBx8U9f8ivfa90JDJIhiXo99PDfhyeDzTSZkc29th1yxMWgo5XCIGpXSlEafSjRYcQl5bWaPEKSwD35xDD_nEj86WDIEFxqbBoux6KogSUCR9pX_qXbejQzwWvxZMBuwtW8XWvMN4y1zwkhQFyzfEfxAT8CVN85Scb_n-P-iz4uD9Te0s1XpM6_GNg6Jg",
        alt: "Nexus Ultra Pro Tablet main view",
        position: 0
      },
      {
        id: "img_tablet_2",
        url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=80",
        alt: "Tablet angled on a minimal desk",
        position: 1
      }
    ],
    inventory: {
      productId: "prd_tablet_ultra",
      quantity: 48,
      reserved: 6,
      reorderPoint: 12,
      warehouse: "Nexus Central",
      lastRestockedAt: "2026-05-29T10:00:00.000Z"
    },
    variants: [
      { id: "var_tablet_256", name: "Storage", value: "256GB", sku: "NX-TAB-129-256", price: 899 },
      { id: "var_tablet_512", name: "Storage", value: "512GB", sku: "NX-TAB-129-512", price: 1049 }
    ],
    reviews: [
      {
        id: "rev_tablet_1",
        productId: "prd_tablet_ultra",
        userId: "usr_customer",
        userName: "Jordan Blake",
        rating: 5,
        title: "Powerful field device",
        comment: "Our merchandising team uses it for catalog updates and order checks with no slowdown.",
        createdAt: "2026-05-30T10:00:00.000Z"
      }
    ],
    createdAt: now
  },
  {
    id: "prd_watch_chronos",
    name: "Nexus Chronos Ultra",
    slug: "nexus-chronos-ultra",
    sku: "NX-WAT-500",
    description: "A durable connected watch with advanced health metrics, LTE, sapphire glass, and a low-profile titanium body.",
    price: 429,
    comparePrice: 479,
    categoryId: "cat_wearables",
    category: "Wearables",
    status: "ACTIVE",
    featured: true,
    bestSeller: true,
    tags: ["watch", "wearable", "lte"],
    images: [
      {
        id: "img_watch_1",
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
        alt: "Minimal smart watch product photography",
        position: 0
      }
    ],
    inventory: {
      productId: "prd_watch_chronos",
      quantity: 74,
      reserved: 12,
      reorderPoint: 20,
      warehouse: "Nexus East",
      lastRestockedAt: "2026-06-04T10:00:00.000Z"
    },
    variants: [
      { id: "var_watch_41", name: "Size", value: "41mm", sku: "NX-WAT-500-41", price: 429 },
      { id: "var_watch_45", name: "Size", value: "45mm", sku: "NX-WAT-500-45", price: 459 }
    ],
    reviews: [],
    createdAt: now
  },
  {
    id: "prd_laptop_core",
    name: "Nexus Core 14 Pro",
    slug: "nexus-core-14-pro",
    sku: "NX-LAP-140",
    description: "A lightweight laptop tuned for operators, analysts, and creative teams who need secure performance on the go.",
    price: 1299,
    comparePrice: 1399,
    categoryId: "cat_computing",
    category: "Computing",
    status: "ACTIVE",
    featured: false,
    bestSeller: false,
    tags: ["laptop", "business", "portable"],
    images: [
      {
        id: "img_laptop_1",
        url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80",
        alt: "Slim laptop on a desk",
        position: 0
      }
    ],
    inventory: {
      productId: "prd_laptop_core",
      quantity: 34,
      reserved: 8,
      reorderPoint: 10,
      warehouse: "Nexus West",
      lastRestockedAt: "2026-05-21T10:00:00.000Z"
    },
    variants: [],
    reviews: [],
    createdAt: now
  },
  {
    id: "prd_swift_run",
    name: "Nexus Swift Run 2.0",
    slug: "nexus-swift-run-2",
    sku: "NX-LIF-210",
    description: "Breathable everyday trainers with a tailored silhouette, engineered foam, and water-resistant textile finishing.",
    price: 138,
    categoryId: "cat_lifestyle",
    category: "Lifestyle",
    status: "ACTIVE",
    featured: false,
    bestSeller: true,
    tags: ["footwear", "travel"],
    images: [
      {
        id: "img_shoe_1",
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
        alt: "Modern running shoe product photography",
        position: 0
      }
    ],
    inventory: {
      productId: "prd_swift_run",
      quantity: 8,
      reserved: 2,
      reorderPoint: 18,
      warehouse: "Nexus East",
      lastRestockedAt: "2026-04-19T10:00:00.000Z"
    },
    variants: [],
    reviews: [],
    createdAt: now
  },
  {
    id: "prd_desk_dock",
    name: "Nexus Desk Dock",
    slug: "nexus-desk-dock",
    sku: "NX-ACC-080",
    description: "A compact aluminum USB-C dock with fast charging, dual-display output, and secure device passthrough.",
    price: 189,
    categoryId: "cat_lifestyle",
    category: "Lifestyle",
    status: "ACTIVE",
    featured: false,
    bestSeller: false,
    tags: ["accessory", "office"],
    images: [
      {
        id: "img_dock_1",
        url: "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=1200&q=80",
        alt: "Office technology dock on a clean desk",
        position: 0
      }
    ],
    inventory: {
      productId: "prd_desk_dock",
      quantity: 96,
      reserved: 11,
      reorderPoint: 24,
      warehouse: "Nexus Central",
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
    firstName: "Jordan",
    lastName: "Blake",
    line1: "120 Market Street",
    city: "Austin",
    state: "TX",
    postalCode: "78701",
    country: "US"
  }
];

export const demoOrders: Order[] = [
  {
    id: "ord_10045",
    orderNumber: "NX-10045",
    userId: "usr_customer",
    customerName: "Jordan Blake",
    customerEmail: "customer@nexuscommerce.dev",
    status: "PROCESSING",
    items: [{ productId: "prd_tablet_ultra", name: "Nexus Ultra Pro Tablet", quantity: 1, unitPrice: 899, total: 899 }],
    subtotal: 899,
    discount: 0,
    tax: 71.92,
    shipping: 18,
    total: 988.92,
    paymentProvider: "stripe",
    paymentStatus: "PAID",
    shippingAddress: demoAddresses[0],
    createdAt: "2026-06-03T11:30:00.000Z",
    updatedAt: "2026-06-04T08:12:00.000Z"
  },
  {
    id: "ord_10044",
    orderNumber: "NX-10044",
    userId: "usr_customer",
    customerName: "Jordan Blake",
    customerEmail: "customer@nexuscommerce.dev",
    status: "SHIPPED",
    items: [{ productId: "prd_audio_v2", name: "Nexus Pro Audio V2", quantity: 2, unitPrice: 249, total: 498 }],
    subtotal: 498,
    discount: 49.8,
    tax: 35.86,
    shipping: 0,
    total: 484.06,
    paymentProvider: "paystack",
    paymentStatus: "PAID",
    shippingAddress: demoAddresses[0],
    createdAt: "2026-05-29T14:15:00.000Z",
    updatedAt: "2026-05-30T09:00:00.000Z"
  }
];

export const demoCoupons: Coupon[] = [
  { id: "cpn_welcome", code: "WELCOME10", description: "10% off first order", percentOff: 10, active: true },
  { id: "cpn_ops", code: "OPS25", description: "$25 operations credit", amountOff: 25, active: true }
];

export const demoCart: CartItem[] = [
  { productId: "prd_audio_v2", quantity: 1 },
  { productId: "prd_desk_dock", quantity: 1 }
];

export const demoWishlist = ["prd_tablet_ultra", "prd_watch_chronos"];
