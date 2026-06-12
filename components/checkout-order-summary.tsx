"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";
import { getCartSubtotal } from "@/lib/cart";
import { money } from "@/lib/store";

export function CheckoutOrderSummary() {
  const { cart, loading, refresh } = useCart();
  const checkoutItems = cart?.items ?? [];
  const subtotal = getCartSubtotal(checkoutItems);
  const discount = cart?.discount ?? 0;
  const tax = cart?.tax ?? 0;
  const shipping = cart?.shipping ?? 0;
  const total = Math.max(0, subtotal - discount + tax + shipping);

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    console.log("Checkout Items:", checkoutItems);
  }, [checkoutItems]);

  if (loading && !cart) {
    return (
      <aside className="surface-card h-fit p-4 sm:p-5 lg:col-start-2 lg:row-start-1 lg:sticky lg:top-20">
        <h2 className="text-lg font-semibold sm:text-xl">Order summary</h2>
        <p className="mt-4 text-sm text-secondary">Loading checkout items...</p>
      </aside>
    );
  }

  return (
    <aside className="surface-card h-fit p-4 sm:p-5 lg:col-start-2 lg:row-start-1 lg:sticky lg:top-20">
      <h2 className="text-lg font-semibold sm:text-xl">Order summary</h2>
      <div className="mt-4 space-y-4">
        {checkoutItems.map((item) => (
          <div key={item.productId} className="flex gap-3">
            <img src={item.product.images[0].url} alt={item.product.images[0].alt} className="h-16 w-16 rounded-md object-cover" />
            <div className="flex-1">
              <p className="text-sm font-semibold leading-5 sm:text-base">{item.product.name}</p>
              <p className="text-sm text-secondary">Qty {item.quantity}</p>
            </div>
            <span className="text-sm font-semibold sm:text-base">{money(item.total)}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 border-t border-outline-variant pt-4 text-sm">
        <div className="flex justify-between"><span>Subtotal</span><span>{money(subtotal)}</span></div>
        <div className="mt-2 flex justify-between"><span>Tax</span><span>{money(tax)}</span></div>
        <div className="mt-2 flex justify-between"><span>Shipping</span><span>{money(shipping)}</span></div>
        <div className="mt-3 flex justify-between text-lg font-bold"><span>Total</span><span>{money(total)}</span></div>
      </div>
      {!checkoutItems.length ? (
        <Button asChild className="mt-5 w-full">
          <Link href="/shop">Add products</Link>
        </Button>
      ) : null}
    </aside>
  );
}
