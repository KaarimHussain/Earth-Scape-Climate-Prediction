"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import api from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCircle, AlertTriangle, Info } from "lucide-react";
import Footer from "@/components/footer";

interface Notification {
    id: number;
    title: string;
    message: string;
    type: "info" | "warning" | "danger";
    timestamp: string;
    read: boolean;
}

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await api.get("/notifications");
            setNotifications(res.data);
        } catch (err) {
            console.error("Failed to fetch notifications", err);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id: number) => {
        try {
            await api.post(`/notifications/${id}/read`);
            setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
        } catch (err) {
            console.error(err);
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case "danger": return <AlertTriangle className="text-red-500" />;
            case "warning": return <AlertTriangle className="text-yellow-500" />;
            default: return <Info className="text-blue-500" />;
        }
    };

    return (
        <div className="min-h-screen relative overflow-x-hidden font-sans bg-[#050505] bg-secondary">
            <Navbar />

            <div className="container mx-auto px-5 pt-40 pb-20 relative z-10 flex flex-col items-center min-h-screen">
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-6xl md:text-7xl lg:text-9xl font-medium tracking-tight text-white leading-none drop-shadow-2xl font-ahsing">
                        ALERTS
                    </h1>
                    <span className="block text-xl md:text-3xl font-light text-white/60 mt-4 tracking-[0.2em] uppercase font-sans">
                        System Notifications
                    </span>
                </motion.div>

                <div className="w-full max-w-4xl px-4">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-16 h-16 border-4 border-white/10 border-t-cyan-500 rounded-full animate-spin mb-6" />
                            <p className="text-white/40 tracking-widest uppercase text-sm">Retrieving Signals...</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <AnimatePresence>
                                {notifications.map((note, idx) => (
                                    <motion.div
                                        key={note.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className={`group relative p-6 rounded-3xl border transition-all duration-300 overflow-hidden ${note.read
                                            ? "bg-white/5 border-white/5 opacity-50 hover:opacity-100"
                                            : "bg-[#0F0F0F] border-white/10 hover:border-white/20 shadow-lg hover:shadow-cyan-500/5"
                                            }`}
                                    >
                                        <div className={`absolute top-0 left-0 w-1 h-full opacity-60 transition-all group-hover:opacity-100 ${note.type === "danger" ? "bg-red-500" :
                                            note.type === "warning" ? "bg-amber-500" : "bg-cyan-500"
                                            }`} />

                                        <div className="flex items-start gap-6">
                                            <div className={`p-3 rounded-2xl flex-shrink-0 ${note.type === "danger" ? "bg-red-500/10 text-red-500" :
                                                note.type === "warning" ? "bg-amber-500/10 text-amber-500" : "bg-cyan-500/10 text-cyan-500"
                                                }`}>
                                                {getIcon(note.type)}
                                            </div>

                                            <div className="flex-1 pt-1">
                                                <div className="flex justify-between items-start">
                                                    <h3 className={`font-medium text-lg leading-tight ${note.read ? "text-white/60" : "text-white"}`}>
                                                        {note.title}
                                                    </h3>
                                                    <span className="text-white/20 text-xs font-mono tracking-widest whitespace-nowrap ml-4">
                                                        {new Date(note.timestamp).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-white/60 font-light mt-2 leading-relaxed max-w-2xl">{note.message}</p>
                                            </div>

                                            {!note.read && (
                                                <button
                                                    onClick={() => markAsRead(note.id)}
                                                    className="p-2 rounded-full text-white/20 hover:text-white hover:bg-white/10 transition-all"
                                                    title="Mark as read"
                                                >
                                                    <CheckCircle size={20} />
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {notifications.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="p-10 rounded-[2.5rem] bg-white/5 border border-white/5 text-center flex flex-col items-center justify-center min-h-[400px]"
                                >
                                    <div className="bg-white/5 p-6 rounded-full mb-6">
                                        <Bell className="w-8 h-8 text-white/20" />
                                    </div>
                                    <h3 className="text-xl text-white font-medium mb-2">All Systems Nominal</h3>
                                    <p className="text-white/40 font-light max-w-md">There are no active alerts or system notifications at this time.</p>
                                </motion.div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
