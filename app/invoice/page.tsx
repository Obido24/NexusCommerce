import { InvoiceView } from "@/components/invoice-view";
import { SiteHeader } from "@/components/site-header";

export default async function InvoicePage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const params = await searchParams;
  return (
    <>
      <SiteHeader />
      <main className="page-shell py-10">
        <InvoiceView orderNumber={params.order} />
      </main>
    </>
  );
}
