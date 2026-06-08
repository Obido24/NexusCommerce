import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/types";
import { money } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/add-to-cart-button";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="surface-card group overflow-hidden transition hover:-translate-y-0.5 hover:shadow-ambient">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-container">
          <Image src={product.images[0].url} alt={product.images[0].alt} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 25vw, 50vw" />
          {product.bestSeller ? <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">Best seller</span> : null}
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <div>
          <p className="label">{product.category}</p>
          <Link href={`/products/${product.slug}`} className="mt-1 block text-lg font-semibold text-on-surface hover:text-primary">
            {product.name}
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-label text-lg font-bold">{money(product.price)}</span>
            {product.comparePrice ? <span className="ml-2 text-sm text-secondary line-through">{money(product.comparePrice)}</span> : null}
          </div>
          <Button variant="ghost" size="icon" aria-label={`Add ${product.name} to wishlist`}>
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <AddToCartButton productId={product.id} />
      </div>
    </article>
  );
}
