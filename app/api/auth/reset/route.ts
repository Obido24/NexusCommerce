import { type NextRequest } from "next/server";
import { handleApiError, jsonOk, rateLimit } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, 8);
    const { email } = (await request.json()) as { email?: string };
    return jsonOk({
      email,
      message: "If an account exists, a password reset link has been prepared for delivery."
    });
  } catch (error) {
    return handleApiError(error);
  }
}
