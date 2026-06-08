import { AdminShell } from "@/components/admin-shell";
import { Badge } from "@/components/ui/badge";
import { getDashboardStats, money, store } from "@/lib/store";
import { percentage } from "@/lib/utils";

export default function AdminAnalyticsPage() {
  const stats = getDashboardStats();
  const maxRevenue = Math.max(...stats.productPerformance.map((item) => item.revenue), 1);
  return (
    <AdminShell title="Analytics">
      <div className="grid gap-6 xl:grid-cols-2">
        <section className="surface-card p-5">
          <p className="label">Revenue reports</p>
          <h2 className="mt-1 text-xl font-semibold">Daily and monthly sales</h2>
          <div className="mt-6 space-y-4">
            {stats.salesSeries.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm"><span>{item.label}</span><span className="font-semibold">{money(item.sales)}</span></div>
                <div className="mt-2 h-2 rounded-full bg-surface-container"><div className="h-2 rounded-full bg-primary" style={{ width: `${percentage(item.sales, 24000)}%` }} /></div>
              </div>
            ))}
          </div>
        </section>
        <section className="surface-card p-5">
          <p className="label">Product performance</p>
          <h2 className="mt-1 text-xl font-semibold">Top products</h2>
          <div className="mt-6 space-y-4">
            {stats.productPerformance.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm"><span>{item.name}</span><span className="font-semibold">{money(item.revenue)}</span></div>
                <div className="mt-2 h-2 rounded-full bg-surface-container"><div className="h-2 rounded-full bg-success" style={{ width: `${percentage(item.revenue, maxRevenue)}%` }} /></div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <section className="surface-card mt-6 overflow-hidden">
        <div className="border-b border-outline-variant p-5"><p className="label">Inventory reports</p><h2 className="mt-1 text-xl font-semibold">Stock risk</h2></div>
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-container-low text-xs uppercase tracking-[0.08em] text-secondary"><tr><th className="p-3">Product</th><th className="p-3">Available</th><th className="p-3">Warehouse</th><th className="p-3">Risk</th></tr></thead>
          <tbody className="divide-y divide-outline-variant">
            {store.products.map((product) => {
              const available = product.inventory.quantity - product.inventory.reserved;
              return <tr key={product.id}><td className="p-3 font-semibold">{product.name}</td><td className="p-3">{available}</td><td className="p-3">{product.inventory.warehouse}</td><td className="p-3"><Badge tone={available <= product.inventory.reorderPoint ? "warning" : "success"}>{available <= product.inventory.reorderPoint ? "restock" : "stable"}</Badge></td></tr>;
            })}
          </tbody>
        </table>
      </section>
    </AdminShell>
  );
}
