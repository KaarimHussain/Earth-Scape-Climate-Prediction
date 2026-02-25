"use client";
import { motion } from "framer-motion";

interface HeaderProps {
    title: string;
    titleClass?: string;
    bigTitle?: string;
    bigTitleClass?: string;
    subtitle?: React.ReactNode;
    subtitleClass?: string;
}

export default function Header({ title, subtitle, bigTitle, bigTitleClass, titleClass, subtitleClass }: HeaderProps) {
    return (
        <div className="container mx-auto px-5 sm:px-10 md:px-15 lg:px-18 xl:px-20">
            <div className="relative">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className={`${bigTitleClass} font-ahsing uppercase absolute top-0 left-1/2 transform -translate-x-1/2 select-none text-primary/25 text-7xl sm:text-9xl md:text-[10rem] leading-none md:leading-0 whitespace-nowrap`}
                >
                    {bigTitle}
                </motion.h1>
                <div className="flex flex-col items-center justify-center gap-3 sm:gap-5 z-10 relative pt-12 sm:pt-20 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className={`text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white ${titleClass}`}
                    >
                        {title}
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className={`text-base sm:text-lg md:text-xl text-white/70 max-w-3xl ${subtitleClass}`}
                    >
                        {subtitle}
                    </motion.div>
                </div>
            </div>

        </div>
    )
}