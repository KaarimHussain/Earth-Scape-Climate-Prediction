"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import { getCorrelationMatrix, getHistoricalData } from "@/lib/api";
import { motion } from "framer-motion";
import InteractiveChart from "@/components/interactive-chart";
import AnalysisExport from "@/components/analysis-export";
import AnalysisInsights from "@/components/analysis-insights";
import Footer from "@/components/footer";

export default function AnalysisPage() {
    const [correlationImg, setCorrelationImg] = useState("");
    const [histData, setHistData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Filter State
    const [selectedCity, setSelectedCity] = useState("Karachi");
    const [selectedCountry, setSelectedCountry] = useState("Pakistan");
    const [startDate, setStartDate] = useState("2024-01-01");
    const [endDate, setEndDate] = useState("2024-12-31");

    const fetchData = async () => {
        setLoading(true);
        try {
            const [corrRes, histRes] = await Promise.all([
                getCorrelationMatrix(selectedCity, selectedCountry),
                getHistoricalData(selectedCity, selectedCountry, startDate, endDate)
            ]);

            if (corrRes.data && corrRes.data.image) setCorrelationImg(corrRes.data.image);
            if (histRes.data && histRes.data.data) setHistData(histRes.data.data);
        } catch (error) {
            console.error("Failed to fetch analytics data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-screen relative overflow-x-hidden font-sans bg-[#050505] bg-secondary">
            <Navbar />

            <div className="container mx-auto px-5 pt-40 pb-20 relative z-10 flex flex-col items-center min-h-screen">
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-6xl md:text-7xl lg:text-9xl font-medium tracking-tight text-white leading-none drop-shadow-2xl font-ahsing">
                        ANALYTICS
                    </h1>
                    <span className="block text-xl md:text-3xl font-light text-white/60 mt-4 tracking-[0.2em] uppercase font-sans">
                        Data Visualization
                    </span>
                </motion.div>

                {/* Filter Controls */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-2xl p-4 mb-16 flex flex-wrap gap-4 items-end backdrop-blur-md z-20"
                >
                    <div className="flex-1 min-w-[200px]">
                        <label className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2 block">Location</label>
                        <select
                            value={selectedCity}
                            onChange={(e) => {
                                const city = e.target.value;
                                setSelectedCity(city);
                                const map: any = { "Karachi": "Pakistan", "New York": "United States", "London": "United Kingdom", "Tokyo": "Japan", "Sydney": "Australia" };
                                setSelectedCountry(map[city] || "Pakistan");
                            }}
                            className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500/50 appearance-none cursor-pointer hover:bg-white/5 transition-colors"
                        >
                            <option value="Karachi">Karachi, PK</option>
                            <option value="New York">New York, US</option>
                            <option value="London">London, UK</option>
                            <option value="Tokyo">Tokyo, JP</option>
                            <option value="Sydney">Sydney, AU</option>
                        </select>
                    </div>

                    <div className="flex-1 min-w-[150px]">
                        <label className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2 block">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500/50 [color-scheme:dark]"
                        />
                    </div>

                    <div className="flex-1 min-w-[150px]">
                        <label className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2 block">End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500/50 [color-scheme:dark]"
                        />
                    </div>

                    <button
                        onClick={fetchData}
                        className="bg-white text-black font-bold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all active:scale-95 whitespace-nowrap"
                    >
                        Refresh Analysis
                    </button>
                </motion.div>

                {loading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full mt-20 flex flex-col items-center justify-center p-10"
                    >
                        <div className="relative w-64 h-64 flex items-center justify-center">
                            {/* Pulse Rings */}
                            <motion.div
                                animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0.2, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                className="absolute inset-0 rounded-full border border-emerald-500/30"
                            />
                            <motion.div
                                animate={{ scale: [1, 1.4, 1.8], opacity: [0.5, 0.2, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "easeOut" }}
                                className="absolute inset-0 rounded-full border border-cyan-500/30"
                            />

                            {/* Central Core */}
                            <div className="absolute w-32 h-32 bg-black rounded-full border border-white/10 shadow-[0_0_50px_rgba(16,185,129,0.2)] flex items-center justify-center overflow-hidden backdrop-blur-md z-10">
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 bg-cover" />
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="w-full h-1/2 absolute top-0 left-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent origin-bottom animate-spin-slow"
                                />
                                <div className="text-white/50 text-4xl">📊</div>
                            </div>
                        </div>

                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="mt-8 text-center space-y-2"
                        >
                            <h3 className="text-xl font-light text-white tracking-[0.2em] uppercase">Aggregating Data</h3>
                            <p className="text-sm text-cyan-400 font-mono">Processing historical archives...</p>
                        </motion.div>
                    </motion.div>
                ) : (
                    <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Interactive Chart - Main Focus */}
                        <div className="lg:col-span-8 p-1 rounded-[3rem] bg-gradient-to-br from-white/10 to-white/5">
                            <div className="bg-[#0A0A0A] rounded-[2.9rem] h-full overflow-hidden relative group border border-white/5">
                                <InteractiveChart data={histData} />
                            </div>
                        </div>

                        {/* Side Panel */}
                        <div className="lg:col-span-4 space-y-6">
                            {/* Analysis Insights */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="p-8 rounded-[2.5rem] bg-[#0F0F0F] border border-white/5 relative overflow-hidden h-full"
                            >
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/10 rounded-full blur-[80px]" />
                                <h3 className="text-white font-medium text-lg mb-6 flex items-center gap-2 relative z-10">
                                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                                    AI Insights
                                </h3>
                                <AnalysisInsights data={histData} />
                            </motion.div>

                            {/* Export Data */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="p-8 rounded-[2.5rem] bg-[#0F0F0F] border border-white/5"
                            >
                                <h3 className="text-white font-medium text-lg mb-4">Export Dataset</h3>
                                <p className="text-white/40 text-sm mb-6 font-light">
                                    Download the processed climate dataset for offline analysis.
                                </p>
                                {histData.length > 0 && <AnalysisExport data={histData} />}
                            </motion.div>
                        </div>

                        {/* Correlation Matrix - Full Width Bottom */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="lg:col-span-12 p-8 rounded-[3rem] bg-[#0F0F0F] border border-white/5 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-emerald-900/10 to-transparent pointer-events-none" />

                            <div className="relative z-10">
                                <h2 className="text-3xl text-white font-medium mb-2">Correlation Matrix</h2>
                                <p className="text-white/60 font-light mb-8 max-w-2xl">
                                    Visualizing the relationship between different climate variables.
                                    (1.0 = Perfect positive correlation, -1.0 = Perfect negative).
                                </p>

                                {correlationImg ? (
                                    <div className="rounded-3xl overflow-hidden border border-white/10 bg-black/50 shadow-2xl">
                                        <img src={`data:image/png;base64,${correlationImg}`} alt="Correlation Matrix" className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-500" />
                                    </div>
                                ) : (
                                    <div className="h-64 flex items-center justify-center text-white/30 bg-white/5 rounded-3xl border border-white/5">
                                        Data unavailable
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
