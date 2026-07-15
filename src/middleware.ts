import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hasPermission } from "@/modules/permissions/services/permissions";
import type { Role, Permission } from "@/modules/permissions/types";

const TOKEN_NAME = "session_token";

interface RouteGuard {
  path: string;
  exact?: boolean;
  permission?: Permission;
  roles?: Role[];
}

const ROUTE_GUARDS: RouteGuard[] = [
  { path: "/admin/dashboard", permission: "dashboard:view" },
  { path: "/admin/dashboard/enquiries", permission: "enquiries:list" },
  { path: "/admin/dashboard/applications", permission: "representatives:list" },
  { path: "/admin/dashboard/settings", permission: "settings:view" },
];

function getTokenPayload(token: string): { role?: Role; exp?: number } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    return JSON.parse(atob(parts[1]));
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  if (pathname.startsWith("/admin") || pathname.startsWith("/representatives/dashboard")) {
    const token = request.cookies.get(TOKEN_NAME)?.value || request.cookies.get("admin_token")?.value;

    if (!token) {
      const loginUrl = new URL(pathname.startsWith("/admin") ? "/admin" : "/representatives/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const payload = getTokenPayload(token);
    if (!payload || (payload.exp && payload.exp * 1000 < Date.now())) {
      const loginUrl = new URL(pathname.startsWith("/admin") ? "/admin" : "/representatives/login", request.url);
      const res = NextResponse.redirect(loginUrl);
      res.cookies.delete(TOKEN_NAME);
      res.cookies.delete("admin_token");
      return res;
    }

    const role = payload.role ?? "admin";

    for (const guard of ROUTE_GUARDS) {
      const matches = guard.exact ? pathname === guard.path : pathname.startsWith(guard.path);
      if (matches) {
        if (guard.permission && !hasPermission(role, guard.permission)) {
          return NextResponse.redirect(new URL("/admin/dashboard", request.url));
        }
        if (guard.roles && !guard.roles.includes(role)) {
          return NextResponse.redirect(new URL("/admin/dashboard", request.url));
        }
      }
    }
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/representatives/dashboard/:path*"],
};
