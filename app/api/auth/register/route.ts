import bcrypt from "bcryptjs";
import { type NextRequest } from "next/server";
import { createSessionToken, publicUser, SESSION_COOKIE_NAME, sessionCookieOptions } from "@/lib/auth";
import { handleApiError, jsonError, jsonOk, parseJson, rateLimit } from "@/lib/api";
import { store } from "@/lib/store";
import { registerSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, 10);
    const input = await parseJson(request, registerSchema);
    if (store.users.some((user) => user.email.toLowerCase() === input.email.toLowerCase())) {
      return jsonError("An account already exists for this email", 409);
    }
    const user = {
      id: `usr_${Date.now()}`,
      name: input.name,
      email: input.email,
      passwordHash: await bcrypt.hash(input.password, 12),
      role: "CUSTOMER" as const,
      createdAt: new Date().toISOString()
    };
    store.users.push(user);
    const sessionUser = publicUser(user);
    const token = await createSessionToken(sessionUser);
    const response = jsonOk({ user: sessionUser }, { status: 201 });
    response.cookies.set(SESSION_COOKIE_NAME, token, sessionCookieOptions());
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
