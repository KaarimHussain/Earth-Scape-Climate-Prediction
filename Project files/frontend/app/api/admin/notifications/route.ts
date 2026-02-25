import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import NotificationModel from "@/models/Notification";
import { cookies } from "next/headers";
import nodemailer from "nodemailer";
import { getAdminAlertEmail } from "@/lib/email-templates";

// Auth check
async function checkAuth() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");
    if (!token) throw new Error("Unauthorized");
}

export async function POST(req: NextRequest) {
    try {
        await checkAuth();
        const { message, priority } = await req.json();

        if (!message || !priority) {
            return NextResponse.json({ message: "Missing content" }, { status: 400 });
        }

        await dbConnect();

        // Map priority to type
        let type = "info";
        if (priority === "high") type = "danger";
        if (priority === "medium") type = "warning";

        // Save to Database
        await NotificationModel.create({
            title: `System Alert: ${priority.toUpperCase()}`,
            message,
            type,
            readBy: []
        });

        // Fetch all users with email provider (or all who have emails)
        const users = await User.find({ email: { $exists: true, $ne: null } }).select("email"); // Optimized select

        if (users.length === 0) {
            return NextResponse.json({ message: "No users found" });
        }

        // Setup Transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const emailHtml = getAdminAlertEmail(message, priority);

        // Background Processing Simulation for Vercel/Node:
        // We will send the response immediately but trigger the async operation.
        // in a real serverless env like Vercel, `waitUntil` is needed, but for standard node/dev:

        const sendPromise = Promise.allSettled(
            users.map(user =>
                transporter.sendMail({
                    from: `"EarthScape Admin" <${process.env.SMTP_FROM_EMAIL}>`,
                    to: user.email,
                    subject: `System Alert: ${priority.toUpperCase()} Priority`,
                    html: emailHtml,
                })
            )
        );

        // NOTE: In production serverless (Vercel), you MUST await this or use `waitUntil`.
        // For the sake of this demo ensuring it completes, we will await it but
        // in a real "background service" architecture, this would go to a queue.
        // To simulate the "background" feel for the user, frontend shows "Processing" UI.

        const results = await sendPromise;
        const successCount = results.filter(r => r.status === "fulfilled").length;
        const failCount = results.filter(r => r.status === "rejected").length;

        return NextResponse.json({
            message: "Broadcast completed",
            stats: { total: users.length, sent: successCount, failed: failCount }
        });

    } catch (error: any) {
        if (error.message === "Unauthorized") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
    }
}
