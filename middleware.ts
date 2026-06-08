import { jwtVerify } from "jose";
import { NextResponse, type NextRequest } from "next/server";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET ?? "development-secret-change-me");

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) return NextResponse.next();

  const token = request.cookies.get("nexus_session")?.value;
  if (!token) return NextResponse.redirect(new URL("/login", request.url));

  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== "ADMIN") return NextResponse.redirect(new URL("/account", request.url));
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"]
};
