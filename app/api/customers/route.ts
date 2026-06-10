import { type NextRequest } from "next/server";
import { handleApiError, jsonOk, rateLimit, requireRole } from "@/lib/api";
import { getCustomerProfile, store } from "@/lib/store";

export async function GET(request: NextRequest) {
  try {
    rateLimit(request);
    await requireRole(request, ["ADMIN"]);
    const customers = store.users
      .filter((user) => user.role === "CUSTOMER")
      .map(({ passwordHash: _passwordHash, ...user }) => ({
        ...user,
        orders: store.orders.filter((order) => order.userId === user.id),
        lifetimeValue: getCustomerProfile(user.id)?.lifetimeValue ?? 0
      }));
    return jsonOk({ customers });
  } catch (error) {
    return handleApiError(error);
  }
}
