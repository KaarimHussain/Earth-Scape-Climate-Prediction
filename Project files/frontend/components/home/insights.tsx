"use client";
import React from "react";
import Header from "../header";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const insights = [
    {
        category: "Research",
        date: "Oct 24, 2025",
        title: "The Methane Tipping Point: New Satellite Data Reveals Hidden leaks",
        image: "bg-gradient-to-br from-purple-900 to-indigo-900", // Fallback abstract
    },
    {
        category: "Technology",
        date: "Nov 02, 2025",
        title: "Optimizing Neural Networks for Hyper-Local Weather Prediction",
        image: "bg-gradient-to-br from-emerald-900 to-teal-900",
    },
    {
        category: "Policy",
        date: "Nov 15, 2025",
        title: "Global Resilience Index 2025: Examining the Data",
        image: "bg-gradient-to-br from-amber-900 to-orange-900",
    }
];

export default function Insights() {
    return (
        <section className="w-full bg-secondary py-20 pb-32 border-t border-white/5 relative">
            <div className="container mx-auto px-5 sm:px-10 md:px-15 lg:px-18 xl:px-20">

                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Latest Insights</h2>
                        <p className="text-white/60 max-w-xl">Deep dives into climate data, AI architectures, and planetary resilience.</p>
                    </div>
                    <Link href="/blog" className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300">
                        View Editorial
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {insights.map((post, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group cursor-pointer flex flex-col gap-4"
                        >
                            {/* Image Placeholder area */}
                            <div className={`w-full aspect-[4/3] rounded-2xl overflow-hidden relative ${post.image}`}>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur text-xs text-white border border-white/10">
                                        {post.category}
                                    </span>
                                </div>
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                        <ArrowUpRight className="w-5 h-5 text-black" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="text-xs text-white/40 font-mono">{post.date}</span>
                                <h3 className="text-xl text-white font-medium leading-normal group-hover:text-primary transition-colors duration-300">
                                    {post.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}
