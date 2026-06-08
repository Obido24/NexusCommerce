import { NextResponse, type NextRequest } from "next/server";
import { ZodError, type ZodSchema } from "zod";
import { getSessionFromRequest } from "@/lib/auth";
import type { Role } from "@/lib/types";

const buckets = new Map<string, { count: number; resetAt: number }>();

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, data }, init);
}

export function jsonError(message: string, status = 400, details?: unknown) {
  return NextResponse.json({ ok: false, error: { message, details } }, { status });
}

export async function parseJson<T>(request: NextRequest, schema: ZodSchema<T>) {
  try {
    const payload = await request.json();
    return schema.parse(payload);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ApiError("Validation failed", 422, error.flatten());
    }
    throw error;
  }
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status = 400,
    public details?: unknown
  ) {
    super(message);
  }
}

export function handleApiError(error: unknown) {
  console.error("[api]", error);
  if (error instanceof ApiError) return jsonError(error.message, error.status, error.details);
  return jsonError("Unexpected server error", 500);
}

export function rateLimit(request: NextRequest, limit = 120, windowMs = 60_000) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const key = `${ip}:${request.nextUrl.pathname}`;
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }
  bucket.count += 1;
  if (bucket.count > limit) {
    throw new ApiError("Too many requests", 429);
  }
}

export async function requireRole(request: NextRequest, roles: Role[]) {
  const session = await getSessionFromRequest(request);
  if (!session) throw new ApiError("Authentication required", 401);
  if (!roles.includes(session.role)) throw new ApiError("Insufficient permissions", 403);
  return session;
}
