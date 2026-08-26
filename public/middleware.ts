import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const auth = request.cookies.get("auth")?.value;
  const role = request.cookies.get("role")?.value;

  const isLoginPage = request.nextUrl.pathname === "/login";

  // 🔒 Not logged in → redirect to login
  if (!auth && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🚫 Prevent logged-in users from going back to login
  if (auth && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 🔐 Admin-only route example
  if (request.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Apply to all routes except static files
export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};