import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters").max(20),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Input Validation
        const validation = registerSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { message: "Validation failed", errors: validation.error.format() },
                { status: 400 }
            );
        }

        const { username, email, password } = validation.data;

        await dbConnect();

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            if (existingUser.email === email) {
                return NextResponse.json(
                    { message: "User with this email already exists" },
                    { status: 409 }
                );
            }
            if (existingUser.username === username) {
                return NextResponse.json(
                    { message: "Username is already taken" },
                    { status: 409 }
                );
            }
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            provider: "email",
        });

        // Remove password from response
        const userResponse = newUser.toObject();
        delete userResponse.password;

        return NextResponse.json(
            { message: "User registered successfully", user: userResponse },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}
