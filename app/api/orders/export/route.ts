import { type NextRequest } from "next/server";
import { handleApiError, rateLimit, requireRole } from "@/lib/api";
import { store } from "@/lib/store";

function csvCell(value: string | number) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, 20);
    await requireRole(request, ["ADMIN"]);
    const rows = [
      ["Order Number", "Customer", "Email", "Status", "Payment", "Items", "Subtotal", "Tax", "Shipping", "Discount", "Total", "Created At"],
      ...store.orders.map((order) => [
        order.orderNumber,
        order.customerName,
        order.customerEmail,
        order.status,
        order.paymentProvider,
        order.items.map((item) => `${item.quantity}x ${item.name}`).join("; "),
        order.subtotal,
        order.tax,
        order.shipping,
        order.discount,
        order.total,
        order.createdAt
      ])
    ];
    const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n");
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="midr-orders-${new Date().toISOString().slice(0, 10)}.csv"`
      }
    });
  } catch (error) {
    return handleApiError(error);
  }
}
