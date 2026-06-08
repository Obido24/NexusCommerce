import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const [customerRole, adminRole] = await Promise.all([
    prisma.role.upsert({ where: { name: "CUSTOMER" }, update: {}, create: { name: "CUSTOMER" } }),
    prisma.role.upsert({ where: { name: "ADMIN" }, update: {}, create: { name: "ADMIN" } })
  ]);

  const passwordHash = await bcrypt.hash("Password123!", 12);

  const [admin, customer] = await Promise.all([
    prisma.user.upsert({
      where: { email: "admin@nexuscommerce.dev" },
      update: {},
      create: { name: "Avery Admin", email: "admin@nexuscommerce.dev", passwordHash, roleId: adminRole.id }
    }),
    prisma.user.upsert({
      where: { email: "customer@nexuscommerce.dev" },
      update: {},
      create: { name: "Jordan Blake", email: "customer@nexuscommerce.dev", passwordHash, roleId: customerRole.id }
    })
  ]);

  const categories = await Promise.all(
    [
      ["Audio", "Premium sound for work and travel"],
      ["Wearables", "Connected devices for modern routines"],
      ["Computing", "Performance hardware for commerce teams"],
      ["Lifestyle", "Essential accessories with refined finishes"]
    ].map(([name, description]) =>
      prisma.category.upsert({
        where: { slug: name.toLowerCase() },
        update: {},
        create: { name, slug: name.toLowerCase(), description }
      })
    )
  );

  const products = [
    {
      name: "Nexus Pro Audio V2",
      slug: "nexus-pro-audio-v2",
      sku: "NX-AUD-200",
      price: "249.00",
      comparePrice: "299.00",
      categoryId: categories[0].id,
      featured: true,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjbkc9HSjnfHzKmpQ4Zspc3QJBCki7mwVqMvpfxiCXdz_Jb1qA7XFkvmECrBg2Weuag9kjk-pUz4PmvZeHN83438X73zZWVqnmQ-hxoGx5TaBDxAFBzW89xvJBMc0RpE5FnWeDylgOfGq20PckJu-afmwoHQiA3C6gOCarIhfVgwhmiBpwSMZErld29l7rhhD5v6ydFXO88dle0eq6LIFc-J-ZmRcRaXvSUPc_OR-OG7y5xhNUUD9yGCIRsgPuQCPq7SYK87-83g"
    },
    {
      name: "Nexus Ultra Pro Tablet",
      slug: "nexus-ultra-pro-tablet",
      sku: "NX-TAB-129",
      price: "899.00",
      comparePrice: "1049.00",
      categoryId: categories[2].id,
      featured: true,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBy3-nTKjY24sdK5a_aczN4UmzeVnI4rRDwia-OB8_hRIqjmhOCekhEUHM7vcQUdrRCAiCe-WiVemcWirBx8U9f8ivfa90JDJIhiXo99PDfhyeDzTSZkc29th1yxMWgo5XCIGpXSlEafSjRYcQl5bWaPEKSwD35xDD_nEj86WDIEFxqbBoux6KogSUCR9pX_qXbejQzwWvxZMBuwtW8XWvMN4y1zwkhQFyzfEfxAT8CVN85Scb_n-P-iz4uD9Te0s1XpM6_GNg6Jg"
    },
    {
      name: "Nexus Chronos Ultra",
      slug: "nexus-chronos-ultra",
      sku: "NX-WAT-500",
      price: "429.00",
      comparePrice: "479.00",
      categoryId: categories[1].id,
      featured: true,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  for (const item of products) {
    const product = await prisma.product.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        name: item.name,
        slug: item.slug,
        sku: item.sku,
        description: "A premium NexusCommerce product designed for high-velocity operations and polished customer experiences.",
        price: item.price,
        comparePrice: item.comparePrice,
        status: "ACTIVE",
        featured: item.featured,
        categoryId: item.categoryId,
        images: { create: [{ url: item.image, alt: item.name, position: 0 }] },
        inventory: { create: { quantity: 64, reserved: 4, reorderPoint: 12, warehouse: "Nexus East" } }
      }
    });

    await prisma.review.create({
      data: {
        productId: product.id,
        userId: customer.id,
        rating: 5,
        title: "Excellent quality",
        comment: "Fast shipping, clean packaging, and exactly the premium feel promised."
      }
    });
  }

  const address = await prisma.address.create({
    data: {
      label: "Home",
      firstName: "Jordan",
      lastName: "Blake",
      line1: "120 Market Street",
      city: "Austin",
      state: "TX",
      postalCode: "78701",
      country: "US",
      userId: customer.id
    }
  });

  const product = await prisma.product.findFirstOrThrow({ where: { slug: "nexus-ultra-pro-tablet" } });
  const order = await prisma.order.create({
    data: {
      orderNumber: "NX-10045",
      userId: customer.id,
      status: "PROCESSING",
      subtotal: "899.00",
      tax: "71.92",
      shipping: "18.00",
      total: "988.92",
      shippingAddressId: address.id,
      items: {
        create: [{ productId: product.id, quantity: 1, unitPrice: "899.00", total: "899.00" }]
      }
    }
  });

  await prisma.payment.create({
    data: {
      provider: "STRIPE",
      status: "PAID",
      amount: "988.92",
      reference: "pay_seed_10045",
      orderId: order.id
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
