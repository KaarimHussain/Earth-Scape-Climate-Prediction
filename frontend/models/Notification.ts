import mongoose, { Schema, Document, Model } from "mongoose";

export interface INotification extends Document {
    title: string;
    message: string;
    type: "info" | "warning" | "danger" | "success";
    createdAt: Date;
    readBy: string[]; // Array of User IDs who have read this notification
}

const NotificationSchema = new Schema<INotification>(
    {
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["info", "warning", "danger", "success"],
            default: "info",
        },
        readBy: [{
            type: String, // Storing User IDs as strings for simplicity
        }],
    },
    {
        timestamps: true,
    }
);

const Notification: Model<INotification> =
    mongoose.models.Notification || mongoose.model<INotification>("Notification", NotificationSchema);

export default Notification;
