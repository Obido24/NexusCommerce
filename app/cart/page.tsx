import { CartView } from "@/components/cart-view";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function CartPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-shell py-7 sm:py-10">
        <p className="label">Cart</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Review your order</h1>
        <p className="mt-2 text-sm leading-6 text-secondary sm:text-base">Update quantities, apply the demo coupon, then continue to checkout.</p>
        <div className="mt-6 sm:mt-8">
          <CartView />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
