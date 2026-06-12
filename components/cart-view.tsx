"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";
import { money } from "@/lib/store";

export function CartView() {
  const { cart, loading, refresh, replaceCart } = useCart();

  async function load() {
    await refresh();
  }

  async function update(productId: string, quantity: number) {
    const response = await fetch("/api/cart", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ productId, quantity }) });
    const payload = await response.json();
    if (payload.data?.cart) replaceCart(payload.data.cart);
    else await load();
  }

  async function remove(productId: string) {
    const response = await fetch(`/api/cart?productId=${productId}`, { method: "DELETE" });
    const payload = await response.json();
    if (payload.data?.cart) replaceCart(payload.data.cart);
    else await load();
  }

  useEffect(() => {
    load();
  }, []);

  if (loading && !cart) return <div className="surface-card p-5 sm:p-8">Loading cart...</div>;
  if (!cart) return <div className="surface-card p-5 sm:p-8">Could not load cart.</div>;

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_380px] lg:gap-8">
      <div className="space-y-4">
        {cart.items.length ? (
          cart.items.map((item) => (
            <div key={item.productId} className="surface-card flex gap-3 p-3 sm:gap-4 sm:p-4">
              <img src={item.product.images[0].url} alt={item.product.images[0].alt} className="h-32 w-28 shrink-0 rounded-md object-cover sm:w-32" />
              <div className="flex flex-1 flex-col justify-between gap-4">
                <div>
                  <p className="label">{item.product.category}</p>
                  <h2 className="mt-1 text-base font-semibold leading-6 sm:text-xl">{item.product.name}</h2>
                  <p className="mt-1 text-sm text-secondary">{item.product.sku}</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                  <div className="flex items-center rounded-md border border-outline-variant bg-white">
                    <button className="grid h-9 w-9 place-items-center" onClick={() => update(item.productId, Math.max(1, item.quantity - 1))} aria-label="Decrease quantity">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="grid h-9 w-10 place-items-center text-sm font-semibold">{item.quantity}</span>
                    <button className="grid h-9 w-9 place-items-center" onClick={() => update(item.productId, item.quantity + 1)} aria-label="Increase quantity">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-start">
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
          <div className="surface-card p-6 text-center sm:p-8">
            <h2 className="text-xl font-semibold">Your cart is empty</h2>
            <Button asChild className="mt-4">
              <Link href="/shop">Continue shopping</Link>
            </Button>
          </div>
        )}
      </div>
      <aside className="surface-card h-fit p-4 sm:p-5 lg:sticky lg:top-20">
        <h2 className="text-lg font-semibold sm:text-xl">Cart summary</h2>
        <div className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>{money(cart.subtotal)}</span></div>
          <div className="flex justify-between"><span>Discount</span><span>{money(cart.discount)}</span></div>
          <div className="flex justify-between"><span>Tax</span><span>{money(cart.tax)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>{money(cart.shipping)}</span></div>
          <div className="border-t border-outline-variant pt-3 text-lg font-bold"><div className="flex justify-between"><span>Total</span><span>{money(cart.total)}</span></div></div>
        </div>
        <input className="focus-ring mt-5 h-10 w-full rounded-md border border-outline-variant px-3 text-sm" placeholder="Coupon code" defaultValue="WELCOME10" />
        <Button asChild className="mt-4 w-full" disabled={!cart.items.length}>
          <Link href="/checkout">Proceed to checkout</Link>
        </Button>
        <p className="mt-3 text-center text-xs leading-5 text-secondary">Demo checkout is safe. Paystack live checkout activates when keys are added.</p>
      </aside>
    </div>
  );
}
