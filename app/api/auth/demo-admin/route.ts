import { NextResponse, type NextRequest } from "next/server";
import { createSessionToken, publicUser, SESSION_COOKIE_NAME, sessionCookieOptions } from "@/lib/auth";
import { handleApiError, jsonError, jsonOk, rateLimit } from "@/lib/api";
import { store } from "@/lib/store";

async function createDemoAdminResponse(request: NextRequest, asRedirect: boolean) {
  rateLimit(request, 40);
  const admin = store.users.find((user) => user.role === "ADMIN");
  if (!admin) return jsonError("Demo admin account is not available", 404);

  const token = await createSessionToken(publicUser(admin));
  const response = asRedirect ? NextResponse.redirect(new URL("/admin", request.url)) : jsonOk({ user: publicUser(admin) });
  response.cookies.set(SESSION_COOKIE_NAME, token, sessionCookieOptions());
  return response;
}

export async function GET(request: NextRequest) {
  try {
    return createDemoAdminResponse(request, true);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    return createDemoAdminResponse(request, false);
  } catch (error) {
    return handleApiError(error);
  }
}
