"use client";
import React, { useState } from "react";
import Header from "../header";
import { motion, AnimatePresence } from "framer-motion";
import { Database, ShieldCheck, Cpu, Activity, ArrowRight, Plus, Minus } from "lucide-react";

// Updated Features based on Project Requirements (README.md)
const features = [
    {
        id: "01",
        title: "Distributed Data Storage",
        shortDesc: "Scalable HDFS Integration",
        description: "Built on Hadoop HDFS to securely store massive datasets from satellites, weather stations, and sensors in a distributed environment, ensuring redundancy and high availability.",
        icon: <Database className="w-full h-full text-white/80" />,
        gradient: "from-[#37E248]/30 via-emerald-500/10 to-transparent",
        bg: "bg-[#37E248]"
    },
    {
        id: "02",
        title: "Hybrid Processing Engine",
        shortDesc: "Real-time & Batch Analysis",
        description: "Leverages Apache Spark and MapReduce for efficient batch processing of historical data, while handling real-time streams for immediate anomaly detection.",
        icon: <Cpu className="w-full h-full text-blue-400/80" />,
        gradient: "from-blue-500/30 via-cyan-500/10 to-transparent",
        bg: "bg-blue-500"
    },
    {
        id: "03",
        title: "ML Anomaly Detection",
        shortDesc: "Proactive Alerting Systems",
        description: "Integrated Scikit-learn and TensorFlow models continuously analyze sensor inputs to detect environmental anomalies and trigger automated system alerts.",
        icon: <Activity className="w-full h-full text-amber-400/80" />,
        gradient: "from-amber-500/30 via-orange-500/10 to-transparent",
        bg: "bg-amber-500"
    },
    {
        id: "04",
        title: "Secure Enterprise Core",
        shortDesc: "End-to-End Encryption",
        description: "Features robust JWT authentication, role-based access control (RBAC), and full data encryption to ensure compliance with global data security standards.",
        icon: <ShieldCheck className="w-full h-full text-purple-400/80" />,
        gradient: "from-purple-500/30 via-pink-500/10 to-transparent",
        bg: "bg-purple-500"
    }
];

export default function Features() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section className="min-h-screen w-full bg-secondary py-20 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full" />
                <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full" />
            </div>

            <Header
                bigTitle="Capabilities"
                title="Technical Specifications"
                titleClass="text-white font-light"
                subtitle={<p className="text-center text-white/60">Engineered for performance, security, and scalability.</p>}
            />

            <div className="container mx-auto px-5 sm:px-10 md:px-15 lg:px-18 xl:px-20 mt-20 relative z-10">
                <div className="flex flex-col gap-4">
                    {features.map((feature, index) => {
                        const isOpen = activeIndex === index;
                        return (
                            <motion.div
                                key={index}
                                initial={false}
                                onClick={() => setActiveIndex(isOpen ? null : index)}
                                className={`group relative border border-white/5 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ${isOpen ? 'bg-white/[0.03]' : 'bg-transparent hover:bg-white/[0.01]'}`}
                            >
                                {/* Header Row */}
                                <div className="p-6 md:p-10 flex items-center justify-between relative z-10 w-full">
                                    <div className="flex items-center gap-6 md:gap-10 overflow-hidden">
                                        <span className={`font-ahsing text-3xl md:text-5xl transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-white/20 group-hover:text-white/40'}`}>
                                            {feature.id}
                                        </span>
                                        <div>
                                            <h3 className={`text-xl md:text-3xl font-light transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                                                {feature.title}
                                            </h3>
                                            {!isOpen && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="hidden md:block text-white/40 text-sm mt-1"
                                                >
                                                    {feature.shortDesc}
                                                </motion.p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Toggle Icon */}
                                    <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-white/10 rotate-180' : 'bg-transparent group-hover:bg-white/5'}`}>
                                        {isOpen ? <Minus className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5 text-white/50" />}
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                                        >
                                            <div className="px-6 pb-10 md:px-10 md:pb-14 pt-2">
                                                <div className="h-[1px] w-full bg-white/5 mb-8" />

                                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                                                    {/* Text Content */}
                                                    <div className="lg:col-span-7 space-y-6">
                                                        <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
                                                            {feature.description}
                                                        </p>
                                                        <div className="flex items-center gap-4 text-sm font-medium text-white/40 uppercase tracking-widest">
                                                            <div className={`w-2 h-2 rounded-full ${feature.bg}`} />
                                                            System Status: Active
                                                        </div>
                                                        <button className="flex items-center gap-3 text-white uppercase tracking-widest text-xs font-bold mt-4 group/btn">
                                                            View Documentation
                                                            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all duration-300">
                                                                <ArrowRight className="w-4 h-4" />
                                                            </div>
                                                        </button>
                                                    </div>

                                                    {/* Visual */}
                                                    <div className="lg:col-span-5 relative h-[300px] w-full rounded-2xl overflow-hidden border border-white/10 bg-black/20 flex items-center justify-center">
                                                        {/* Background Gradient */}
                                                        <div className={`absolute inset-0 bg-gradient-radial ${feature.gradient} opacity-40 blur-xl`} />

                                                        {/* Icon Container */}
                                                        <div className="w-32 h-32 relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                                            {feature.icon}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
