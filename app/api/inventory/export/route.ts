import { type NextRequest } from "next/server";
import { handleApiError, rateLimit, requireRole } from "@/lib/api";
import { getInventoryReport } from "@/lib/store";

function csvCell(value: string | number | boolean) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, 20);
    await requireRole(request, ["ADMIN"]);
    const rows = [
      ["SKU", "Product", "Category", "Warehouse", "Quantity", "Reserved", "Available", "Reorder Point", "Low Stock", "Stock Value"],
      ...getInventoryReport().map(({ product, available, low, stockValue }) => [
        product.sku,
        product.name,
        product.category,
        product.inventory.warehouse,
        product.inventory.quantity,
        product.inventory.reserved,
        available,
        product.inventory.reorderPoint,
        low,
        stockValue.toFixed(2)
      ])
    ];
    const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n");
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="midr-inventory-${new Date().toISOString().slice(0, 10)}.csv"`
      }
    });
  } catch (error) {
    return handleApiError(error);
  }
}
