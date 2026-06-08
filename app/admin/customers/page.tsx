import { AdminShell } from "@/components/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { money, store } from "@/lib/store";

export default function AdminCustomersPage() {
  const customers = store.users.filter((user) => user.role === "CUSTOMER");
  return (
    <AdminShell title="Customer Management" actions={<Button variant="secondary">Export customers</Button>}>
      <section className="surface-card overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-container-low text-xs uppercase tracking-[0.08em] text-secondary">
            <tr><th className="p-3">Customer</th><th className="p-3">Orders</th><th className="p-3">Lifetime value</th><th className="p-3">Status</th><th className="p-3">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {customers.map((customer) => {
              const orders = store.orders.filter((order) => order.userId === customer.id);
              const value = orders.reduce((sum, order) => sum + order.total, 0);
              return (
                <tr key={customer.id}>
                  <td className="p-3"><p className="font-semibold">{customer.name}</p><p className="text-secondary">{customer.email}</p></td>
                  <td className="p-3">{orders.length}</td>
                  <td className="p-3 font-semibold">{money(value)}</td>
                  <td className="p-3"><Badge tone={customer.disabled ? "danger" : "success"}>{customer.disabled ? "disabled" : "active"}</Badge></td>
                  <td className="p-3"><Button variant="secondary" size="sm">Disable account</Button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </AdminShell>
  );
}
