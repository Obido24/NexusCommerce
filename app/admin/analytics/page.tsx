import { AlertTriangle, BarChart3, CreditCard, FileDown, PackageSearch, PieChart, ReceiptText, TrendingUp } from "lucide-react";
import { AdminMetricCard } from "@/components/admin-metric-card";
import { AdminShell } from "@/components/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAnalyticsReport, money } from "@/lib/store";
import { percentage } from "@/lib/utils";

export default function AdminAnalyticsPage() {
  const report = getAnalyticsReport();
  const maxMonthlySales = Math.max(...report.salesSeries.map((item) => item.sales), 1);
  const maxProductRevenue = Math.max(...report.productPerformance.map((item) => item.revenue), 1);
  const maxCategoryRevenue = Math.max(...report.categoryRevenue.map((item) => item.revenue), 1);
  const maxPaymentRevenue = Math.max(...report.paymentBreakdown.map((item) => item.revenue), 1);

  return (
    <AdminShell
      title="Analytics"
      actions={
        <Button asChild>
          <a href="/api/analytics/export">
            <FileDown className="h-4 w-4" />
            Export analytics
          </a>
        </Button>
      }
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard icon={TrendingUp} label="Revenue" value={money(report.totalRevenue)} helper={`${report.totalOrders} total orders tracked`} />
        <AdminMetricCard icon={ReceiptText} label="Avg order value" value={money(report.averageOrderValue)} helper={`${report.paidOrderRate}% paid order rate`} />
        <AdminMetricCard icon={AlertTriangle} label="Low stock" value={String(report.lowStockCount)} helper="Items at or below reorder point" />
        <AdminMetricCard icon={PackageSearch} label="Stock value" value={money(report.inventoryValue)} helper="Available inventory value" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="surface-card p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="label">Revenue reports</p>
              <h2 className="mt-1 text-xl font-semibold">Monthly sales trend</h2>
            </div>
            <Badge tone="success">Demo growth</Badge>
          </div>
          <div className="mt-6 grid h-72 grid-cols-6 items-end gap-4">
            {report.salesSeries.map((item) => (
              <div key={item.label} className="flex h-full flex-col justify-end gap-2">
                <div className="rounded-t-md bg-primary" style={{ height: `${percentage(item.sales, maxMonthlySales)}%` }} />
                <div className="text-center">
                  <p className="text-xs font-bold text-secondary">{item.label}</p>
                  <p className="text-[11px] text-secondary">{item.orders} orders</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="surface-card p-5">
          <div className="flex items-center gap-3">
            <PieChart className="h-5 w-5 text-primary" />
            <div>
              <p className="label">Conversion funnel</p>
              <h2 className="text-xl font-semibold">Client demo journey</h2>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {report.funnel.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="font-semibold">{item.count} · {item.rate}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-surface-container">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${item.rate}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="surface-card p-5">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-primary" />
            <div>
              <p className="label">Product performance</p>
              <h2 className="text-xl font-semibold">Top products</h2>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {report.productPerformance.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm"><span>{item.name}</span><span className="font-semibold">{money(item.revenue)} · {item.units} units</span></div>
                <div className="mt-2 h-2 rounded-full bg-surface-container"><div className="h-2 rounded-full bg-success" style={{ width: `${percentage(item.revenue, maxProductRevenue)}%` }} /></div>
              </div>
            ))}
          </div>
        </section>

        <section className="surface-card p-5">
          <div className="flex items-center gap-3">
            <PackageSearch className="h-5 w-5 text-primary" />
            <div>
              <p className="label">Sales by category</p>
              <h2 className="text-xl font-semibold">Category revenue</h2>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {report.categoryRevenue.map((item) => (
              <div key={item.category}>
                <div className="flex justify-between text-sm"><span>{item.category}</span><span className="font-semibold">{money(item.revenue)} · {item.units} units</span></div>
                <div className="mt-2 h-2 rounded-full bg-surface-container"><div className="h-2 rounded-full bg-warning" style={{ width: `${percentage(item.revenue, maxCategoryRevenue)}%` }} /></div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <section className="surface-card p-5">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-primary" />
            <div>
              <p className="label">Payment methods</p>
              <h2 className="text-xl font-semibold">Revenue by provider</h2>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {report.paymentBreakdown.map((item) => (
              <div key={item.provider}>
                <div className="flex justify-between text-sm"><span className="capitalize">{item.provider}</span><span className="font-semibold">{money(item.revenue)} · {item.orders} orders</span></div>
                <div className="mt-2 h-2 rounded-full bg-surface-container"><div className="h-2 rounded-full bg-primary" style={{ width: `${percentage(item.revenue, maxPaymentRevenue)}%` }} /></div>
              </div>
            ))}
          </div>
        </section>

        <section className="surface-card overflow-hidden">
          <div className="border-b border-outline-variant p-5">
            <p className="label">Inventory reports</p>
            <h2 className="mt-1 text-xl font-semibold">Stock risk</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-surface-container-low text-xs uppercase tracking-[0.08em] text-secondary">
                <tr><th className="p-3">Product</th><th className="p-3">SKU</th><th className="p-3">Available</th><th className="p-3">Warehouse</th><th className="p-3">Risk</th></tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {report.inventoryRisk.map((item) => (
                  <tr key={item.productId}>
                    <td className="p-3 font-semibold">{item.name}</td>
                    <td className="p-3 font-label">{item.sku}</td>
                    <td className="p-3">{item.available} / reorder {item.reorderPoint}</td>
                    <td className="p-3">{item.warehouse}</td>
                    <td className="p-3"><Badge tone={item.risk === "LOW" ? "warning" : "success"}>{item.risk === "LOW" ? "restock" : "stable"}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
