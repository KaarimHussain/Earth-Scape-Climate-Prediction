"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Twitter, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";
import Logo from "./logo";

export default function Footer() {
    return (
        <footer className="relative w-full bg-secondary pt-20 overflow-hidden">
            {/* Background Gradient (Hero Style) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-radial from-primary/10 to-transparent opacity-50 blur-[100px]" />
            </div>

            <div className="container mx-auto px-5 sm:px-10 md:px-15 lg:px-18 xl:px-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-20">

                    {/* Brand & Newsletter */}
                    <div className="md:col-span-12 lg:col-span-5 flex flex-col justify-between">
                        <div>
                            <Logo variant="white" className="w-40 mb-8" />
                            <p className="text-white/60 max-w-sm text-lg leading-relaxed">
                                Decoding planetary systems to build a resilient future. We provide the intelligence needed for climate action.
                            </p>
                        </div>

                        <div className="mt-10">
                            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-4">Subscribe to Intelligence</h4>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 flex-1 transition-colors"
                                />
                                <button className="bg-white text-black rounded-full px-6 py-3 font-medium hover:bg-primary transition-colors duration-300">
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Links Column spacer */}
                    <div className="hidden lg:block lg:col-span-1" />

                    {/* Navigation Links */}
                    <div className="md:col-span-4 lg:col-span-2">
                        <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Platform</h4>
                        <ul className="space-y-4">
                            {['Solutions', 'Technology', 'Data Sources', 'API Access', 'Pricing'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-white/60 hover:text-primary transition-colors flex items-center gap-1 group">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-4 lg:col-span-2">
                        <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Company</h4>
                        <ul className="space-y-4">
                            {['About Us', 'Careers', 'Manifesto', 'Press', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-white/60 hover:text-primary transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-4 lg:col-span-2">
                        <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Socials</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Twitter', icon: <Twitter className="w-4 h-4" /> },
                                { name: 'LinkedIn', icon: <Linkedin className="w-4 h-4" /> },
                                { name: 'GitHub', icon: <Github className="w-4 h-4" /> },
                                { name: 'Instagram', icon: <Instagram className="w-4 h-4" /> }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link href="#" className="text-white/60 hover:text-white transition-colors flex items-center gap-2">
                                        {item.icon} {item.name} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Massive Branding */}
                <div className="relative border-t border-white/10 pt-10 pb-0 flex flex-col items-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="font-ahsing text-[20vw] leading-[0.8] text-center text-primary/25 select-none pointer-events-none"
                    >
                        AERIS
                    </motion.h1>

                    <div className="w-full flex justify-between items-center py-6 text-xs text-white/30 font-mono uppercase tracking-widest border-t border-white/5 mt-[-2vw] relative z-10 bg-secondary/50 backdrop-blur-sm">
                        <span>© 2026 EarthScape Inc.</span>
                        <div className="flex gap-6">
                            <span>Privacy Policy</span>
                            <span>Terms of Service</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
