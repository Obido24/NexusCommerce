import { Filter, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { listProducts, store } from "@/lib/store";

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string; sort?: string }> }) {
  const params = await searchParams;
  const products = listProducts({ query: params.q, category: params.category, sort: params.sort });

  return (
    <>
      <SiteHeader />
      <main className="page-shell py-10">
        <div className="flex flex-col gap-5 border-b border-outline-variant pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label">Product catalog</p>
            <h1 className="mt-2 text-4xl font-semibold">Shop Nexus products</h1>
            <p className="mt-3 max-w-2xl text-secondary">Search, filter, sort, add to cart, and complete checkout through connected API workflows.</p>
          </div>
          <form className="grid gap-3 sm:grid-cols-[1fr_180px_180px_auto]">
            <input name="q" defaultValue={params.q} placeholder="Search products" className="focus-ring h-10 rounded-md border border-outline-variant bg-white px-3 text-sm" />
            <Select name="category" defaultValue={params.category ?? "all"} aria-label="Category">
              <option value="all">All categories</option>
              {store.categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </Select>
            <Select name="sort" defaultValue={params.sort ?? "newest"} aria-label="Sort">
              <option value="newest">Newest</option>
              <option value="price-asc">Price low</option>
              <option value="price-desc">Price high</option>
            </Select>
            <Button type="submit">
              <Filter className="h-4 w-4" />
              Apply
            </Button>
          </form>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-secondary">{products.length} products</p>
          <Button variant="secondary" size="sm">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
