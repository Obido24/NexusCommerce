import { type NextRequest } from "next/server";
import { handleApiError, rateLimit, requireRole } from "@/lib/api";
import { getCustomerProfile, store } from "@/lib/store";

function csvCell(value: string | number | boolean | null) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, 20);
    await requireRole(request, ["ADMIN"]);
    const rows = [
      ["Name", "Email", "Phone", "Status", "Orders", "Lifetime Value", "Created At"],
      ...store.users
        .filter((user) => user.role === "CUSTOMER")
        .map((user) => {
          const profile = getCustomerProfile(user.id);
          return [
            user.name,
            user.email,
            user.phone ?? "",
            user.disabled ? "Disabled" : "Active",
            profile?.orders.length ?? 0,
            profile?.lifetimeValue ?? 0,
            user.createdAt
          ];
        })
    ];
    const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n");
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="midr-customers-${new Date().toISOString().slice(0, 10)}.csv"`
      }
    });
  } catch (error) {
    return handleApiError(error);
  }
}
