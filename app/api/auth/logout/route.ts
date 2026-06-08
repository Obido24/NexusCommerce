import { type NextRequest } from "next/server";
import { clearSessionCookieOptions, SESSION_COOKIE_NAME } from "@/lib/auth";
import { jsonOk, rateLimit } from "@/lib/api";

export async function POST(request: NextRequest) {
  rateLimit(request, 40);
  const response = jsonOk({ signedOut: true });
  response.cookies.set(SESSION_COOKIE_NAME, "", clearSessionCookieOptions());
  return response;
}
