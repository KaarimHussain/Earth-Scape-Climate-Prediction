"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/navbar";
import { predictWeather } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Country, City } from 'country-state-city';
import ForecastChart from "@/components/forecast-chart";
import ClimateTimeMachine from "@/components/climate-time-machine";
import EcoTips from "@/components/eco-tips";
import VoiceAssistant from "@/components/voice-assistant";
import { ChevronsUpDown, Search, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Footer from "@/components/footer";

export default function PredictPage() {
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [openCountry, setOpenCountry] = useState(false);
    const [openCity, setOpenCity] = useState(false);

    const countries = useMemo(() => Country.getAllCountries(), []);
    const cities = useMemo(() => {
        if (!country) return [];
        return City.getCitiesOfCountry(country) || [];
    }, [country]);

    const handlePredict = async () => {
        if (!country || !city) {
            setError("Please select both a country and a city.");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const response = await predictWeather(city, country);
            if (response.data.error) {
                setError(response.data.error);
                setResult(null);
            } else {
                setResult(response.data);
            }
        } catch (err: any) {
            setError(err.response?.data?.detail || "Failed to fetch prediction");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen relative overflow-x-hidden font-sans bg-[#050505] bg-secondary">
                <div className="container mx-auto px-5 pt-40 pb-20 relative z-10 flex flex-col items-center min-h-screen">
                    <motion.div
                        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-6xl md:text-7xl lg:text-9xl font-medium tracking-tight text-white leading-none drop-shadow-2xl font-ahsing">
                            PREDICTION
                        </h1>
                        <span className="block text-xl md:text-3xl font-light text-white/60 mt-4 tracking-[0.2em] uppercase font-sans">
                            Atmospheric Intelligence
                        </span>
                    </motion.div>

                    {/* Input Panel */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="w-full max-w-4xl bg-black/40 border border-white/10 rounded-3xl p-2 flex flex-col md:flex-row gap-2 items-center"
                    >
                        {/* Country Selector */}
                        <div className="flex-1 w-full">
                            <Popover open={openCountry} onOpenChange={setOpenCountry}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        role="combobox"
                                        aria-expanded={openCountry}
                                        className="w-full justify-between h-14 px-6 text-lg font-light text-white hover:bg-white/5 hover:text-white rounded-xl border-none"
                                    >
                                        <span className="flex items-center gap-3 truncate">
                                            <Globe className="w-5 h-5 text-white/40" />
                                            {country
                                                ? countries.find((c) => c.isoCode === country)?.name
                                                : "Select Country"}
                                        </span>
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[300px] p-0 bg-black border-white/10 text-white shadow-xl rounded-xl" sideOffset={8}>
                                    <Command className="bg-transparent">
                                        <CommandInput placeholder="Search country..." className="h-10 text-sm border-none focus:ring-0 text-white placeholder:text-white/40 font-light bg-transparent" />
                                        <CommandList className="max-h-[300px] p-1">
                                            <CommandEmpty className="py-3 text-center text-xs text-white/30">No country found.</CommandEmpty>
                                            <CommandGroup>
                                                {countries.map((c) => (
                                                    <CommandItem
                                                        key={c.isoCode}
                                                        value={c.name}
                                                        onSelect={(currentValue) => {
                                                            const selected = countries.find(item => item.name.toLowerCase() === currentValue.toLowerCase());
                                                            setCountry(selected ? selected.isoCode : "");
                                                            setCity("");
                                                            setOpenCountry(false);
                                                        }}
                                                        className="text-white/80 hover:text-white hover:bg-white/10 aria-selected:bg-white/10 aria-selected:text-white cursor-pointer text-sm py-2 px-3 rounded-lg transition-colors"
                                                    >
                                                        <span className={`w-1.5 h-1.5 rounded-full mr-3 ${country === c.isoCode ? 'bg-primary' : 'bg-transparent border border-white/20'}`} />
                                                        {c.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="w-full md:w-px h-px md:h-10 bg-white/10 mx-2" />

                        {/* City Selector */}
                        <div className="flex-1 w-full">
                            <Popover open={openCity} onOpenChange={setOpenCity}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        role="combobox"
                                        aria-expanded={openCity}
                                        disabled={!country}
                                        className="w-full justify-between h-14 px-6 text-lg font-light text-white hover:bg-white/5 hover:text-white rounded-xl border-none disabled:opacity-30"
                                    >
                                        <span className="flex items-center gap-3 truncate">
                                            <MapPin className="w-5 h-5 text-white/40" />
                                            {city
                                                ? city
                                                : !country ? "Select Country First" : "Select City"}
                                        </span>
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[300px] p-0 bg-black border-white/10 text-white shadow-xl rounded-xl" sideOffset={8}>
                                    <Command className="bg-transparent">
                                        <CommandInput placeholder="Search city..." className="h-10 text-sm border-none focus:ring-0 text-white placeholder:text-white/40 font-light bg-transparent" />
                                        <CommandList className="max-h-[300px] p-1">
                                            <CommandEmpty className="py-3 text-center text-xs text-white/30">No city found.</CommandEmpty>
                                            <CommandGroup>
                                                {cities.slice(0, 500).map((c, idx) => (
                                                    <CommandItem
                                                        key={`${c.name}-${idx}`}
                                                        value={c.name}
                                                        onSelect={(currentValue) => {
                                                            const selected = cities.find(item => item.name.toLowerCase() === currentValue.toLowerCase());
                                                            setCity(selected ? selected.name : currentValue);
                                                            setOpenCity(false);
                                                        }}
                                                        className="text-white/80 hover:text-white hover:bg-white/10 aria-selected:bg-white/10 aria-selected:text-white cursor-pointer text-sm py-2 px-3 rounded-lg transition-colors"
                                                    >
                                                        <span className={`w-1.5 h-1.5 rounded-full mr-3 ${city === c.name ? 'bg-primary' : 'bg-transparent border border-white/20'}`} />
                                                        {c.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="p-1 w-full md:w-auto">
                            <Button
                                onClick={handlePredict}
                                disabled={loading || !city || !country}
                                className="h-14 w-full md:w-auto px-8 rounded-xl bg-white text-black hover:bg-gray-200 text-lg font-medium transition-all shadow-lg disabled:opacity-50"
                            >
                                {loading ? (
                                    <span className="animate-pulse">Analyzing...</span>
                                ) : (
                                    <Search className="w-6 h-6" />
                                )}
                            </Button>
                        </div>
                    </motion.div>

                    {error && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex items-center gap-3 text-red-300 bg-red-900/10 px-6 py-3 rounded-2xl border border-red-500/10 text-sm font-light">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> {error}
                        </motion.div>
                    )}


                    {/* Loading State - Satellite Scan Animation */}
                    <AnimatePresence>
                        {loading && (
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
                                    <motion.div
                                        animate={{ scale: [1, 1.3, 1.6], opacity: [0.5, 0.2, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 1, ease: "easeOut" }}
                                        className="absolute inset-0 rounded-full border border-white/20"
                                    />

                                    {/* Central Core */}
                                    <div className="absolute w-32 h-32 bg-black rounded-full border border-white/10 shadow-[0_0_50px_rgba(16,185,129,0.2)] flex items-center justify-center overflow-hidden backdrop-blur-md z-10">
                                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 bg-cover" />
                                        {/* Scanning Line */}
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                            className="w-full h-full absolute inset-0 bg-gradient-to-b from-emerald-500/20 to-transparent origin-center"
                                            style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 0, 0 0, 0 0)' }} // Crude sector, actually gradient is better
                                        />
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="w-full h-1/2 absolute top-0 left-0 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent origin-bottom animate-spin-slow"
                                        />

                                        {/* Earth/Grid Icon */}
                                        <Globe className="w-12 h-12 text-white/50 relative z-20" />
                                    </div>
                                </div>

                                <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="mt-8 text-center space-y-2"
                                >
                                    <h3 className="text-xl font-light text-white tracking-[0.2em] uppercase">Initializing Satellites</h3>
                                    <p className="text-sm text-emerald-400 font-mono">Triangulating {city}, {country}...</p>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Prediction Results - Modern Grid */}
                    <AnimatePresence>
                        {result && (
                            <motion.div
                                initial={{ opacity: 0, y: 60 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Apple-like ease
                                className="w-full max-w-7xl mt-24"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                                    {/* 1. Main Weather Display (Large) */}
                                    <div className="lg:col-span-8 p-10 rounded-[3rem] bg-gradient-to-br from-neutral-900/50 to-neutral-900/10 border border-white/5 backdrop-blur-3xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-emerald-500/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition duration-700" />

                                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                                            <div>
                                                <div className="flex items-center gap-4 mb-2">
                                                    <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs font-medium text-emerald-400 uppercase tracking-widest">
                                                        Current Status
                                                    </span>
                                                    <span className="text-white/40 text-sm font-light">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                                                </div>
                                                <h2 className="text-[8rem] leading-none font-medium text-white tracking-tighter mix-blend-overlay">
                                                    {Math.round(result.current_temp)}°
                                                </h2>
                                                <p className="text-2xl text-neutral-300 font-light mt-2 flex items-center gap-3">
                                                    <span className="capitalize">{result.weather_data?.weather?.[0]?.description || "Unknown"}</span>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                                    <span>{city}</span>
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center gap-4 text-white/60 font-light">
                                                    <span>Humidity</span>
                                                    <div className="h-px w-10 bg-white/10" />
                                                    <span className="text-white font-medium">{result.weather_data?.main?.humidity}%</span>
                                                </div>
                                                <div className="flex items-center gap-4 text-white/60 font-light">
                                                    <span>Wind Velocity</span>
                                                    <div className="h-px w-10 bg-white/10" />
                                                    <span className="text-white font-medium">{result.weather_data?.wind?.speed} m/s</span>
                                                </div>
                                                <div className="flex items-center gap-4 text-white/60 font-light">
                                                    <span>Real Feel</span>
                                                    <div className="h-px w-10 bg-white/10" />
                                                    <span className="text-white font-medium">{result.weather_data?.main?.feels_like ? Math.round(result.weather_data.main.feels_like) : "--"}°</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-12 pt-8 border-t border-white/5">
                                            <p className="text-xl text-neutral-300 font-light leading-relaxed max-w-3xl">
                                                <span className="text-emerald-400 mr-2">Analysis:</span>
                                                {result.prediction}
                                            </p>
                                        </div>
                                    </div>

                                    {/* 2. Vertical Stack (Right) */}
                                    <div className="lg:col-span-4 space-y-6">
                                        {/* AI Insight Card */}
                                        <div className="p-8 rounded-[2.5rem] bg-[#0F0F0F] border border-white/5 h-full relative overflow-hidden">
                                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-[80px]" />
                                            <h3 className="text-white font-medium text-lg mb-6 flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                                Aeris AI Insights
                                            </h3>
                                            <VoiceAssistant text={result.prediction} />
                                            <div className="mt-6">
                                                {result.weather_data?.weather?.[0] && (
                                                    <EcoTips weatherMain={result.weather_data.weather[0].main} temp={result.current_temp} />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3. Bottom Row */}
                                    <div className="lg:col-span-4 p-8 rounded-[2.5rem] bg-[#0F0F0F] border border-white/5">
                                        <ClimateTimeMachine currentTemp={result.current_temp} />
                                    </div>
                                    <div className="lg:col-span-8 p-8 rounded-[2.5rem] bg-[#0F0F0F] border border-white/5">
                                        <h3 className="text-white/60 text-sm font-medium uppercase tracking-widest mb-6 px-2">24h Forecast</h3>
                                        {result.hourly_forecast && result.hourly_forecast.length > 0 && (
                                            <ForecastChart data={result.hourly_forecast} />
                                        )}
                                    </div>

                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <Footer />
        </>
    );
}

