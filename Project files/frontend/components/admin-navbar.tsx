"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, MessageSquare, Activity, LogOut, Menu, X, Users, Radio } from "lucide-react";

export default function AdminNavbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
    };

    const navItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Users", href: "/admin/users", icon: Users },
        { name: "Broadcast", href: "/admin/notifications", icon: Radio },
        { name: "Requests", href: "/admin/requests", icon: MessageSquare },
        { name: "System Analysis", href: "/admin/analytics", icon: Activity },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Brand */}
                <div className="flex items-center gap-3">
                    <h2 className="pb-3 font-ahsing text-6xl leading-none text-secondary-foreground">
                        AERIS
                    </h2>
                    <div className="h-5 w-px bg-zinc-500"></div>
                    <h3 className="font-light text-4xl leading-none text-secondary-foreground">
                        ADMIN
                    </h3>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="relative py-2 group"
                            >
                                <div className={`flex items-center gap-2 text-sm transition-colors ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white transition-colors'}`} />
                                    {item.name}
                                </div>
                                {isActive && (
                                    <motion.div
                                        layoutId="adminNavIndicator"
                                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
                                    />
                                )}
                            </Link>
                        );
                    })}

                    <div className="h-6 w-px bg-white/10" />

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-xs font-medium text-red-400 hover:text-red-300 transition-colors px-4 py-2 rounded-full border border-red-500/20 hover:bg-red-500/10 hover:border-red-500/40"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        Logout
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white/80 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#0a0a0a] border-b border-white/5 overflow-hidden"
                    >
                        <div className="px-6 py-8 space-y-4">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${isActive
                                            ? 'bg-white/10 border-white/10 text-white'
                                            : 'bg-transparent border-transparent text-white/60 hover:bg-white/5 hover:text-white'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="font-medium">{item.name}</span>
                                    </Link>
                                );
                            })}

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-4 p-4 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors mt-6"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="font-medium">Logout</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
