import { InvoiceView } from "@/components/invoice-view";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { store } from "@/lib/store";

export default async function InvoicePage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const params = await searchParams;
  const order = params.order ? store.orders.find((item) => item.orderNumber === params.order) : undefined;
  return (
    <>
      <SiteHeader />
      <main className="page-shell py-7 sm:py-10">
        <InvoiceView orderNumber={params.order} fallbackOrder={order} />
      </main>
      <SiteFooter />
    </>
  );
}
