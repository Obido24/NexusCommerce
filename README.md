# Midr Store

Midr Store is a full-stack fashion e-commerce prototype for clothes, bags, perfume, checkout, customer accounts, and admin operations. It uses Next.js 15, React, TypeScript, Tailwind CSS, shadcn-style primitives, Prisma/PostgreSQL schema, JWT sessions, RBAC-protected admin APIs, and a payment abstraction layer.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Demo accounts:

- Admin: `admin@midr.store` / `Password123!`
- Customer: `customer@midr.store` / `Password123!`

For quick client testing, the login screen also includes **Enter Admin Demo Without Password**.

The app runs with realistic in-memory data by default so the complete workflow is available immediately: browse products, manage cart, checkout, view customer dashboard, log in as admin, create products, inspect inventory, update orders, and review analytics.

## Database

The production database contract is in `prisma/schema.prisma` and covers users, roles, products, categories, product images, variants, inventory, carts, wishlists, addresses, coupons, orders, order items, payments, and reviews.

Configure `.env` from `.env.example`, then run:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

## API Surface

Core REST routes live in `app/api`:

- `POST /api/auth/login`, `POST /api/auth/register`, `POST /api/auth/logout`, `POST /api/auth/reset`
- `GET|POST|DELETE /api/products`, `GET|PATCH|DELETE /api/products/:id`
- `GET|POST /api/categories`
- `GET|POST|PATCH|DELETE /api/cart`
- `GET|POST /api/wishlist`
- `GET|POST /api/orders`, `GET|PATCH /api/orders/:id`
- `GET /api/customers`
- `POST /api/reviews`
- `POST /api/payments/intent`
- `POST /api/uploads`
- `GET /api/analytics`

Validation uses Zod, passwords use bcryptjs, sessions use signed JWT cookies, admin APIs enforce role checks, and upload validation only accepts JPEG, PNG, or WEBP files up to 5MB.

## Payment and Uploads

`lib/payments.ts` defines the provider interface for Stripe, PayPal, Flutterwave, Paystack, and manual payments. Checkout stays in safe demo mode when payment credentials are empty.

To enable real Paystack hosted checkout, set these Vercel environment variables:

- `PAYSTACK_SECRET_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `PAYSTACK_CURRENCY` such as `NGN`
- `PAYSTACK_AMOUNT_MULTIPLIER` should usually stay `1` because Midr Store prices are stored and displayed in NGN. Adjust only if you intentionally need to transform totals before charging.

`lib/cloudinary.ts` validates uploads and returns a mock URL unless Cloudinary credentials are configured.

## Deployment

The app is Vercel-ready. Use Supabase or another PostgreSQL provider for `DATABASE_URL`, add `AUTH_SECRET`, configure payment/storage secrets, then deploy.
