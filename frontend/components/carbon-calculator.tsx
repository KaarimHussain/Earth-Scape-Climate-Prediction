"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function CarbonCalculator() {
    const [transport, setTransport] = useState(10); // km/day
    const [diet, setDiet] = useState("omnivore");
    const [energy, setEnergy] = useState("avg");

    // Crude estimation methodology
    const calculateFootprint = () => {
        let base = 0;

        // Transport: avg 120g CO2/km
        base += transport * 0.12 * 365;

        // Diet
        if (diet === "omnivore") base += 2500; // kg CO2/year
        if (diet === "vegetarian") base += 1700;
        if (diet === "vegan") base += 1500;

        // Energy
        if (energy === "high") base += 4000;
        if (energy === "avg") base += 2500;
        if (energy === "green") base += 500;

        return (base / 1000).toFixed(1); // tonnes
    };

    const footprint = calculateFootprint();

    return (
        <div className="bg-black/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md mt-6">
            <h3 className="text-xl text-white font-bold mb-4">Carbon Footprint Estimator 👣</h3>

            <div className="space-y-4">
                <div>
                    <label className="text-white/60 text-sm block mb-2">Daily Commute (km)</label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={transport}
                        onChange={(e) => setTransport(Number(e.target.value))}
                        className="w-full accent-primary h-2 bg-white/20 rounded-lg cursor-pointer"
                    />
                    <div className="text-right text-white font-mono text-sm">{transport} km</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-white/60 text-sm block mb-2">Diet</label>
                        <select
                            value={diet}
                            onChange={(e) => setDiet(e.target.value)}
                            className="w-full bg-white/10 border border-white/10 rounded-lg p-2 text-white text-sm focus:outline-none"
                        >
                            <option value="omnivore" className="text-black">Meat Eater</option>
                            <option value="vegetarian" className="text-black">Vegetarian</option>
                            <option value="vegan" className="text-black">Vegan</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-white/60 text-sm block mb-2">Home Energy</label>
                        <select
                            value={energy}
                            onChange={(e) => setEnergy(e.target.value)}
                            className="w-full bg-white/10 border border-white/10 rounded-lg p-2 text-white text-sm focus:outline-none"
                        >
                            <option value="high" className="text-black">High Usage</option>
                            <option value="avg" className="text-black">Average</option>
                            <option value="green" className="text-black">Green Energy</option>
                        </select>
                    </div>
                </div>
            </div>

            <motion.div
                key={footprint}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="mt-6 text-center p-4 bg-white/5 rounded-lg border border-white/5"
            >
                <p className="text-white/60 text-sm">Estimated Annual Footprint</p>
                <h4 className={`text-3xl font-bold mt-1 ${Number(footprint) > 5 ? 'text-red-400' : 'text-green-400'}`}>
                    {footprint} Tonnes CO₂
                </h4>
                <p className="text-xs text-white/40 mt-2">Global Average: ~4.5 Tonnes</p>
            </motion.div>
        </div>
    );
}
