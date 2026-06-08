import { Printer, FileDown } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { OrderStatusForm } from "@/components/order-status-form";
import { OrderStatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { money, store } from "@/lib/store";

export default function AdminOrdersPage() {
  return (
    <AdminShell title="Order Management" actions={<><Button variant="secondary"><Printer className="h-4 w-4" />Print invoice</Button><Button><FileDown className="h-4 w-4" />Export orders</Button></>}>
      <section className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-surface-container-low text-xs uppercase tracking-[0.08em] text-secondary">
              <tr><th className="p-3">Order</th><th className="p-3">Customer</th><th className="p-3">Items</th><th className="p-3">Total</th><th className="p-3">Payment</th><th className="p-3">Status</th><th className="p-3">Change status</th></tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {store.orders.map((order) => (
                <tr key={order.id}>
                  <td className="p-3 font-semibold">{order.orderNumber}<p className="text-xs font-normal text-secondary">{new Date(order.createdAt).toLocaleDateString()}</p></td>
                  <td className="p-3">{order.customerName}<p className="text-xs text-secondary">{order.customerEmail}</p></td>
                  <td className="p-3">{order.items.length}</td>
                  <td className="p-3 font-semibold">{money(order.total)}</td>
                  <td className="p-3">{order.paymentProvider}</td>
                  <td className="p-3"><OrderStatusBadge status={order.status} /></td>
                  <td className="p-3"><OrderStatusForm orderId={order.id} initialStatus={order.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  );
}
