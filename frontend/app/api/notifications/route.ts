import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import NotificationModel from "@/models/Notification";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// Helper to get user ID from token
// Helper to get user ID from token
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
        return decoded.id; // Assuming token payload has 'id'
    } catch (e) {
        return null;
    }
}

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const userId = await getUserId(req);

        // Fetch recent notifications (limit 20)
        const notifications = await NotificationModel.find().sort({ createdAt: -1 }).limit(20);

        // Map to include 'read' status for current user
        const mappedNotifications = notifications.map(note => ({
            id: note._id,
            title: note.title,
            message: note.message,
            type: note.type,
            timestamp: note.createdAt,
            // If user is logged in, check if their ID is in readBy array
            read: userId ? note.readBy.includes(userId) : false
        }));

        return NextResponse.json(mappedNotifications);
    } catch (error: any) {
        return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
    }
}
