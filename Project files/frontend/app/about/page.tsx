"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Leaf, Users, Zap } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen relative overflow-x-hidden font-sans bg-secondary text-white">
            <Navbar />

            {/* Hero Section */}
            <div className="relative pt-40 pb-20 px-6 container mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-6xl md:text-8xl font-ahsing mb-6 drop-shadow-2xl">
                        Our Mission
                    </h1>
                    <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed">
                        Pioneering planetary intelligence to decode our changing climate and empower a sustainable future.
                    </p>
                </motion.div>

                {/* Abstract Background Element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
            </div>

            {/* Values Section */}
            <div className="py-20 bg-white/5 relative border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: <Globe className="w-10 h-10 text-emerald-400" />,
                                title: "Global Impact",
                                description: "Monitoring climate patterns across continents to provide actionable insights for everyone, everywhere."
                            },
                            {
                                icon: <Zap className="w-10 h-10 text-cyan-400" />,
                                title: "AI-Driven Accuracy",
                                description: "Leveraging state-of-the-art machine learning models to predict environmental changes with unprecedented precision."
                            },
                            {
                                icon: <Users className="w-10 h-10 text-purple-400" />,
                                title: "Community First",
                                description: "Building a network of climate-conscious individuals and organizations committed to making a difference."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors"
                            >
                                <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                <p className="text-white/60 leading-relaxed font-light">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Story Section */}
            <div className="py-32 container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2"
                    >
                        <h2 className="text-4xl md:text-5xl mb-8 font-bold">
                            Bridging Technology <br /> <span className="text-white/40">and Nature</span>
                        </h2>
                        <div className="space-y-6 text-lg text-white/70 font-light">
                            <p>
                                EarthScape was born from a simple yet powerful idea: what if we could use the world's most advanced technology to save the world itself?
                            </p>
                            <p>
                                Founded by a diverse team of data scientists, environmentalists, and dreamers, we are dedicated to closing the gap between climate data and human action. By adhering to rigorous scientific standards while embracing cutting-edge AI, we aim to make climate prediction accessible, understandable, and actionable.
                            </p>
                            <p>
                                We believe that understanding is the first step towards preservation.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 relative h-[500px]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 rounded-[3rem] rotate-3 blur-sm" />
                        <div className="absolute inset-0 bg-black border border-white/10 rounded-[3rem] overflow-hidden flex items-center justify-center">
                            {/* Placeholder for an image - using abstract gradient for now */}
                            <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black opacity-80" />
                            <Leaf className="w-40 h-40 text-white/10 absolute" />
                            <p className="relative z-10 text-white/30 text-sm tracking-widest uppercase text-center px-10">
                                [Team / Innovation Image Placeholder]
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* CTA */}
            <div className="py-20 text-center container mx-auto px-6 mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-white/10 rounded-[3rem] p-16 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">Join the Movement</h2>
                    <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto relative z-10 font-light">
                        Be part of the solution. Sign up today to access exclusive climate insights and join a community dedicated to change.
                    </p>
                    <a href="/auth/register" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-200 transition-colors relative z-10">
                        Get Started <ArrowRight className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
}
