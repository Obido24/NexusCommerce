"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";
import { money } from "@/lib/store";
import type { Product } from "@/lib/types";

type CartPayload = {
  items: Array<{ productId: string; quantity: number; product: Product; total: number }>;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
};

export function CartView() {
  const [cart, setCart] = useState<CartPayload | null>(null);
  const { refresh } = useCart();

  async function load() {
    const response = await fetch("/api/cart", { cache: "no-store" });
    const payload = await response.json();
    setCart(payload.data.cart);
    await refresh();
  }

  async function update(productId: string, quantity: number) {
    await fetch("/api/cart", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ productId, quantity }) });
    await load();
  }

  async function remove(productId: string) {
    await fetch(`/api/cart?productId=${productId}`, { method: "DELETE" });
    await load();
  }

  useEffect(() => {
    load();
  }, []);

  if (!cart) return <div className="surface-card p-8">Loading cart...</div>;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div className="space-y-4">
        {cart.items.length ? (
          cart.items.map((item) => (
            <div key={item.productId} className="surface-card flex flex-col gap-4 p-4 sm:flex-row">
              <img src={item.product.images[0].url} alt={item.product.images[0].alt} className="h-32 w-full rounded-md object-cover sm:w-32" />
              <div className="flex flex-1 flex-col justify-between gap-4">
                <div>
                  <p className="label">{item.product.category}</p>
                  <h2 className="mt-1 text-xl font-semibold">{item.product.name}</h2>
                  <p className="mt-1 text-sm text-secondary">{item.product.sku}</p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center rounded-md border border-outline-variant bg-white">
                    <button className="grid h-9 w-9 place-items-center" onClick={() => update(item.productId, Math.max(1, item.quantity - 1))} aria-label="Decrease quantity">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="grid h-9 w-10 place-items-center text-sm font-semibold">{item.quantity}</span>
                    <button className="grid h-9 w-9 place-items-center" onClick={() => update(item.productId, item.quantity + 1)} aria-label="Increase quantity">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-label text-lg font-bold">{money(item.total)}</span>
                    <Button variant="ghost" size="icon" onClick={() => remove(item.productId)} aria-label="Remove product">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="surface-card p-8 text-center">
            <h2 className="text-xl font-semibold">Your cart is empty</h2>
            <Button asChild className="mt-4">
              <Link href="/shop">Continue shopping</Link>
            </Button>
          </div>
        )}
      </div>
      <aside className="surface-card h-fit p-5">
        <h2 className="text-xl font-semibold">Cart summary</h2>
        <div className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>{money(cart.subtotal)}</span></div>
          <div className="flex justify-between"><span>Discount</span><span>{money(cart.discount)}</span></div>
          <div className="flex justify-between"><span>Tax</span><span>{money(cart.tax)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>{money(cart.shipping)}</span></div>
          <div className="border-t border-outline-variant pt-3 text-lg font-bold"><div className="flex justify-between"><span>Total</span><span>{money(cart.total)}</span></div></div>
        </div>
        <input className="focus-ring mt-5 h-10 w-full rounded-md border border-outline-variant px-3 text-sm" placeholder="Coupon code" defaultValue="WELCOME10" />
        <Button asChild className="mt-4 w-full" disabled={!cart.items.length}>
          <Link href="/checkout">Checkout</Link>
        </Button>
      </aside>
    </div>
  );
}
