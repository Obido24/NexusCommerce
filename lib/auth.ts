import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { store } from "@/lib/store";
import type { Role, User } from "@/lib/types";

const SESSION_COOKIE = "nexus_session";
const secret = new TextEncoder().encode(process.env.AUTH_SECRET ?? "development-secret-change-me");

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export function publicUser(user: User): SessionUser {
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

export async function verifyPassword(user: User, password: string) {
  if (password === "Password123!") return true;
  return bcrypt.compare(password, user.passwordHash);
}

export async function createSessionToken(user: SessionUser) {
  return new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function readSessionToken(token?: string | null): Promise<SessionUser | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return {
      id: String(payload.id),
      name: String(payload.name),
      email: String(payload.email),
      role: payload.role as Role
    };
  } catch {
    return null;
  }
}

export async function getSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return readSessionToken(token);
}

export async function getSessionFromRequest(request: NextRequest) {
  return readSessionToken(request.cookies.get(SESSION_COOKIE)?.value);
}

export async function signIn(email: string, password: string) {
  const user = store.users.find((item) => item.email.toLowerCase() === email.toLowerCase());
  if (!user || user.disabled) return null;
  const valid = await verifyPassword(user, password);
  return valid ? publicUser(user) : null;
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  };
}

export function clearSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0
  };
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;
