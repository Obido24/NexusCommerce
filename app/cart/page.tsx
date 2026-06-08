import { CartView } from "@/components/cart-view";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function CartPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-shell py-10">
        <p className="label">Cart</p>
        <h1 className="mt-2 text-4xl font-semibold">Review your order</h1>
        <div className="mt-8">
          <CartView />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
