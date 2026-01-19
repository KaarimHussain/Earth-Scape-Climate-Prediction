"use client";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Circle Gradient Orb */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-0 left-0 h-screen w-screen hero-bg"
            />

            {/* Content */}
            <div className="container mx-auto px-4 text-center z-10 max-w-5xl mb-20">
                <motion.h1
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-black "
                >
                    <span className="hover:font-extrabold font-light transition-all duration-300 ease-in-out">EARTHSCAPE</span> CLIMATE ANALYTICS SYSTEM
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                    className="text-base md:text-xl text-white max-w-2xl mx-auto mt-6"
                >
                    A scalable, secure, and intelligent platform for large-scale climate data analysis using Big Data technologies.
                </motion.p>
            </div>
        </section>
    )
}