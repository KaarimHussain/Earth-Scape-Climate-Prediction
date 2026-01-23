"use client";

import { useState } from "react";
import { DashboardSidebar } from "./sidebar";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function DashboardShell({ children }: { children: React.ReactNode }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-background text-foreground dark font-sans">
            {/* Background Textures */}
            <div className="fixed inset-0 z-[-1] bg-background">
                <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                    }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />
            </div>

            {/* Desktop Sidebar - hidden on mobile */}
            <aside className="hidden lg:block w-64 fixed inset-y-0 z-30">
                <DashboardSidebar />
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 w-full z-40 h-16 bg-background/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4">
                <span className="font-ahsing text-xl">Aerith</span>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <Menu className="w-6 h-6" />
                </Button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            className="fixed inset-y-0 left-0 w-64 z-50 bg-background lg:hidden"
                        >
                            <div className="absolute top-4 right-4 z-50">
                                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>
                            <DashboardSidebar />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 lg:pl-64 pt-16 lg:pt-0 min-h-screen transition-all duration-300">
                <div className="h-full p-4 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
