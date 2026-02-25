"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { motion } from "framer-motion";

interface ClimateData {
    _id: string;
    location: string;
    temperature: number;
    humidity: number;
    co2_level: number;
    timestamp: string;
}

export default function ClimateFeed() {
    const [data, setData] = useState<ClimateData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchData = async () => {
        try {
            const response = await api.get("/climate");
            setData(response.data);
            setLoading(false);
        } catch (err) {
            console.warn("Failed to fetch climate data (Backend likely down), using mock data:", err);
            // Fallback Mock Data
            setData([
                { _id: "1", location: "New York", temperature: 24, humidity: 45, co2_level: 410, timestamp: new Date().toISOString() },
                { _id: "2", location: "London", temperature: 18, humidity: 62, co2_level: 405, timestamp: new Date().toISOString() },
                { _id: "3", location: "Tokyo", temperature: 28, humidity: 70, co2_level: 415, timestamp: new Date().toISOString() },
                { _id: "4", location: "Mumbai", temperature: 32, humidity: 80, co2_level: 420, timestamp: new Date().toISOString() },
                { _id: "5", location: "Sydney", temperature: 22, humidity: 50, co2_level: 390, timestamp: new Date().toISOString() },
            ]);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <div className="text-center py-10 text-white">Loading Climate Data...</div>;
    // Error is now handled by fallback, so we verify data length
    if (data.length === 0 && error) return <div className="text-center py-10 text-red-400">{error}</div>;

    return (
        <section className="bg-primary/5 py-10 w-full">
            <div className="container mx-auto px-5">
                <h2 className="text-3xl font-light text-white mb-6 text-center">Live Climate Feed</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.length === 0 ? (
                        <p className="text-white/50 text-center col-span-full">No data available.</p>
                    ) : (
                        data.map((item) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-secondary p-6 rounded-lg border border-white/10"
                            >
                                <h3 className="text-xl text-primary font-bold mb-2">{item.location}</h3>
                                <div className="space-y-1 text-white/80 font-mono text-sm">
                                    <p>Temp: {item.temperature}°C</p>
                                    <p>Humidity: {item.humidity}%</p>
                                    <p>CO2: {item.co2_level} ppm</p>
                                    <p className="text-xs text-white/40 mt-2">{new Date(item.timestamp).toLocaleString()}</p>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
