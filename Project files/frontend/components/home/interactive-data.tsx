"use client";
import { useState, useEffect } from "react";
import Header from "../header";
import { motion } from "framer-motion";
import { Cpu, HardDrive, Wifi } from "lucide-react";

export default function InteractiveData() {
    const [activeRegion, setActiveRegion] = useState(0);

    // Regions now represent Data Ingestion Nodes
    const nodes = [
        { name: "Sat-Sentinel-1A", metric: "500 TB", status: "INGESTING", type: "Orbital" },
        { name: "Ground-Station-Alpha", metric: "12ms Latency", status: "ONLINE", type: "Terrestrial" },
        { name: "Ocean-Buoy-Array", metric: "98% Uptime", status: "ACTIVE", type: "Marine" },
        { name: "HDFS-NameNode-01", metric: "Safe Mode: OFF", status: "HEALTHY", type: "Storage" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveRegion((prev) => (prev + 1) % nodes.length);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="min-h-screen w-full bg-secondary py-20 relative overflow-hidden flex flex-col items-center">

            <Header
                bigTitle="Monitor"
                title="System Status"
                titleClass="text-white font-light"
                subtitle={<p className="text-center text-white/60">Real-time telemetry of the EarthScape analytics cluster.</p>}
            />

            <div className="container mx-auto px-5 sm:px-10 mt-16 relative z-10 w-full max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center h-[600px]">

                    {/* Left Data Column */}
                    <div className="hidden lg:flex flex-col gap-6 items-end text-right">
                        {nodes.map((node, idx) => (
                            <motion.div
                                key={idx}
                                animate={{
                                    opacity: activeRegion === idx ? 1 : 0.3,
                                    x: activeRegion === idx ? 0 : -20
                                }}
                                className="cursor-pointer group"
                                onClick={() => setActiveRegion(idx)}
                            >
                                <h4 className="text-xl font-light text-white group-hover:text-primary transition-colors">{node.name}</h4>
                                <div className="text-xs font-mono text-white/40">{node.type} Node</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Center: The Neural Core */}
                    <div className="relative h-full w-full flex items-center justify-center">
                        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center">

                            {/* Inner Pulsing Core */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute w-32 h-32 rounded-full bg-primary/20 blur-[50px] z-0"
                            />

                            {/* Rotating Rings (Pure Code) */}
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                                    transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
                                    className="absolute rounded-full border border-white/10"
                                    style={{
                                        width: `${60 + i * 20}%`,
                                        height: `${60 + i * 20}%`,
                                        borderStyle: i === 1 ? 'dashed' : 'solid'
                                    }}
                                >
                                    {/* Data Points on Rings */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_var(--primary)]" />
                                </motion.div>
                            ))}

                            {/* Center Status */}
                            <div className="relative z-10 text-center tracking-widest">
                                <motion.div
                                    key={activeRegion}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col items-center"
                                >
                                    <Wifi className="w-12 h-12 text-primary mb-4 animate-pulse" />
                                    <h2 className="text-4xl md:text-5xl font-ahsing text-white whitespace-nowrap">
                                        {nodes[activeRegion].metric}
                                    </h2>
                                    <div className="text-xs font-mono text-primary mt-2 uppercase">
                                        State: {nodes[activeRegion].status}
                                    </div>
                                </motion.div>
                            </div>

                        </div>
                    </div>

                    {/* Right Info Column */}
                    <div className="hidden lg:flex flex-col gap-6">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl w-full max-w-xs">
                            <div className="flex items-center gap-3 mb-4 text-white/50 text-sm uppercase tracking-wide">
                                <HardDrive className="w-4 h-4" /> HDFS Storage
                            </div>
                            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    animate={{ width: ["40%", "70%", "50%"] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="h-full bg-primary"
                                />
                            </div>
                            <div className="flex justify-between mt-2 text-xs font-mono text-white/80">
                                <span>Write I/O</span>
                                <span>3.2 GB/s</span>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl w-full max-w-xs">
                            <div className="flex items-center gap-3 mb-4 text-white/50 text-sm uppercase tracking-wide">
                                <Cpu className="w-4 h-4" /> Spark Jobs
                            </div>
                            <div className="grid grid-cols-5 gap-1 h-8">
                                {[...Array(10)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ opacity: [0.2, 1, 0.2] }}
                                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                                        className="bg-primary/50 rounded-sm"
                                    />
                                ))}
                            </div>
                            <div className="mt-2 text-xs font-mono text-white/80">
                                Active Nodes: 24/24
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
}
