import { AlertTriangle, Boxes, FileDown } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { InventoryAdjustForm } from "@/components/inventory-adjust-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { percentage } from "@/lib/utils";
import { getInventoryReport, money } from "@/lib/store";

export default function AdminInventoryPage() {
  const report = getInventoryReport();
  const lowCount = report.filter((item) => item.low).length;
  const totalValue = report.reduce((sum, item) => sum + item.stockValue, 0);

  return (
    <AdminShell
      title="Inventory Management"
      actions={
        <>
          <Button asChild variant="secondary">
            <a href="/api/inventory/export">
              <FileDown className="h-4 w-4" />
              Export inventory
            </a>
          </Button>
          <Button>
            <Boxes className="h-4 w-4" />
            {lowCount} low stock
          </Button>
        </>
      }
    >
      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="surface-card p-5">
          <p className="label">Products tracked</p>
          <p className="mt-2 text-3xl font-semibold">{report.length}</p>
        </div>
        <div className="surface-card p-5">
          <p className="label">Low stock items</p>
          <p className="mt-2 text-3xl font-semibold text-amber-700">{lowCount}</p>
        </div>
        <div className="surface-card p-5">
          <p className="label">Available stock value</p>
          <p className="mt-2 text-3xl font-semibold">{money(totalValue)}</p>
        </div>
      </section>
      <div className="grid gap-6 lg:grid-cols-3">
        {report.map(({ product, available, low, stockValue }) => {
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
                <div className="rounded-md bg-surface-container-low p-3"><p className="text-secondary">Warehouse</p><p className="font-semibold">{product.inventory.warehouse}</p></div>
                <div className="rounded-md bg-surface-container-low p-3"><p className="text-secondary">Stock value</p><p className="font-semibold">{money(stockValue)}</p></div>
              </div>
              {low ? <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-amber-700"><AlertTriangle className="h-4 w-4" />Needs restock</p> : null}
              <InventoryAdjustForm
                productId={product.id}
                currentQuantity={product.inventory.quantity}
                currentReorderPoint={product.inventory.reorderPoint}
                currentWarehouse={product.inventory.warehouse}
              />
            </article>
          );
        })}
      </div>
    </AdminShell>
  );
}
