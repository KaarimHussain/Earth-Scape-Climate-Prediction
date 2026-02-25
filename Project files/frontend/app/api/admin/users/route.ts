import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

// Ensure auth check
async function checkAuth() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");
    if (!token) throw new Error("Unauthorized");
}

export async function GET() {
    try {
        await checkAuth();
        await dbConnect();

        // Fetch all users, excluding passwords
        const users = await User.find({}).select("-password").sort({ createdAt: -1 });

        return NextResponse.json(users);
    } catch (error: any) {
        if (error.message === "Unauthorized") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await checkAuth();
        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            return NextResponse.json({ message: "Missing fields" }, { status: 400 });
        }

        await dbConnect();

        // Check availability
        const existing = await User.findOne({ $or: [{ email }, { username }] });
        if (existing) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            provider: "email"
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error: any) {
        if (error.message === "Unauthorized") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
    }
}
