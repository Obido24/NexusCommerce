import Link from "next/link";
import { DollarSign, Package, ShoppingBag, Users } from "lucide-react";
import { AdminMetricCard } from "@/components/admin-metric-card";
import { AdminShell } from "@/components/admin-shell";
import { OrderStatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { getDashboardStats, money, store } from "@/lib/store";

export default function AdminDashboardPage() {
  const stats = getDashboardStats();
  const maxSales = Math.max(...stats.salesSeries.map((item) => item.sales));
  return (
    <AdminShell title="Dashboard Overview" actions={<Button asChild><Link href="/admin/products">Create product</Link></Button>}>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard icon={Package} label="Total products" value={String(stats.totalProducts)} helper="Active catalog and drafts" />
        <AdminMetricCard icon={ShoppingBag} label="Total orders" value={String(stats.totalOrders)} helper="All fulfillment statuses" />
        <AdminMetricCard icon={Users} label="Total customers" value={String(stats.totalCustomers)} helper="Registered customer accounts" />
        <AdminMetricCard icon={DollarSign} label="Total revenue" value={money(stats.totalRevenue)} helper="Paid demo order revenue" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_420px]">
        <section className="surface-card p-5">
          <div className="flex items-center justify-between">
            <div><p className="label">Sales charts</p><h2 className="mt-1 text-xl font-semibold">Monthly sales</h2></div>
            <span className="text-sm font-semibold text-success">+18.4%</span>
          </div>
          <div className="mt-6 flex h-72 items-end gap-4">
            {stats.salesSeries.map((item) => (
              <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-md bg-primary" style={{ height: `${(item.sales / maxSales) * 100}%` }} />
                <span className="text-xs font-semibold text-secondary">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="surface-card overflow-hidden">
          <div className="border-b border-outline-variant p-5"><p className="label">Recent orders</p><h2 className="mt-1 text-xl font-semibold">Fulfillment queue</h2></div>
          <div className="divide-y divide-outline-variant">
            {store.orders.slice(0, 5).map((order) => (
              <div key={order.id} className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div><p className="font-semibold">{order.orderNumber}</p><p className="text-sm text-secondary">{order.customerName}</p></div>
                  <OrderStatusBadge status={order.status} />
                </div>
                <p className="mt-2 text-sm font-semibold">{money(order.total)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
