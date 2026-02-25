import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            // Set a simple auth cookie
            (await cookies()).set("admin_token", "authenticated", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24, // 1 day
                path: "/",
            });

            return NextResponse.json({ message: "Login successful" });
        }

        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
