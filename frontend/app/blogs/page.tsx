"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, User } from "lucide-react";
import Link from "next/link";

const BLOG_POSTS = [
    {
        id: 1,
        title: "The Future of Climate Prediction",
        excerpt: "How artificial intelligence is revolutionizing our ability to forecast long-term environmental changes.",
        category: "Technology",
        author: "Dr. Sarah Chen",
        date: "Oct 24, 2025",
        readTime: "5 min read",
        color: "from-blue-500/20 to-cyan-500/20"
    },
    {
        id: 2,
        title: "Understanding Carbon Footprints",
        excerpt: "A deep dive into individual impact and actionable steps towards a carbon-neutral lifestyle.",
        category: "Education",
        author: "Mark Johnson",
        date: "Nov 02, 2025",
        readTime: "4 min read",
        color: "from-emerald-500/20 to-green-500/20"
    },
    {
        id: 3,
        title: "Urban Heat Islands Explained",
        excerpt: "Why cities are getting hotter than rural areas and what urban planners are doing about it.",
        category: "Urban Planning",
        author: "Elena Rodriguez",
        date: "Nov 15, 2025",
        readTime: "6 min read",
        color: "from-orange-500/20 to-red-500/20"
    },
    {
        id: 4,
        title: "Ocean Currents and Weather Patterns",
        excerpt: "Exploring the intricate relationship between our oceans and global weather phenomena.",
        category: "Science",
        author: "David Kim",
        date: "Nov 28, 2025",
        readTime: "7 min read",
        color: "from-indigo-500/20 to-purple-500/20"
    },
    {
        id: 5,
        title: "Renewable Energy Trends 2026",
        excerpt: "What to expect in the solar and wind energy sectors in the coming year.",
        category: "Energy",
        author: "Sophie Martin",
        date: "Dec 05, 2025",
        readTime: "5 min read",
        color: "from-yellow-500/20 to-amber-500/20"
    },
    {
        id: 6,
        title: "AI in Disaster Response",
        excerpt: "Using machine learning to improve response times and resource allocation during natural disasters.",
        category: "Innovation",
        author: "James Wilson",
        date: "Dec 12, 2025",
        readTime: "4 min read",
        color: "from-pink-500/20 to-rose-500/20"
    }
];

export default function BlogsPage() {
    return (
        <div className="min-h-screen relative overflow-x-hidden font-sans bg-secondary text-white">
            <Navbar />

            {/* Header */}
            <div className="relative pt-40 pb-12 px-6 container mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-6xl md:text-8xl font-ahsing mb-6 drop-shadow-2xl">
                        Insights
                    </h1>
                    <p className="text-xl text-white/60 font-light max-w-2xl mx-auto">
                        Stories, analysis, and news from the forefront of climate science and technology.
                    </p>
                </motion.div>
            </div>

            {/* Blog Grid */}
            <div className="container mx-auto px-6 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BLOG_POSTS.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative bg-[#0A0A0A] border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-white/5"
                        >
                            {/* Card Header/Image Placeholder */}
                            <div className={`h-48 w-full bg-gradient-to-br ${post.color} relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/10 uppercase tracking-wide text-white/80">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <div className="flex items-center gap-4 text-xs text-white/40 mb-4 font-mono">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        <span>{post.date}</span>
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-white/20" />
                                    <span>{post.readTime}</span>
                                </div>

                                <h3 className="text-2xl font-bold mb-3 leading-tight group-hover:text-emerald-400 transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/50">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-medium text-white/70">{post.author}</span>
                                    </div>

                                    <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-white group-hover:text-black transition-all">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <button className="px-8 py-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-colors text-sm font-medium uppercase tracking-widest">
                        Load More Articles
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
}
