import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import NotificationModel from "@/models/Notification";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

async function getUserId(request: NextRequest) {
    const cookieStore = await cookies();
    let token = cookieStore.get("token")?.value;

    if (!token) {
        const authHeader = request.headers.get("Authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }
    }

    if (!token) return null;
    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");

        // Handle different payload structures
        return decoded.id || decoded.sub || decoded.user_id;
    } catch (e) {
        return null;
    }
}

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export async function POST(req: NextRequest, { params }: Props) {
    try {
        const userId = await getUserId(req);
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        await dbConnect();

        // Add user ID to readBy array if not already present
        await NotificationModel.findByIdAndUpdate(id, {
            $addToSet: { readBy: userId }
        });

        return NextResponse.json({ message: "Marked as read" });
    } catch (error: any) {
        return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
    }
}
