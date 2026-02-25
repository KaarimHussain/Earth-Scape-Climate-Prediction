"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, RefreshCw } from "lucide-react";

const facts = [
    "The ocean absorbs about 30% of carbon dioxide produced by humans, buffering the impacts of global warming.",
    "The 10 warmest years on record have all occurred since 2010.",
    "Switching to LED lights can save up to 80% more energy than traditional bulbs.",
    "A single tree can absorb up to 48 pounds of carbon dioxide per year.",
    "Antarctica loses about 150 billion tons of ice mass annually.",
    "Data centers currently account for about 2% of global greenhouse gas emissions, similar to the aviation industry.",
    "Renewable energy sources grew at their fastest rate in two decades in 2023."
];

export default function ClimateTrivia() {
    const [index, setIndex] = useState(0);

    const nextFact = () => {
        setIndex((prev) => (prev + 1) % facts.length);
    };

    useEffect(() => {
        const timer = setInterval(nextFact, 10000); // Auto-rotate every 10s
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-gradient-to-r from-teal-900/40 to-emerald-900/40 border border-teal-500/30 p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition">
                <button onClick={nextFact} className="text-teal-300 hover:text-white transition">
                    <RefreshCw size={16} />
                </button>
            </div>

            <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="text-yellow-400" />
                <h3 className="text-xl text-white font-bold">Did You Know?</h3>
            </div>

            <AnimatePresence mode="wait">
                <motion.p
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="text-white/90 text-lg font-light italic leading-relaxed min-h-[80px]"
                >
                    "{facts[index]}"
                </motion.p>
            </AnimatePresence>

            <div className="flex gap-1 mt-2">
                {facts.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${i === index ? 'bg-teal-400' : 'bg-white/10'}`}
                    />
                ))}
            </div>
        </div>
    );
}
