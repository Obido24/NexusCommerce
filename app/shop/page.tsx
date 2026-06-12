import Link from "next/link";
import { Filter, X } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { listProducts, store } from "@/lib/store";

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string; sort?: string }> }) {
  const params = await searchParams;
  const products = listProducts({ query: params.q, category: params.category, sort: params.sort });
  const hasFilters = Boolean(params.q || (params.category && params.category !== "all") || (params.sort && params.sort !== "newest"));

  return (
    <>
      <SiteHeader />
      <main className="page-shell py-7 sm:py-10">
        <div className="flex flex-col gap-5 border-b border-outline-variant pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label">Product catalog</p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Shop Midr fashion</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-secondary sm:text-base">Browse clothes, bags, perfume, and accessories with a simple demo checkout flow.</p>
          </div>
          <form className="grid grid-cols-[1fr_auto] gap-3 sm:grid-cols-[1fr_180px_180px_auto] md:min-w-[680px]">
            <input name="q" defaultValue={params.q} placeholder="Search products" className="focus-ring order-1 h-10 rounded-md border border-outline-variant bg-white px-3 text-sm" />
            <Select name="category" defaultValue={params.category ?? "all"} aria-label="Category" className="order-3 min-w-0 sm:order-2">
              <option value="all">All categories</option>
              {store.categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </Select>
            <Select name="sort" defaultValue={params.sort ?? "newest"} aria-label="Sort" className="order-4 min-w-0 sm:order-3">
              <option value="newest">Newest</option>
              <option value="price-asc">Price low</option>
              <option value="price-desc">Price high</option>
            </Select>
            <Button type="submit" className="order-2 sm:order-4">
              <Filter className="h-4 w-4" />
              Apply
            </Button>
          </form>
        </div>

        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 py-4 sm:mx-0 sm:px-0">
          <Link href="/shop" className={`focus-ring shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${!params.category || params.category === "all" ? "border-primary bg-blue-50 text-primary" : "border-outline-variant bg-white text-secondary"}`}>
            All
          </Link>
          {store.categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className={`focus-ring shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${params.category === category.slug ? "border-primary bg-blue-50 text-primary" : "border-outline-variant bg-white text-secondary"}`}
            >
              {category.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-secondary">{products.length} products</p>
          {hasFilters ? (
            <Button asChild variant="secondary" size="sm">
              <Link href="/shop">
                <X className="h-4 w-4" />
                Clear
              </Link>
            </Button>
          ) : null}
        </div>

        <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {[1, 2, 3].map((page) => (
            <Button key={page} variant={page === 1 ? "default" : "secondary"} size="sm">
              {page}
            </Button>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
