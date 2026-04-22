import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const pathname = req.nextUrl.pathname;

    const publicRoutes = ["login", "register"];
    const protectedRoutes = ["dashboard", "settings", "todos"];

    const isPublicRoute = publicRoutes.some((route) =>
        pathname.startsWith(`/${route}`)
    );

    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(`/${route}`)
    );

    // 🔓 Public routes
    if (isPublicRoute) {
        if (token) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
        return NextResponse.next();
    }

    // 🔒 Protected routes
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|favicon.ico).*)"],
};