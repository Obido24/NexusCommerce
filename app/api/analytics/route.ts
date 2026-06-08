import { type NextRequest } from "next/server";
import { getDashboardStats } from "@/lib/store";
import { handleApiError, jsonOk, rateLimit, requireRole } from "@/lib/api";

export async function GET(request: NextRequest) {
  try {
    rateLimit(request);
    await requireRole(request, ["ADMIN"]);
    return jsonOk({ stats: getDashboardStats() });
  } catch (error) {
    return handleApiError(error);
  }
}
