import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText, MapPin, PackageCheck, ReceiptText, UserCircle } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { OrderStatusForm } from "@/components/order-status-form";
import { PrintButton } from "@/components/print-button";
import { OrderStatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { money, store } from "@/lib/store";

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = store.orders.find((item) => item.id === id);
  if (!order) notFound();

  return (
    <AdminShell
      title={`Order ${order.orderNumber}`}
      actions={
        <>
          <Button asChild variant="secondary">
            <Link href="/admin/orders">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
          <PrintButton label="Print order" />
        </>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="space-y-6">
          <div className="surface-card p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="label">Fulfillment</p>
                <h2 className="mt-1 text-2xl font-semibold">{order.orderNumber}</h2>
                <p className="mt-2 text-sm text-secondary">Created {new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <OrderStatusBadge status={order.status} />
                <OrderStatusForm orderId={order.id} initialStatus={order.status} />
              </div>
            </div>
          </div>

          <div className="surface-card overflow-hidden">
            <div className="border-b border-outline-variant bg-surface-container-low p-5">
              <div className="flex items-center gap-3">
                <PackageCheck className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Items</h2>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="text-xs uppercase tracking-[0.08em] text-secondary">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4 text-center">Qty</th>
                    <th className="p-4 text-right">Unit price</th>
                    <th className="p-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {order.items.map((item) => (
                    <tr key={item.productId}>
                      <td className="p-4 font-semibold">{item.name}</td>
                      <td className="p-4 text-center">{item.quantity}</td>
                      <td className="p-4 text-right">{money(item.unitPrice)}</td>
                      <td className="p-4 text-right font-semibold">{money(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="surface-card p-5">
              <div className="flex items-center gap-3">
                <UserCircle className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Customer</h2>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <p className="font-semibold">{order.customerName}</p>
                <p className="text-secondary">{order.customerEmail}</p>
                <p className="text-secondary">Customer ID: {order.userId}</p>
              </div>
            </div>

            <div className="surface-card p-5">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Shipping address</h2>
              </div>
              <p className="mt-4 text-sm leading-6 text-secondary">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                <br />
                {order.shippingAddress.line1}
                {order.shippingAddress.line2 ? (
                  <>
                    <br />
                    {order.shippingAddress.line2}
                  </>
                ) : null}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                <br />
                {order.shippingAddress.country}
              </p>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="surface-card p-5">
            <div className="flex items-center gap-3">
              <ReceiptText className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Payment summary</h2>
            </div>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{money(order.subtotal)}</span></div>
              <div className="flex justify-between"><span>Discount</span><span>{money(order.discount)}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>{money(order.tax)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{money(order.shipping)}</span></div>
              <div className="flex justify-between border-t border-outline-variant pt-3 text-lg font-bold"><span>Total</span><span>{money(order.total)}</span></div>
            </div>
            <div className="mt-5 rounded-md bg-surface-container-low p-3 text-sm">
              <p className="font-semibold">Provider: {order.paymentProvider}</p>
              <p className="mt-1 text-secondary">Status: {order.paymentStatus}</p>
            </div>
          </div>

          <div className="surface-card p-5">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Admin notes</h2>
            </div>
            <textarea
              className="focus-ring mt-4 min-h-28 w-full rounded-md border border-outline-variant p-3 text-sm"
              defaultValue="Demo note: confirm payment, reserve inventory, prepare packaging, and update status when dispatched."
            />
            <Button className="mt-3 w-full" variant="secondary">Save note</Button>
          </div>
        </aside>
      </div>
    </AdminShell>
  );
}
