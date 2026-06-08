import { AdminShell } from "@/components/admin-shell";
import { ProductAdminForm } from "@/components/product-admin-form";
import { ProductStatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { money, store } from "@/lib/store";

export default function AdminProductsPage() {
  return (
    <AdminShell title="Product Management" actions={<Button>Export CSV</Button>}>
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <ProductAdminForm categories={store.categories} />
        <section className="surface-card overflow-hidden">
          <div className="border-b border-outline-variant p-5">
            <p className="label">Catalog</p>
            <h2 className="mt-1 text-xl font-semibold">Products and variants</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-surface-container-low text-xs uppercase tracking-[0.08em] text-secondary">
                <tr><th className="p-3">Product</th><th className="p-3">SKU</th><th className="p-3">Category</th><th className="p-3">Inventory</th><th className="p-3">Price</th><th className="p-3">Status</th></tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {store.products.map((product) => (
                  <tr key={product.id}>
                    <td className="p-3"><div className="flex items-center gap-3"><img src={product.images[0].url} alt={product.images[0].alt} className="h-10 w-10 rounded object-cover" /><span className="font-semibold">{product.name}</span></div></td>
                    <td className="p-3 font-label">{product.sku}</td>
                    <td className="p-3">{product.category}</td>
                    <td className="p-3">{product.inventory.quantity - product.inventory.reserved}</td>
                    <td className="p-3 font-semibold">{money(product.price)}</td>
                    <td className="p-3"><ProductStatusBadge status={product.status} /></td>
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
