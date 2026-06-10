"use client";

import { useMemo, useState } from "react";
import { Heart, MessageCircle, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";
import { money } from "@/lib/store";
import type { Product } from "@/lib/types";

function groupVariants(product: Product) {
  return product.variants.reduce<Record<string, Product["variants"]>>((groups, variant) => {
    groups[variant.name] ??= [];
    groups[variant.name].push(variant);
    return groups;
  }, {});
}

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIds, setSelectedVariantIds] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [wishlistMessage, setWishlistMessage] = useState("");
  const { refresh } = useCart();
  const groupedVariants = useMemo(() => groupVariants(product), [product]);
  const selectedVariants = Object.entries(groupedVariants)
    .map(([name, variants]) => variants.find((variant) => variant.id === selectedVariantIds[name]) ?? variants[0])
    .filter(Boolean);

  async function addToCart() {
    setLoading(true);
    setMessage("");
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id, quantity })
    });
    await refresh();
    setLoading(false);
    setMessage(`${quantity} item${quantity > 1 ? "s" : ""} added to cart.`);
  }

  async function toggleWishlist() {
    setWishlistMessage("");
    const response = await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id })
    });
    const result = await response.json();
    if (!result.ok) {
      setWishlistMessage("Could not update wishlist.");
      return;
    }
    const saved = result.data.productIds.includes(product.id);
    setWishlistMessage(saved ? "Saved to wishlist." : "Removed from wishlist.");
  }

  const whatsappText = encodeURIComponent(`Hi, I want to ask about ${product.name}${selectedVariants.length ? ` (${selectedVariants.map((item) => item.value).join(", ")})` : ""}.`);

  return (
    <div className="mt-6 space-y-5">
      {Object.entries(groupedVariants).map(([name, variants]) => (
        <div key={name}>
          <p className="text-sm font-semibold">{name}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {variants.map((variant, index) => {
              const active = (selectedVariantIds[name] ?? variants[0].id) === variant.id;
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariantIds((current) => ({ ...current, [name]: variant.id }))}
                  className={`focus-ring rounded-md border px-4 py-2 text-sm font-semibold transition ${
                    active ? "border-primary bg-blue-50 text-primary" : "border-outline-variant bg-white text-on-surface hover:border-primary"
                  }`}
                  aria-pressed={active}
                >
                  {variant.value}
                  {variant.price !== product.price ? <span className="ml-2 text-xs text-secondary">{money(variant.price)}</span> : null}
                  {index === 0 ? <span className="sr-only"> default</span> : null}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex flex-wrap items-end gap-4">
        <div>
          <p className="text-sm font-semibold">Quantity</p>
          <div className="mt-2 flex items-center rounded-md border border-outline-variant bg-white">
            <button className="grid h-11 w-11 place-items-center" type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">
              <Minus className="h-4 w-4" />
            </button>
            <span className="grid h-11 w-12 place-items-center text-sm font-bold">{quantity}</span>
            <button className="grid h-11 w-11 place-items-center" type="button" onClick={() => setQuantity((value) => Math.min(10, value + 1))} aria-label="Increase quantity">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="min-w-40">
          <p className="text-sm text-secondary">Estimated total</p>
          <p className="font-label text-2xl font-bold">{money(product.price * quantity)}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button className="h-12 flex-1" onClick={addToCart} disabled={loading}>
          <ShoppingCart className="h-4 w-4" />
          {loading ? "Adding" : "Add to cart"}
        </Button>
        <Button variant="secondary" className="h-12" onClick={toggleWishlist}>
          <Heart className="h-4 w-4" />
          Wishlist
        </Button>
        <Button asChild variant="secondary" className="h-12">
          <a href={`https://wa.me/2348106464613?text=${whatsappText}`} target="_blank" rel="noreferrer">
            <MessageCircle className="h-4 w-4" />
            Ask
          </a>
        </Button>
      </div>

      {selectedVariants.length ? (
        <p className="rounded-md bg-surface-container-low p-3 text-sm text-secondary">
          Selected: {selectedVariants.map((variant) => `${variant.name} ${variant.value}`).join(", ")}
        </p>
      ) : null}
      {message ? <p className="rounded-md bg-blue-50 p-3 text-sm font-semibold text-primary">{message}</p> : null}
      {wishlistMessage ? <p className="rounded-md bg-blue-50 p-3 text-sm font-semibold text-primary">{wishlistMessage}</p> : null}
    </div>
  );
}
