import { type NextRequest } from "next/server";
import { getAnalyticsReport } from "@/lib/store";
import { handleApiError, jsonOk, rateLimit, requireRole } from "@/lib/api";

export async function GET(request: NextRequest) {
  try {
    rateLimit(request);
    await requireRole(request, ["ADMIN"]);
    return jsonOk({ stats: getAnalyticsReport() });
  } catch (error) {
    return handleApiError(error);
  }
}
