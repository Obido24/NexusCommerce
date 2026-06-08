import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";

export default async function CheckoutSuccessPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const params = await searchParams;
  return (
    <>
      <SiteHeader />
      <main className="page-shell grid min-h-[70vh] place-items-center py-16">
        <div className="surface-card max-w-xl p-8 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
          <h1 className="mt-4 text-3xl font-semibold">Order confirmed</h1>
          <p className="mt-3 text-secondary">Your order {params.order ?? "has been created"} is now visible in your account and the admin order queue.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild><Link href="/account">View account</Link></Button>
            <Button asChild variant="secondary"><Link href="/admin/orders">Admin orders</Link></Button>
          </div>
        </div>
      </main>
    </>
  );
}
