"use client";

import { useState } from "react";
import AdminNavbar from "@/components/admin-navbar";
import { Bell, Send, AlertTriangle, CheckCircle, Info, Radio } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminNotifications() {
    const [message, setMessage] = useState("");
    const [priority, setPriority] = useState("low");
    const [status, setStatus] = useState<"idle" | "processing" | "completed" | "error">("idle");
    const [resultStats, setResultStats] = useState<{ total: number; sent: number; failed: number } | null>(null);

    const handleBroadcast = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("processing");
        setResultStats(null);

        try {
            const res = await fetch("/api/admin/notifications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message, priority }),
            });

            const data = await res.json();

            if (res.ok) {
                setResultStats(data.stats);
                setStatus("completed");
                setMessage("");
            } else {
                setStatus("error");
            }
        } catch (err) {
            setStatus("error");
        }
    };

    return (
        <div className="min-h-screen bg-secondary font-sans selection:bg-emerald-500/30">
            <AdminNavbar />

            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/05 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/05 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 mb-3 tracking-tight font-serif italic">
                            System Alerts
                        </h1>
                        <p className="text-white/60 text-lg font-light">
                            Broadcast notifications to all registered users.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Composer Card */}
                        <div className="rounded-[2.5rem] bg-[#0F0F0F]/80 backdrop-blur-xl border border-white/5 p-8 relative overflow-hidden">
                            <form onSubmit={handleBroadcast} className="relative z-10 space-y-6">
                                <div>
                                    <label className="block text-white/40 text-xs font-bold uppercase tracking-widest mb-3">Priority Level</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { id: 'low', label: 'Low', color: 'bg-emerald-500' },
                                            { id: 'medium', label: 'Medium', color: 'bg-amber-500' },
                                            { id: 'high', label: 'High', color: 'bg-red-500' }
                                        ].map((level) => (
                                            <button
                                                key={level.id}
                                                type="button"
                                                onClick={() => setPriority(level.id)}
                                                className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all flex items-center justify-center gap-2 ${priority === level.id
                                                        ? 'bg-white/10 border-white/20 text-white'
                                                        : 'bg-white/5 border-transparent text-white/40 hover:bg-white/10'
                                                    }`}
                                            >
                                                <div className={`w-2 h-2 rounded-full ${level.color} ${priority === level.id ? 'animate-pulse' : ''}`} />
                                                {level.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white/40 text-xs font-bold uppercase tracking-widest mb-3">Message Content</label>
                                    <textarea
                                        required
                                        rows={6}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type your alert message here..."
                                        className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 resize-none transition-colors"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'processing'}
                                    className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    <Send className="w-4 h-4" />
                                    {status === 'processing' ? 'Broadcasting...' : 'Send Broadcast'}
                                </button>
                            </form>
                        </div>

                        {/* Status / Sonar Panel */}
                        <div className="relative">
                            <div className="h-full rounded-[2.5rem] bg-[#0F0F0F]/60 backdrop-blur-md border border-white/5 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[400px]">

                                {status === 'idle' && (
                                    <>
                                        <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 text-white/20">
                                            <Radio className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-white font-medium text-xl mb-2">Ready to Transmit</h3>
                                        <p className="text-white/40 text-sm max-w-xs">
                                            Select a priority and compose your message to alert all users.
                                        </p>
                                    </>
                                )}

                                {status === 'processing' && (
                                    <div className="relative flex items-center justify-center">
                                        {/* Sonar Effect */}
                                        <motion.div
                                            initial={{ opacity: 0.5, scale: 0.5 }}
                                            animate={{ opacity: 0, scale: 2.5 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                            className="absolute w-32 h-32 rounded-full border border-emerald-500/50"
                                        />
                                        <motion.div
                                            initial={{ opacity: 0.5, scale: 0.5 }}
                                            animate={{ opacity: 0, scale: 2 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                                            className="absolute w-32 h-32 rounded-full border border-emerald-500/30"
                                        />

                                        <div className="relative z-10 bg-emerald-500/10 w-24 h-24 rounded-full flex items-center justify-center text-emerald-500 border border-emerald-500/20 backdrop-blur-sm">
                                            <Radio className="w-10 h-10 animate-pulse" />
                                        </div>

                                        <div className="absolute top-32 w-full text-center">
                                            <h3 className="text-white font-medium text-lg mb-1">Broadcasting</h3>
                                            <p className="text-white/40 text-xs">Processing user queue...</p>
                                        </div>
                                    </div>
                                )}

                                {status === 'completed' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center"
                                    >
                                        <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-500 border border-emerald-500/20 mx-auto">
                                            <CheckCircle className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-white font-medium text-xl mb-2">Transmission Complete</h3>
                                        <div className="flex items-center justify-center gap-4 mt-6">
                                            <div className="text-center px-4 py-2 rounded-lg bg-white/5 border border-white/5">
                                                <div className="text-2xl font-bold text-white">{resultStats?.total || 0}</div>
                                                <div className="text-[10px] uppercase tracking-widest text-white/40">Targeted</div>
                                            </div>
                                            <div className="text-center px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                                <div className="text-2xl font-bold text-emerald-400">{resultStats?.sent || 0}</div>
                                                <div className="text-[10px] uppercase tracking-widest text-emerald-400/60">Delivered</div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setStatus('idle')}
                                            className="mt-8 text-white/40 hover:text-white text-sm flex items-center justify-center gap-2 mx-auto transition-colors"
                                        >
                                            Send Another
                                        </button>
                                    </motion.div>
                                )}

                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center mb-6 text-red-500 border border-red-500/20 mx-auto">
                                            <AlertTriangle className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-white font-medium text-xl mb-2">Transmission Failed</h3>
                                        <p className="text-white/40 text-sm max-w-xs mb-6">
                                            Something went wrong while connecting to the backend service.
                                        </p>
                                        <button
                                            onClick={() => setStatus('idle')}
                                            className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full text-sm transition-colors"
                                        >
                                            Try Again
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
