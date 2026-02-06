"use client";

import { motion } from "framer-motion";
import { Leaf, Droplets, Wind, Sun, Umbrella } from "lucide-react";

interface EcoTipsProps {
    weatherMain: string;
    temp: number;
}

export default function EcoTips({ weatherMain, temp }: EcoTipsProps) {
    const getTip = () => {
        const condition = weatherMain.toLowerCase();

        if (temp > 30) return {
            icon: <Sun className="w-6 h-6 text-orange-400" />,
            title: "Heatwave Alert",
            tip: "High temperatures increase AC usage. Try closing curtains during the day to keep your home cool naturally and save energy."
        };

        if (condition.includes("rain")) return {
            icon: <Umbrella className="w-6 h-6 text-blue-400" />,
            title: "Rainy Day",
            tip: "Collect rainwater for your garden! It's better for plants than tap water and saves resources."
        };

        if (condition.includes("cloud")) return {
            icon: <Wind className="w-6 h-6 text-gray-400" />,
            title: "Overcast",
            tip: "Solar efficiency might be lower today. Unplug unused electronics to reduce phantom energy drain."
        };

        if (condition.includes("clear")) return {
            icon: <Leaf className="w-6 h-6 text-green-400" />,
            title: "Clear Skies",
            tip: "Great day for a walk or bike ride instead of driving. Reduce your carbon footprint!"
        };

        return {
            icon: <Droplets className="w-6 h-6 text-cyan-400" />,
            title: "Stay Sustainable",
            tip: "Every small action counts. Use reusable water bottles and bags to reduce plastic waste."
        };
    };

    const { icon, title, tip } = getTip();

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-primary/10 border border-primary/20 p-6 rounded-2xl backdrop-blur-md mt-6"
        >
            <div className="flex items-center gap-3 mb-3">
                {icon}
                <h3 className="text-xl text-white font-bold">{title}</h3>
            </div>
            <p className="text-white/80 leading-relaxed text-sm">
                {tip}
            </p>
        </motion.div>
    );
}
