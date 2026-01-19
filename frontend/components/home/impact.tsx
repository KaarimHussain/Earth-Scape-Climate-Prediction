"use client";
import React, { useEffect, useRef } from "react";
import { motion, useInView, useSpring } from "framer-motion";

// Updated Stats based on Non-Functional Requirements (Requirements.md)
const stats = [
    { label: "Data Uptime Reliability", value: 99.9, suffix: "%", decimals: 1, format: false },
    { label: "Petabytes Processed", value: 15, suffix: "PB+", decimals: 0, format: false },
    { label: "Secure Data Sources", value: 450, suffix: "+", decimals: 0, format: false },
    { label: "Encryption Standard", value: 256, suffix: "-AES", decimals: 0, format: false },
];

// Special handling for non-numeric suffix like "-AES" might need tweaking, 
// but for now we treat 'value' as numeric for the spring.
// 256 is the numeric target.

function Counter({ value, decimals = 0, format = false }: { value: number, decimals?: number, format?: boolean }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const springValue = useSpring(0, { stiffness: 50, damping: 15, mass: 1 });

    useEffect(() => {
        if (inView) {
            springValue.set(value);
        }
    }, [inView, value, springValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                let text = latest.toFixed(decimals);
                if (format) {
                    if (latest > 1000000) {
                        text = (latest / 1000000000).toFixed(1) + "B";
                    }
                }
                ref.current.textContent = text;
            }
        });
    }, [springValue, decimals, format]);

    return <span ref={ref} />;
}

export default function Impact() {
    return (
        <section className="w-full bg-secondary py-24 border-t border-white/5 relative overflow-hidden">
            {/* Background Matrix/Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            <div className="container mx-auto px-5 sm:px-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center justify-center group ">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="relative text-center" // Center aligned text
                            >
                                <div className="flex items-baseline justify-center gap-1">
                                    <h3 className="text-5xl md:text-6xl font-ahsing text-white group-hover:text-primary transition-colors duration-500">
                                        <Counter value={stat.value} decimals={stat.decimals} format={stat.format} />
                                    </h3>
                                    <span className="text-3xl font-light text-primary">{stat.suffix}</span>
                                </div>
                                <p className="text-white/40 uppercase tracking-widest text-xs font-bold mt-2 border-t-2 border-transparent pt-2 group-hover:border-primary transition-all duration-500">
                                    {stat.label}
                                </p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
