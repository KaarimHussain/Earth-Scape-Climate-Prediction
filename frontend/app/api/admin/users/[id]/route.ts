import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { cookies } from "next/headers";

async function checkAuth() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");
    if (!token) throw new Error("Unauthorized");
}

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export async function DELETE(req: NextRequest, { params }: Props) {
    try {
        await checkAuth();
        const { id } = await params; // await params in Next.js 15+

        await dbConnect();
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User deleted" });
    } catch (error: any) {
        if (error.message === "Unauthorized") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: Props) {
    try {
        await checkAuth();
        const { id } = await params;
        const body = await req.json();

        await dbConnect();
        const updatedUser = await User.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true
        }).select("-password");

        if (!updatedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(updatedUser);
    } catch (error: any) {
        if (error.message === "Unauthorized") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
    }
}
