"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 overflow-hidden relative font-sans">
            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 text-center max-w-2xl px-6"
            >
                {/* 404 Glitch Effect Text */}
                <motion.h1
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/20 tracking-tighter mb-4 select-none relative"
                >
                    404
                    <span className="absolute inset-0 text-emerald-500/20 blur-sm translate-x-1 translate-y-1 -z-10">404</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest">
                        <AlertTriangle className="w-3 h-3" />
                        Signal Lost
                    </div>

                    <h2 className="text-3xl md:text-4xl font-medium text-white/90">
                        Coordinate Not Found
                    </h2>

                    <p className="text-white/40 text-lg max-w-md mx-auto leading-relaxed">
                        The requested data point resides outside the observable network. Please recalibrate your navigation.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                        <Link
                            href="/"
                            className="group relative px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-900/20"
                        >
                            <span className="flex items-center gap-2">
                                <Home className="w-4 h-4" />
                                Return to Mission Control
                            </span>
                            <div className="absolute inset-0 rounded-xl bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>

                        <Link
                            href="/feedback"
                            className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Contact Support
                        </Link>
                    </div>
                </motion.div>
            </motion.div>

            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] pointer-events-none" />
        </div>
    );
}
