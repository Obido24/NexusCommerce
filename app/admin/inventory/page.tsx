import { AlertTriangle, Boxes } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { percentage } from "@/lib/utils";
import { store } from "@/lib/store";

export default function AdminInventoryPage() {
  return (
    <AdminShell title="Inventory Management" actions={<Button><Boxes className="h-4 w-4" />Restock plan</Button>}>
      <div className="grid gap-6 lg:grid-cols-3">
        {store.products.map((product) => {
          const available = product.inventory.quantity - product.inventory.reserved;
          const low = available <= product.inventory.reorderPoint;
          return (
            <article key={product.id} className="surface-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="label">{product.sku}</p>
                  <h2 className="mt-1 text-lg font-semibold">{product.name}</h2>
                </div>
                <Badge tone={low ? "warning" : "success"}>{low ? "low stock" : "healthy"}</Badge>
              </div>
              <div className="mt-5">
                <div className="flex justify-between text-sm"><span>Available</span><span className="font-semibold">{available} / {product.inventory.quantity}</span></div>
                <div className="mt-2 h-2 rounded-full bg-surface-container"><div className={`h-2 rounded-full ${low ? "bg-warning" : "bg-primary"}`} style={{ width: `${percentage(available, product.inventory.quantity)}%` }} /></div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-md bg-surface-container-low p-3"><p className="text-secondary">Reserved</p><p className="font-semibold">{product.inventory.reserved}</p></div>
                <div className="rounded-md bg-surface-container-low p-3"><p className="text-secondary">Reorder point</p><p className="font-semibold">{product.inventory.reorderPoint}</p></div>
              </div>
              {low ? <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-amber-700"><AlertTriangle className="h-4 w-4" />Needs restock</p> : null}
            </article>
          );
        })}
      </div>
    </AdminShell>
  );
}
