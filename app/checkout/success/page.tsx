import { OrderConfirmation } from "@/components/order-confirmation";
import { SiteHeader } from "@/components/site-header";

export default async function CheckoutSuccessPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const params = await searchParams;
  return (
    <>
      <SiteHeader />
      <main className="page-shell grid min-h-[70vh] place-items-center py-10">
        <OrderConfirmation orderNumber={params.order} />
      </main>
    </>
  );
}
