import Link from "next/link";
import { ArrowRight, Headphones, Mail, MessageCircle, RefreshCw, ShieldCheck, ShoppingBag, Sparkles, Truck } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { listProducts, store } from "@/lib/store";

const trustBadges = [
  { title: "Secure Payments", description: "Safe checkout with live-ready payment protection.", icon: ShieldCheck },
  { title: "Fast Delivery", description: "Quick dispatch for clothes, bags, and perfumes.", icon: Truck },
  { title: "Easy Returns", description: "A smoother support path if an item is not right.", icon: RefreshCw },
  { title: "WhatsApp Support", description: "Chat with Midr Store before or after checkout.", icon: Headphones }
];

export default function HomePage() {
  const trending = listProducts().filter((product) => product.bestSeller || product.featured).slice(0, 4);

  return (
    <>
      <SiteHeader />
      <main className="pb-16 md:pb-0">
        <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-slate-950 md:min-h-[640px]">
          <img
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=2200&q=85"
            alt="Premium fashion model styled for Midr Store"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/68 to-slate-950/42 md:bg-gradient-to-r md:from-slate-950/95 md:via-slate-950/72 md:to-slate-950/10" />
          <div className="page-shell relative py-14 text-white sm:py-16 md:py-24">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-blue-100 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" />
                Clothes, bags, and perfumes
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Luxury Fashion, Delivered To Your Doorstep
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-100 sm:text-lg sm:leading-8">
                Shop premium clothes, stylish bags, and signature perfumes carefully selected for modern fashion lovers.
              </p>
              <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
                <Button asChild size="lg" className="h-12 px-8 text-base shadow-ambient">
                  <Link href="/shop">
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <a
                  href="https://wa.me/2348106464613"
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/25 bg-white/10 px-5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
                >
                  <MessageCircle className="h-4 w-4" />
                  Need Help?
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="categories" className="page-shell py-12 sm:py-14">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label">Shop by Category</p>
              <h2 className="mt-2 text-3xl font-semibold">Find your next signature piece</h2>
            </div>
            <Button asChild variant="secondary" className="w-fit">
              <Link href="/shop">View all categories</Link>
            </Button>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {store.categories.map((category) => (
              <Link key={category.id} href={`/shop?category=${category.slug}`} className="surface-card group overflow-hidden bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-ambient">
                <div className="h-44 overflow-hidden bg-surface-container sm:h-48">
                  <img src={category.image} alt={category.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-secondary">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="page-shell">
          <div className="overflow-hidden rounded-lg bg-primary text-white shadow-ambient">
            <div className="grid gap-5 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-blue-100">Flash sale</p>
                <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Weekend Sale — Up to 30% Off Selected Items</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-50">Refresh your wardrobe with curated fashion picks before the offer ends.</p>
              </div>
              <Button asChild className="bg-white text-primary hover:bg-blue-50">
                <Link href="/shop?sort=price-desc">Shop sale</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="new-arrivals" className="page-shell py-12 sm:py-14">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label">Trending Products</p>
              <h2 className="mt-2 text-3xl font-semibold">Loved by modern fashion shoppers</h2>
            </div>
            <Button asChild variant="secondary" className="w-fit">
              <Link href="/shop">Shop all</Link>
            </Button>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {trending.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="border-y border-outline-variant bg-white">
          <div className="page-shell grid gap-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div key={badge.title} className="surface-card bg-white p-5 shadow-sm">
                  <span className="grid h-11 w-11 place-items-center rounded-md bg-blue-50 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold">{badge.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-secondary">{badge.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="page-shell py-12 sm:py-14">
          <div className="surface-card flex flex-col gap-4 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
            <div>
              <p className="label">Newsletter</p>
              <h2 className="mt-1 text-2xl font-semibold">Get new drops and private offers.</h2>
            </div>
            <form className="flex w-full gap-2 md:max-w-md">
              <label className="sr-only" htmlFor="newsletter-email">
                Email
              </label>
              <input id="newsletter-email" type="email" placeholder="you@example.com" className="focus-ring h-11 min-w-0 flex-1 rounded-md border border-outline-variant px-3 text-sm" />
              <Button type="submit">
                <Mail className="h-4 w-4" />
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-outline-variant bg-white/95 px-3 py-2 shadow-ambient backdrop-blur md:hidden">
        <div className="grid grid-cols-[1.15fr_0.85fr] gap-2">
          <Link href="/shop" className="focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-3 text-sm font-bold text-white">
            <ShoppingBag className="h-4 w-4" />
            Shop Now
          </Link>
          <a href="https://wa.me/2348106464613" target="_blank" rel="noreferrer" className="focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#25D366] px-3 text-sm font-bold text-white">
            <MessageCircle className="h-4 w-4" />
            Help
          </a>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
