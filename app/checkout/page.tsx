import { CheckoutForm } from "@/components/checkout-form";
import { CheckoutOrderSummary } from "@/components/checkout-order-summary";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function CheckoutPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-shell grid gap-5 py-7 sm:py-10 lg:grid-cols-[1fr_380px] lg:gap-8">
        <CheckoutOrderSummary />
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
