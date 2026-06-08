import Link from "next/link";
import { CheckoutForm } from "@/components/checkout-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { getCart, money } from "@/lib/store";

export default function CheckoutPage() {
  const cart = getCart();
  return (
    <>
      <SiteHeader />
      <main className="page-shell grid gap-8 py-10 lg:grid-cols-[1fr_380px]">
        <div>
          <p className="label">Checkout</p>
          <h1 className="mt-2 text-4xl font-semibold">Complete purchase</h1>
          <div className="mt-8">
            <CheckoutForm />
          </div>
        </div>
        <aside className="surface-card h-fit p-5">
          <h2 className="text-xl font-semibold">Order summary</h2>
          <div className="mt-4 space-y-4">
            {cart.items.map((item) => (
              <div key={item.productId} className="flex gap-3">
                <img src={item.product.images[0].url} alt={item.product.images[0].alt} className="h-16 w-16 rounded-md object-cover" />
                <div className="flex-1">
                  <p className="font-semibold">{item.product.name}</p>
                  <p className="text-sm text-secondary">Qty {item.quantity}</p>
                </div>
                <span className="font-semibold">{money(item.total)}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-outline-variant pt-4 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{money(cart.subtotal)}</span></div>
            <div className="mt-2 flex justify-between"><span>Tax</span><span>{money(cart.tax)}</span></div>
            <div className="mt-2 flex justify-between"><span>Shipping</span><span>{money(cart.shipping)}</span></div>
            <div className="mt-3 flex justify-between text-lg font-bold"><span>Total</span><span>{money(cart.total)}</span></div>
          </div>
          {!cart.items.length ? (
            <Button asChild className="mt-5 w-full">
              <Link href="/shop">Add products</Link>
            </Button>
          ) : null}
        </aside>
      </main>
      <SiteFooter />
    </>
  );
}
