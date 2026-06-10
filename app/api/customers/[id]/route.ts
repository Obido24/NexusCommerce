import { type NextRequest } from "next/server";
import { handleApiError, jsonError, jsonOk, parseJson, rateLimit, requireRole } from "@/lib/api";
import { getCustomerProfile, updateCustomerDisabled } from "@/lib/store";
import { customerStatusSchema } from "@/lib/validators";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    rateLimit(request);
    await requireRole(request, ["ADMIN"]);
    const { id } = await params;
    const profile = getCustomerProfile(id);
    if (!profile) return jsonError("Customer not found", 404);
    const { passwordHash: _passwordHash, ...user } = profile.user;
    return jsonOk({ customer: { ...profile, user } });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    rateLimit(request, 60);
    await requireRole(request, ["ADMIN"]);
    const { id } = await params;
    const input = await parseJson(request, customerStatusSchema);
    const user = updateCustomerDisabled(id, input.disabled);
    if (!user) return jsonError("Customer not found", 404);
    const { passwordHash: _passwordHash, ...safeUser } = user;
    return jsonOk({ user: safeUser });
  } catch (error) {
    return handleApiError(error);
  }
}
