import { notFound } from "next/navigation";
import { ShieldCheck, Star, Truck } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { ProductPurchasePanel } from "@/components/product-purchase-panel";
import { ReviewForm } from "@/components/review-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { getProductBySlug, listProducts, money } from "@/lib/store";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = listProducts({ category: product.category }).filter((item) => item.id !== product.id).slice(0, 4);

  return (
    <>
      <SiteHeader />
      <main className="page-shell py-10">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="grid gap-4 md:grid-cols-[96px_1fr]">
            <div className="order-2 flex gap-3 md:order-1 md:flex-col">
              {product.images.map((image) => (
                <img key={image.id} src={image.url} alt={image.alt} className="aspect-square w-24 rounded-lg border border-outline-variant object-cover" />
              ))}
            </div>
            <div className="order-1 overflow-hidden rounded-lg border border-outline-variant bg-surface-container md:order-2">
              <img src={product.images[0].url} alt={product.images[0].alt} className="aspect-[4/3] h-full w-full object-cover" />
            </div>
          </div>

          <section>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="info">{product.category}</Badge>
              <Badge tone={product.inventory.quantity > product.inventory.reorderPoint ? "success" : "warning"}>
                {product.inventory.quantity > product.inventory.reorderPoint ? "In stock" : "Low stock"}
              </Badge>
            </div>
            <h1 className="mt-4 text-4xl font-semibold">{product.name}</h1>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex text-warning">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star key={item} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-secondary">{product.reviews.length || 1} reviews</span>
            </div>
            <div className="mt-5 flex items-end gap-3">
              <span className="font-label text-4xl font-bold">{money(product.price)}</span>
              {product.comparePrice ? <span className="pb-1 text-lg text-secondary line-through">{money(product.comparePrice)}</span> : null}
            </div>
            <p className="mt-5 text-lg leading-8 text-secondary">{product.description}</p>
            <ProductPurchasePanel product={product} />
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="surface-card flex gap-3 p-4">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold">Fast fulfillment</h3>
                  <p className="text-sm text-secondary">Warehouse-aware stock checks before checkout.</p>
                </div>
              </div>
              <div className="surface-card flex gap-3 p-4">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold">Secure payment layer</h3>
                  <p className="text-sm text-secondary">Stripe, PayPal, Flutterwave, and Paystack abstraction.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="label">Specifications</p>
            <table className="mt-4 w-full overflow-hidden rounded-lg border border-outline-variant bg-white text-sm">
              <tbody>
                {[
                  ["SKU", product.sku],
                  ["Warehouse", product.inventory.warehouse],
                  ["Available", String(product.inventory.quantity - product.inventory.reserved)],
                  ["Status", product.status]
                ].map(([key, value]) => (
                  <tr key={key} className="border-b border-outline-variant last:border-0">
                    <th className="bg-surface-container-low p-3 text-left font-semibold text-secondary">{key}</th>
                    <td className="p-3">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <p className="label">Customer reviews</p>
            <div className="mt-4 space-y-3">
              {(product.reviews.length ? product.reviews : [{ id: "empty", userName: "Midr buyer", rating: 5, title: "Reliable quality", comment: "A clean, premium experience from product page to delivery." }]).map((review) => (
                <div key={review.id} className="surface-card p-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-semibold">{review.title}</h3>
                    <span className="shrink-0 text-sm font-semibold text-warning">{review.rating}/5</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-secondary">{review.comment}</p>
                  <p className="mt-3 text-xs font-semibold text-secondary">{review.userName}</p>
                </div>
              ))}
            </div>
            <ReviewForm productId={product.id} />
          </div>
        </section>

        {related.length ? (
          <section className="mt-14">
            <p className="label">Related products</p>
            <h2 className="mt-2 text-3xl font-semibold">Complete the look</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}
