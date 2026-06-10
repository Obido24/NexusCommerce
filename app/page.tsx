import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail, MessageCircle, ShoppingBag } from "lucide-react";
import { DemoLoginButtons } from "@/components/demo-login-buttons";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { WhatsAppSupport } from "@/components/whatsapp-support";
import { listProducts, store } from "@/lib/store";

export default function HomePage() {
  const featured = listProducts().filter((product) => product.featured).slice(0, 4);
  const bestSellers = listProducts().filter((product) => product.bestSeller).slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main className="pb-20 md:pb-0">
        <div className="border-b border-blue-200 bg-blue-50">
          <div className="page-shell flex flex-col gap-2 py-2.5 text-sm text-primary md:flex-row md:items-center md:justify-between">
            <p className="font-semibold leading-5">Demo mode: safe for client testing. Payments are not real.</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <Link href="/shop" className="font-bold underline-offset-4 hover:underline">
                Shop
              </Link>
              <Link href="/login" className="font-bold underline-offset-4 hover:underline">
                Demo Login
              </Link>
              <Link href="/demo" className="font-bold underline-offset-4 hover:underline">
                How to Test
              </Link>
            </div>
          </div>
        </div>
        <section className="relative flex min-h-[calc(100svh-7.5rem)] items-start overflow-hidden bg-slate-950 md:min-h-[560px] md:items-center">
          <img
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=2200&q=80"
            alt="Fashion model wearing a refined outfit for Midr Store"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-950/70 to-slate-950/20 md:bg-gradient-to-r md:from-slate-950 md:via-slate-950/70 md:to-transparent" />
          <div className="page-shell relative py-12 text-white sm:py-16 md:py-20">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-200 sm:text-sm">Clothes, bags, and perfume</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight sm:mt-4 sm:text-5xl lg:text-6xl">
              Midr Store brings polished fashion shopping online.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 sm:mt-5 sm:text-lg sm:leading-8">
              Shop clothes, bags, and signature perfumes in a smooth demo with cart, checkout, customer account, and admin dashboard.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <Button asChild size="lg" className="h-12 justify-center">
                <Link href="/shop">
                  Browse Store
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <WhatsAppSupport label="WhatsApp Support" />
              <Button asChild size="lg" variant="secondary" className="col-span-2 h-12 justify-center sm:col-span-1">
                <Link href="/demo">How to Test This Demo</Link>
              </Button>
            </div>
            <div className="mt-4">
              <DemoLoginButtons />
            </div>
          </div>
        </section>

        <section className="page-shell py-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="label">Featured products</p>
              <h2 className="mt-2 text-3xl font-semibold">New styles for your next outing</h2>
            </div>
            <Button asChild variant="secondary">
              <Link href="/shop">View all</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="border-y border-outline-variant bg-surface-container-low">
          <div className="page-shell grid gap-6 py-14 md:grid-cols-4">
            {store.categories.map((category) => (
              <Link key={category.id} href={`/shop?category=${category.slug}`} className="surface-card overflow-hidden transition hover:shadow-ambient">
                <div className="aspect-[5/3] overflow-hidden bg-surface-container">
                  <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-secondary">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="page-shell grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-lg bg-primary p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-blue-100">Promotional offer</p>
            <h2 className="mt-3 text-3xl font-semibold">First order offer: save 10% with WELCOME10.</h2>
            <p className="mt-4 max-w-xl text-blue-50">Try the demo checkout with a dress, bag, or perfume and see how customers move from product discovery to order confirmation.</p>
            <Button asChild className="mt-6 bg-white text-primary hover:bg-blue-50">
              <Link href="/shop">Build bundle</Link>
            </Button>
          </div>
          <div>
            <p className="label">Best sellers</p>
            <div className="mt-4 space-y-3">
              {bestSellers.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`} className="surface-card flex items-center gap-4 p-3 transition hover:shadow-ambient">
                  <img src={product.images[0].url} alt={product.images[0].alt} className="h-20 w-20 rounded-md object-cover" />
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-secondary">{product.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 text-white">
          <div className="page-shell grid gap-8 py-14 md:grid-cols-3">
            {["Verified checkout", "Inventory-aware cart", "Admin-ready analytics"].map((item) => (
              <div key={item} className="flex gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 text-blue-300" />
                <div>
                  <h3 className="font-semibold">{item}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-300">Designed to help testers understand the shopping, checkout, and admin workflow quickly.</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="page-shell py-14">
          <div className="surface-card flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="label">Newsletter</p>
              <h2 className="mt-1 text-2xl font-semibold">Get launch drops and operations insights.</h2>
            </div>
            <form className="flex w-full gap-2 md:max-w-md">
              <label className="sr-only" htmlFor="newsletter-email">
                Email
              </label>
              <input id="newsletter-email" type="email" placeholder="you@example.com" className="focus-ring h-11 flex-1 rounded-md border border-outline-variant px-3 text-sm" />
              <Button type="submit">
                <Mail className="h-4 w-4" />
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-outline-variant bg-white/95 px-4 py-3 shadow-ambient backdrop-blur md:hidden">
        <div className="grid grid-cols-2 gap-3">
          <Link href="/shop" className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-3 text-sm font-bold text-white">
            <ShoppingBag className="h-4 w-4" />
            Shop
          </Link>
          <a href="https://wa.me/2348106464613" target="_blank" rel="noreferrer" className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#25D366] px-3 text-sm font-bold text-white">
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
