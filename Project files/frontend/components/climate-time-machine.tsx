"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ClimateTimeMachineProps {
    currentTemp: number;
}

export default function ClimateTimeMachine({ currentTemp }: ClimateTimeMachineProps) {
    const [year, setYear] = useState(new Date().getFullYear());
    const currentYear = new Date().getFullYear();
    // Simple projection: +0.03°C per year (hypothetical warming rate)
    const warmingRate = 0.03;

    const projectedTemp = currentTemp + (year - currentYear) * warmingRate;
    const increase = projectedTemp - currentTemp;

    return (
        <div className="bg-black/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md mt-6">
            <h3 className="text-xl text-white font-bold mb-2">Climate Time Machine ⏳</h3>
            <p className="text-white/60 text-sm mb-6">
                Slide to see how global warming could affect this location's temperature over the coming decades.
            </p>

            <div className="mb-8 text-center">
                <span className="text-6xl font-thin text-white">{projectedTemp.toFixed(1)}°C</span>
                <div className="text-sm mt-2">
                    <span className="text-white/50">In Year </span>
                    <span className="text-primary font-bold text-lg">{year}</span>
                </div>
                {year > currentYear && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400 text-xs mt-1 font-mono"
                    >
                        +{increase.toFixed(2)}°C increase
                    </motion.div>
                )}
            </div>

            <div className="relative pt-1">
                <input
                    type="range"
                    min={currentYear}
                    max={currentYear + 50}
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-white/40 mt-2 font-mono">
                    <span>{currentYear}</span>
                    <span>{currentYear + 25}</span>
                    <span>{currentYear + 50}</span>
                </div>
            </div>
        </div>
    );
}
