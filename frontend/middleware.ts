
import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Secret keys (must match those used in signing)
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_only_for_dev";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // --- 1. Admin Route Protection ---
    if (pathname.startsWith("/admin")) {
        // Exception: Allow access to admin login page
        if (pathname === "/admin/login") {
            // If already logged in as admin, redirect to admin dashboard
            const adminToken = request.cookies.get("admin_token")?.value;
            if (adminToken === "authenticated") { // Simple check as per login route
                return NextResponse.redirect(new URL("/admin/dashboard", request.url));
            }
            return NextResponse.next();
        }

        // Check for admin token for other admin routes
        const adminToken = request.cookies.get("admin_token")?.value;

        // Validate admin token (the login route sets it to "authenticated")
        if (!adminToken || adminToken !== "authenticated") {
            // Redirect to admin login
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        return NextResponse.next();
    }

    // --- 2. User Route Protection (Dashboard, Profile, etc.) ---
    // Define protected user routes
    // Blogs and About are typically public
    const protectedRoutes = ["/profile", "/analysis", "/predict", "/notifications", "/feedback"];

    // Check if current path matches any protected route
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    if (isProtectedRoute) {
        const token = request.cookies.get("token")?.value;

        if (!token) {
            // Redirect to login if no token found
            const loginUrl = new URL("/auth/login", request.url);
            loginUrl.searchParams.set("callbackUrl", pathname); // Optional: for redirecting back after login
            return NextResponse.redirect(loginUrl);
        }

        try {
            // Verify the token
            const secret = new TextEncoder().encode(JWT_SECRET);
            await jwtVerify(token, secret);
            // Valid token (allow access)
            return NextResponse.next();
        } catch (error) {
            // Invalid token
            console.error("Middleware: Invalid user token", error);
            // Clear cookie and redirect
            const response = NextResponse.redirect(new URL("/auth/login", request.url));
            response.cookies.delete("token");
            return response;
        }
    }

    // --- 3. Redirect Authenticated Users from Auth Pages ---
    const authRoutes = ["/auth/login", "/auth/register"];
    if (authRoutes.some(route => pathname.startsWith(route))) {
        const token = request.cookies.get("token")?.value;
        if (token) {
            try {
                const secret = new TextEncoder().encode(JWT_SECRET);
                await jwtVerify(token, secret);
                // If valid, redirect to profile (landing base for users)
                return NextResponse.redirect(new URL("/profile", request.url));
            } catch (error) {
                // If token matches but is invalid, allow access to login (middleware will basically ignore it)
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes - handled separately or let them pass to be handled by route handlers)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - assets (public assets)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
    ],
};
