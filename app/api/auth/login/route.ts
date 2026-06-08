import { NextResponse, type NextRequest } from "next/server";
import { createSessionToken, SESSION_COOKIE_NAME, sessionCookieOptions, signIn } from "@/lib/auth";
import { handleApiError, jsonError, jsonOk, parseJson, rateLimit } from "@/lib/api";
import { loginSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, 20);
    const credentials = await parseJson(request, loginSchema);
    const user = await signIn(credentials.email, credentials.password);
    if (!user) return jsonError("Invalid email or password", 401);
    const token = await createSessionToken(user);
    const response = jsonOk({ user });
    response.cookies.set(SESSION_COOKIE_NAME, token, sessionCookieOptions());
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
