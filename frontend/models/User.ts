import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password?: string;
    provider: string; // "email", "google", etc.
    createdAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            validate: {
                validator: function (v: string) {
                    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: "Please enter a valid email address",
            },
        },
        password: {
            type: String,
            required: function (this: IUser) {
                return this.provider === "email";
            },
        },
        provider: {
            type: String,
            default: "email",
        },
    },
    {
        timestamps: true,
    }
);

// Prevent re-compilation of model
const User: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
