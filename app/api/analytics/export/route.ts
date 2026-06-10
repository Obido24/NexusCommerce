import { type NextRequest } from "next/server";
import { handleApiError, rateLimit, requireRole } from "@/lib/api";
import { getAnalyticsReport } from "@/lib/store";

function csvCell(value: string | number) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, 20);
    await requireRole(request, ["ADMIN"]);
    const report = getAnalyticsReport();
    const rows = [
      ["Metric", "Value"],
      ["Total Revenue", report.totalRevenue.toFixed(2)],
      ["Average Order Value", report.averageOrderValue.toFixed(2)],
      ["Paid Order Rate", `${report.paidOrderRate}%`],
      ["Inventory Value", report.inventoryValue.toFixed(2)],
      ["Low Stock Items", report.lowStockCount],
      [],
      ["Category", "Revenue", "Units"],
      ...report.categoryRevenue.map((item) => [item.category, item.revenue.toFixed(2), item.units]),
      [],
      ["Payment Provider", "Orders", "Revenue"],
      ...report.paymentBreakdown.map((item) => [item.provider, item.orders, item.revenue.toFixed(2)])
    ];
    const csv = rows.map((row) => row.map((value) => csvCell(value ?? "")).join(",")).join("\n");
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="midr-analytics-${new Date().toISOString().slice(0, 10)}.csv"`
      }
    });
  } catch (error) {
    return handleApiError(error);
  }
}
