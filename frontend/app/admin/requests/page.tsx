import AdminNavbar from "@/components/admin-navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Mail, Star, Calendar } from "lucide-react";
import { format } from "date-fns";
import Feedback from "@/models/Feedback";
import dbConnect from "@/lib/db";

// Force dynamic to prevent caching issues with auth
export const dynamic = "force-dynamic";

async function getFeedbacks() {
    try {
        await dbConnect();
        // Direct DB access since we are server-side and authenticated via page check
        const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(feedbacks));
    } catch (error) {
        console.error("Failed to fetch feedbacks:", error);
        return [];
    }
}

export default async function AdminRequests() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");

    if (!token) {
        redirect("/admin/login");
    }

    const feedbacks = await getFeedbacks();

    return (
        <div className="min-h-screen bg-secondary font-sans selection:bg-emerald-500/30">
            <AdminNavbar />

            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] opacity-20" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] opacity-20" />
            </div>

            <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 mb-3 tracking-tight font-serif italic">
                            User Requests
                        </h1>
                        <p className="text-white/60 text-lg font-light">
                            Managing <span className="text-white font-medium">{feedbacks.length}</span> feedback submissions.
                        </p>
                    </div>
                </div>

                <div className="grid gap-4">
                    {feedbacks.length === 0 ? (
                        <div className="p-16 text-center border border-white/5 rounded-[2rem] bg-[#0F0F0F]/60 backdrop-blur-xl flex flex-col items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                <Mail className="w-6 h-6 text-white/20" />
                            </div>
                            <h3 className="text-white font-medium text-lg mb-2">No messages yet</h3>
                            <p className="text-white/40 text-sm max-w-sm">
                                Your inbox is empty. New contact form submissions will appear here.
                            </p>
                        </div>
                    ) : (
                        feedbacks.map((item: any) => (
                            <div
                                key={item._id}
                                className="p-6 md:p-8 rounded-[2rem] bg-[#0F0F0F]/80 backdrop-blur-md border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all duration-300 group"
                            >
                                <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/5 flex items-center justify-center text-white font-bold text-sm">
                                                {item.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="text-white font-medium text-lg leading-tight group-hover:text-blue-200 transition-colors">
                                                    {item.name}
                                                </h3>
                                                <div className="flex items-center gap-2 text-white/40 text-xs">
                                                    <Mail className="w-3 h-3" />
                                                    {item.email}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pl-13 md:pl-0">
                                            <div className="relative">
                                                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/10 rounded-full" />
                                                <p className="pl-4 text-white/80 leading-relaxed font-light text-lg italic">
                                                    "{item.message}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-2 min-w-[150px] border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6 w-full md:w-auto mt-2 md:mt-0 justify-between md:justify-start">
                                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                            <span className="text-sm text-white font-mono font-medium">{item.rating}</span>
                                            <span className="text-xs text-white/40">/5</span>
                                        </div>

                                        <div className="text-right">
                                            <div className="flex items-center gap-2 text-white/40 text-xs justify-end">
                                                <Calendar className="w-3 h-3" />
                                                {item.createdAt ? format(new Date(item.createdAt), "MMM d, yyyy") : "N/A"}
                                            </div>
                                            <div className="text-white/20 text-[10px] font-mono mt-1">
                                                {item.createdAt ? format(new Date(item.createdAt), "h:mm a") : ""}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
