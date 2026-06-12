import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { money } from "@/lib/store";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { WishlistToggleButton } from "@/components/wishlist-toggle-button";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="surface-card group flex overflow-hidden transition hover:-translate-y-0.5 hover:shadow-ambient sm:block">
      <Link href={`/products/${product.slug}`} className="block w-32 shrink-0 sm:w-full">
        <div className="relative h-full min-h-36 overflow-hidden bg-surface-container sm:aspect-[4/3] sm:min-h-0">
          <Image src={product.images[0].url} alt={product.images[0].alt} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 128px" />
          {product.bestSeller ? <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">Best seller</span> : null}
        </div>
      </Link>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-3 sm:block sm:space-y-3 sm:p-4">
        <div>
          <p className="label">{product.category}</p>
          <Link href={`/products/${product.slug}`} className="mt-1 block text-base font-semibold leading-6 text-on-surface hover:text-primary sm:text-lg">
            {product.name}
          </Link>
          <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-secondary">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            <span>{product.reviews.length ? "4.9" : "4.8"}</span>
            <span>({product.reviews.length || 12})</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <span className="font-label text-base font-bold sm:text-lg">{money(product.price)}</span>
            {product.comparePrice ? <span className="ml-2 text-xs text-secondary line-through sm:text-sm">{money(product.comparePrice)}</span> : null}
          </div>
          <WishlistToggleButton productId={product.id} productName={product.name} />
        </div>
        <AddToCartButton productId={product.id} className="h-10 w-full px-3 text-xs sm:text-sm" />
      </div>
    </article>
  );
}
