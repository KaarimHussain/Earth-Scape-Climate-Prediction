import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

const loginSchema = z.object({
    identifier: z.string().min(1, "Username or Email is required"),
    password: z.string().min(1, "Password is required"),
});

// JWT Secret - ensure this is in .env in production
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_only_for_dev";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Input Validation
        const validation = loginSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { message: "Validation failed", errors: validation.error.format() },
                { status: 400 }
            );
        }

        const { identifier, password } = validation.data;

        await dbConnect();

        // Find user by email OR username
        // Using $or allows users to login with either
        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }],
        });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password!);

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email, username: user.username },
            JWT_SECRET,
            { expiresIn: "7d" } // 7 day expiration
        );

        // Return success with token
        const userResponse = user.toObject();
        delete userResponse.password;

        return NextResponse.json(
            {
                message: "Login successful",
                token,
                user: userResponse,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Login error:", error);
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}
