"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, PackagePlus, RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

export function InventoryAdjustForm({
  productId,
  currentQuantity,
  currentReorderPoint,
  currentWarehouse
}: {
  productId: string;
  currentQuantity: number;
  currentReorderPoint: number;
  currentWarehouse: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(formData: FormData) {
    setLoading(true);
    setMessage("");
    const payload = {
      action: formData.get("action"),
      quantity: Number(formData.get("quantity") || 0),
      reorderPoint: Number(formData.get("reorderPoint") || currentReorderPoint),
      warehouse: formData.get("warehouse")
    };
    const response = await fetch(`/api/inventory/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    setLoading(false);
    if (!result.ok) {
      setMessage(result.error?.message ?? "Login as admin first.");
      return;
    }
    setMessage("Inventory updated.");
    router.refresh();
  }

  async function quickRestock() {
    setLoading(true);
    setMessage("");
    const response = await fetch(`/api/inventory/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "RESTOCK", quantity: 12, reorderPoint: currentReorderPoint, warehouse: currentWarehouse })
    });
    const result = await response.json();
    setLoading(false);
    setMessage(result.ok ? "Added 12 units." : "Login as admin first.");
    router.refresh();
  }

  return (
    <form action={submit} className="mt-5 space-y-3 border-t border-outline-variant pt-4">
      <div className="grid grid-cols-2 gap-3">
        <label>
          <span className="text-xs font-bold uppercase tracking-[0.08em] text-secondary">Action</span>
          <Select name="action" defaultValue="RESTOCK" className="mt-1 h-9 text-xs">
            <option value="RESTOCK">Restock</option>
            <option value="RESERVE">Reserve</option>
            <option value="RELEASE">Release</option>
            <option value="SET">Set total</option>
          </Select>
        </label>
        <label>
          <span className="text-xs font-bold uppercase tracking-[0.08em] text-secondary">Units</span>
          <input name="quantity" type="number" min="0" defaultValue="6" className="focus-ring mt-1 h-9 w-full rounded-md border border-outline-variant px-3 text-xs" />
        </label>
        <label>
          <span className="text-xs font-bold uppercase tracking-[0.08em] text-secondary">Reorder</span>
          <input name="reorderPoint" type="number" min="0" defaultValue={currentReorderPoint} className="focus-ring mt-1 h-9 w-full rounded-md border border-outline-variant px-3 text-xs" />
        </label>
        <label>
          <span className="text-xs font-bold uppercase tracking-[0.08em] text-secondary">Warehouse</span>
          <input name="warehouse" defaultValue={currentWarehouse} className="focus-ring mt-1 h-9 w-full rounded-md border border-outline-variant px-3 text-xs" />
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Apply
        </Button>
        <Button type="button" size="sm" variant="secondary" onClick={quickRestock} disabled={loading}>
          <PackagePlus className="h-4 w-4" />
          Quick +12
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => router.refresh()}>
          <RotateCcw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
      {message ? <p className="text-xs font-semibold text-primary">{message}</p> : null}
      <p className="text-xs text-secondary">Current total stock: {currentQuantity}</p>
    </form>
  );
}
