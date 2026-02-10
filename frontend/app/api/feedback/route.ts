import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Feedback from "@/models/Feedback";
import nodemailer from "nodemailer";
import { getFeedbackConfirmationEmail } from "@/lib/email-templates";

export async function POST(req: NextRequest) {
    try {
        const { name, email, message, rating } = await req.json();

        // 1. Validation
        if (!name || !email || !message || !rating) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        // 2. Connect to DB and Save
        await dbConnect();
        const newFeedback = await Feedback.create({
            name,
            email,
            message,
            rating,
        });

        // 3. Send Email via Nodemailer
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_FROM_EMAIL || '"EarthScape Support" <no-reply@earthscape.com>',
            to: email,
            subject: "We received your feedback!",
            text: `Hi ${name},\n\nThank you for your feedback!\n\nWe appreciate you taking the time to share your thoughts with us.\n\nYour Rating: ${rating}/5\nMessage: ${message}\n\nBest regards,\nThe EarthScape Team`,
            html: getFeedbackConfirmationEmail(name, message, rating),
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.error("Failed to send email:", emailError);
            // Don't fail the request if email fails, just log it. 
        }

        return NextResponse.json(
            { message: "Feedback submitted successfully", data: newFeedback },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("Feedback submission error:", error);
        return NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}
