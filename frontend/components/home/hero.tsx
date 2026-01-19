"use client";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground selection:bg-primary/30">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                    }}
                />

                {/* Subtle Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />

                {/* Circle Gradient Orb (Reverted to Original) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-0 left-0 h-screen w-screen hero-bg"
                />
            </div>

            {/* Main Content */}
            <div className="container relative mx-auto px-4 z-20 text-center">
                <div className="max-w-4xl mx-auto space-y-8">

                    {/* Badge/Pill */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex justify-center"
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-medium tracking-wide">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Next-Gen Climate Intelligence
                        </span>
                    </motion.div>

                    {/* Headings */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-medium tracking-tight text-white leading-none font-ahsing drop-shadow-2xl">
                            AERIS
                        </h1>
                        <span className="block text-2xl md:text-4xl lg:text-5xl font-light text-white/80 mt-2 tracking-[0.2em] uppercase font-sans drop-shadow-lg">
                            Planetary Intelligence
                        </span>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-lg md:text-2xl text-white max-w-2xl mx-auto leading-relaxed font-light mt-8"
                    >
                        A scalable, secure, and intelligent platform for large-scale climate data analysis using Big Data technologies.
                    </motion.p>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="w-px h-16 bg-linear-to-b from-transparent via-muted-foreground/50 to-transparent relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-transparent to-primary animate-scroll-down"></div>
                </div>
            </motion.div>
        </section>
    )
}