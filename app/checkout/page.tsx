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
      <main className="page-shell grid gap-5 py-7 sm:py-10 lg:grid-cols-[1fr_380px] lg:gap-8">
        <aside className="surface-card h-fit p-4 sm:p-5 lg:col-start-2 lg:row-start-1 lg:sticky lg:top-20">
          <h2 className="text-lg font-semibold sm:text-xl">Order summary</h2>
          <div className="mt-4 space-y-4">
            {cart.items.map((item) => (
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
        <div className="lg:col-start-1 lg:row-start-1">
          <p className="label">Checkout</p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Complete purchase</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-secondary sm:text-base">
            Demo checkout confirms safely. If Paystack keys are configured, Paystack opens a real hosted payment page.
          </p>
          <div className="mt-6 sm:mt-8">
            <CheckoutForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
