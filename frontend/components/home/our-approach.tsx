"use client";
import Header from "../header";
import { motion } from "framer-motion";
import { Database, Server, Cpu, BarChart } from "lucide-react";

export default function OurApproach() {

    // Aligned with Readme.md System Layers
    const steps = [
        {
            id: "01",
            title: "Data Ingestion",
            description: "Aggregating raw telemetry from satellites, weather stations, and IoT sensors via batch and real-time streams.",
            icon: <Database className="w-6 h-6 text-white" />
        },
        {
            id: "02",
            title: "Distributed Storage",
            description: "Secure, scalable containment of massive datasets using HDFS for raw files and MongoDB for high-speed retrieval.",
            icon: <Server className="w-6 h-6 text-white" />
        },
        {
            id: "03",
            title: "Big Data Processing",
            description: "Cleaning and aggregation pipelines powered by Hadoop MapReduce and Apache Spark for optimized analytics.",
            icon: <Cpu className="w-6 h-6 text-white" />
        },
        {
            id: "04",
            title: "ML & Visualization",
            description: "Predictive modeling with Python/TensorFlow and real-time interactive dashboards via Next.js.",
            icon: <BarChart className="w-6 h-6 text-white" />
        }
    ];

    return (
        <section className="min-h-screen w-full bg-secondary py-24 relative overflow-hidden">
            <Header
                bigTitle="Pipeline"
                title="System Architecture"
                titleClass="text-white font-light"
                subtitle={<p className="text-center text-white/60">From raw sensor ingestion to actionable intelligence.</p>}
            />

            <div className="container mx-auto px-5 sm:px-10 md:px-15 lg:px-18 xl:px-20 mt-24 relative z-10">
                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className="group relative"
                        >
                            <div className="relative z-10 flex flex-col gap-6 p-8 rounded-3xl bg-white/3 backdrop-blur-md border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-2 group-hover:shadow-[0_10px_40px_-10px_rgba(38,158,95,0.1)] h-full">

                                <div className="flex justify-between items-start">
                                    <span className="font-ahsing text-5xl text-white/20 group-hover:text-primary transition-colors duration-500">
                                        {step.id}
                                    </span>
                                    <div className="w-12 h-12 rounded-full bg-primary border border-secondary flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-[0_0_20px_rgba(38,158,95,0.4)]">
                                        {step.icon}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-light text-white mb-3 group-hover:text-primary transition-colors duration-300">
                                        {step.title}
                                    </h3>
                                    <p className="text-white/50 leading-relaxed text-sm group-hover:text-white/80 transition-colors duration-300">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}