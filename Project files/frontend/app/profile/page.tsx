"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/navbar";
import { motion } from "framer-motion";
import { User, Mail, ShieldCheck } from "lucide-react";
import Footer from "@/components/footer";

export default function ProfilePage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/auth/login");
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-black text-white font-sans">
            <Navbar />
            <div className="container mx-auto px-5 pt-32 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                        <div className="flex items-center gap-6 mb-8 border-b border-white/10 pb-8">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                                <span className="text-3xl font-bold text-white">
                                    {user.username.charAt(0).toUpperCase()}

                                </span>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">{user.username}</h1>
                                <p className="text-white/60">Climate Enthusiast</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                                    <User className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-white/40 uppercase tracking-wider font-bold">Username</p>
                                    <p className="text-lg font-medium">{user.username}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-white/40 uppercase tracking-wider font-bold">Email</p>
                                    <p className="text-lg font-medium">{user.email || "Not provided"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-white/40 uppercase tracking-wider font-bold">Account ID</p>
                                    <p className="text-sm font-mono text-white/60">{user._id}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
}
