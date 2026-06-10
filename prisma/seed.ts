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
      where: { email: "admin@midr.store" },
      update: {},
      create: { name: "Midr Admin", email: "admin@midr.store", passwordHash, roleId: adminRole.id }
    }),
    prisma.user.upsert({
      where: { email: "customer@midr.store" },
      update: {},
      create: { name: "Amara Cole", email: "customer@midr.store", passwordHash, phone: "+2348106464613", roleId: customerRole.id }
    })
  ]);

  const categories = await Promise.all(
    [
      ["Clothes", "Ready-to-wear outfits and occasion pieces"],
      ["Bags", "Structured totes, clutches, and everyday carry pieces"],
      ["Perfume", "Signature fragrances for daily wear and gifting"],
      ["Accessories", "Finishing touches for polished looks"]
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
      name: "Midr Ankara Wrap Dress",
      slug: "midr-ankara-wrap-dress",
      sku: "MID-CLS-101",
      price: "72.00",
      comparePrice: "95.00",
      categoryId: categories[0].id,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Midr Structured Leather Tote",
      slug: "midr-structured-leather-tote",
      sku: "MID-BAG-210",
      price: "118.00",
      comparePrice: "145.00",
      categoryId: categories[1].id,
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Midr Oud Bloom Perfume",
      slug: "midr-oud-bloom-perfume",
      sku: "MID-PRF-070",
      price: "54.00",
      comparePrice: "68.00",
      categoryId: categories[2].id,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80"
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
        description: "A premium Midr Store fashion item prepared for client demo testing.",
        price: item.price,
        comparePrice: item.comparePrice,
        status: "ACTIVE",
        featured: true,
        categoryId: item.categoryId,
        images: { create: [{ url: item.image, alt: item.name, position: 0 }] },
        inventory: { create: { quantity: 64, reserved: 4, reorderPoint: 12, warehouse: "Midr Lagos" } }
      }
    });

    await prisma.review.create({
      data: {
        productId: product.id,
        userId: customer.id,
        rating: 5,
        title: "Lovely quality",
        comment: "The item looks premium and the checkout experience is smooth."
      }
    });
  }

  const address = await prisma.address.create({
    data: {
      label: "Home",
      firstName: "Amara",
      lastName: "Cole",
      line1: "12 Admiralty Way",
      city: "Lekki",
      state: "Lagos",
      postalCode: "105102",
      country: "NG",
      userId: customer.id
    }
  });

  const product = await prisma.product.findFirstOrThrow({ where: { slug: "midr-structured-leather-tote" } });
  const order = await prisma.order.create({
    data: {
      orderNumber: "MID-10045",
      userId: customer.id,
      status: "PROCESSING",
      subtotal: "118.00",
      tax: "9.44",
      shipping: "18.00",
      total: "145.44",
      shippingAddressId: address.id,
      items: {
        create: [{ productId: product.id, quantity: 1, unitPrice: "118.00", total: "118.00" }]
      }
    }
  });

  await prisma.payment.create({
    data: {
      provider: "PAYSTACK",
      status: "PAID",
      amount: "145.44",
      reference: "pay_seed_10045",
      orderId: order.id
    }
  });

  console.log(`Seeded Midr Store demo with admin ${admin.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
