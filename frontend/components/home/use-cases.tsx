"use client";
import React from "react";
import Header from "../header";
import { motion } from "framer-motion";
import { Building2, Landmark, Users2, ArrowRight } from "lucide-react";

const useCases = [
    {
        title: "Governments",
        description: "National climate risk modeling for infrastructure planning and disaster mitigation.",
        icon: <Landmark className="w-10 h-10 text-white" />,
        tags: ["Public Policy", "Urban Planning", "Defense"],
        color: "bg-blue-500"
    },
    {
        title: "Corporations",
        description: "Supply chain resilience analysis and TCFD compliance reporting for Fortune 500s.",
        icon: <Building2 className="w-10 h-10 text-white" />,
        tags: ["Supply Chain", "ESG Reporting", "Risk Mgmt"],
        color: "bg-emerald-500"
    },
    {
        title: "NGOs",
        description: "Data-driven resource allocation for humanitarian aid in climate-vulnerable regions.",
        icon: <Users2 className="w-10 h-10 text-white" />,
        tags: ["Aid Delivery", "Impact Assessment", "Advocacy"],
        color: "bg-amber-500"
    }
];

export default function UseCases() {
    return (
        <section className="min-h-screen w-full bg-secondary py-20 relative overflow-hidden flex flex-col justify-center">
            <Header
                bigTitle="Sectors"
                title="Who We Serve"
                titleClass="text-white font-light"
                subtitle={<p className="text-center text-white/60">Tailored intelligence for key global stakeholders.</p>}
            />

            <div className="container mx-auto px-5 sm:px-10 mt-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {useCases.map((useCase, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            whileHover={{ y: -10 }}
                            className="group relative h-[400px] bg-white/[0.02] border border-white/5 hover:border-white/20 rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden transition-all duration-500"
                        >
                            {/* Hover Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-${useCase.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                            <div className={`absolute top-0 right-0 w-32 h-32 ${useCase.color} blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full pointer-events-none`} />

                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                    {useCase.icon}
                                </div>
                                <h3 className="text-3xl font-light text-white mb-4">{useCase.title}</h3>
                                <p className="text-white/60 leading-relaxed">
                                    {useCase.description}
                                </p>
                            </div>

                            <div className="relative z-10">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {useCase.tags.map((tag, i) => (
                                        <span key={i} className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border border-white/10 text-white/40 group-hover:border-white/20 group-hover:text-white/70 transition-all">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                                    View Case Study <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
