"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/navbar";
import { getCorrelationMatrix, getHistoricalData } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import InteractiveChart from "@/components/interactive-chart";
import AnalysisExport from "@/components/analysis-export";
import AnalysisInsights from "@/components/analysis-insights";
import Footer from "@/components/footer";
import { Country, City } from 'country-state-city';
import { ChevronsUpDown, Globe, MapPin, Search } from "lucide-react";
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

export default function AnalysisPage() {
    const [correlationImg, setCorrelationImg] = useState("");
    const [histData, setHistData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCorrelation, setShowCorrelation] = useState(false);

    // Filter State
    const [selectedCity, setSelectedCity] = useState("Karachi");
    const [selectedCountry, setSelectedCountry] = useState("PK"); // Store ISO code for logic
    const [startDate, setStartDate] = useState("2025-01-01");
    const [endDate, setEndDate] = useState("2025-12-30");

    const [openCountry, setOpenCountry] = useState(false);
    const [openCity, setOpenCity] = useState(false);
    const [citySearch, setCitySearch] = useState("");

    const countries = useMemo(() => Country.getAllCountries(), []);
    const cities = useMemo(() => {
        if (!selectedCountry) return [];
        return City.getCitiesOfCountry(selectedCountry) || [];
    }, [selectedCountry]);

    const filteredCities = useMemo(() => {
        if (!citySearch) return cities.slice(0, 500);
        return cities.filter(c => c.name.toLowerCase().includes(citySearch.toLowerCase())).slice(0, 500);
    }, [cities, citySearch]);

    const fetchData = async () => {
        setLoading(true);
        // Convert ISO country code back to full name for API if needed, 
        // or ensure API handles ISO. The previous implementation used full names like "Pakistan".
        // Let's find the full name.
        const countryObj = countries.find(c => c.isoCode === selectedCountry);
        const countryName = countryObj ? countryObj.name : "Pakistan";

        try {
            const [corrRes, histRes] = await Promise.all([
                getCorrelationMatrix(selectedCity, countryName),
                getHistoricalData(selectedCity, countryName, startDate, endDate)
            ]);

            if (corrRes.data && corrRes.data.image) setCorrelationImg(corrRes.data.image);
            if (histRes.data && histRes.data.data) {
                setHistData(histRes.data.data);
            } else {
                setHistData([]); // Handle empty data gracefully
            }
        } catch (error) {
            console.error("Failed to fetch analytics data", error);
            setHistData([]);
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

                {/* Filter Controls - Dynamic & Interactive */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-full max-w-5xl bg-white/5 border border-white/10 rounded-2xl p-4 mb-16 flex flex-col md:flex-row gap-4 items-end backdrop-blur-md z-20"
                >
                    {/* Country Selector */}
                    <div className="flex-1 w-full relative">
                        <label className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2 block ml-1">Country</label>
                        <Popover open={openCountry} onOpenChange={setOpenCountry}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="ghost"
                                    role="combobox"
                                    aria-expanded={openCountry}
                                    className="w-full justify-between h-12 px-4 bg-[#0F0F0F] border border-white/10 text-white hover:bg-white/10 hover:text-white rounded-xl"
                                >
                                    <span className="flex items-center gap-2 truncate">
                                        <Globe className="w-4 h-4 text-white/40" />
                                        {selectedCountry
                                            ? countries.find((c) => c.isoCode === selectedCountry)?.name
                                            : "Select Country"}
                                    </span>
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[250px] p-0 bg-black border-white/10 text-white shadow-xl rounded-xl" sideOffset={8}>
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
                                                        setSelectedCountry(selected ? selected.isoCode : "");
                                                        setSelectedCity("");
                                                        setOpenCountry(false);
                                                    }}
                                                    className="text-white/80 hover:text-white hover:bg-white/10 aria-selected:bg-white/10 aria-selected:text-white cursor-pointer text-sm py-2 px-3 rounded-lg transition-colors"
                                                >
                                                    <span className={`w-1.5 h-1.5 rounded-full mr-3 ${selectedCountry === c.isoCode ? 'bg-primary' : 'bg-transparent border border-white/20'}`} />
                                                    {c.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* City Selector */}
                    <div className="flex-1 w-full relative">
                        <label className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2 block ml-1">City</label>
                        <Popover open={openCity} onOpenChange={setOpenCity}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="ghost"
                                    role="combobox"
                                    aria-expanded={openCity}
                                    disabled={!selectedCountry}
                                    className="w-full justify-between h-12 px-4 bg-[#0F0F0F] border border-white/10 text-white hover:bg-white/10 hover:text-white rounded-xl disabled:opacity-50"
                                >
                                    <span className="flex items-center gap-2 truncate">
                                        <MapPin className="w-4 h-4 text-white/40" />
                                        {selectedCity
                                            ? selectedCity
                                            : !selectedCountry ? "Select Country First" : "Select City"}
                                    </span>
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[250px] p-0 bg-black border-white/10 text-white shadow-xl rounded-xl" sideOffset={8}>
                                <Command className="bg-transparent" shouldFilter={false}>
                                    <CommandInput
                                        placeholder="Search city..."
                                        className="h-10 text-sm border-none focus:ring-0 text-white placeholder:text-white/40 font-light bg-transparent"
                                        value={citySearch}
                                        onValueChange={setCitySearch}
                                    />
                                    <CommandList className="max-h-[300px] p-1">
                                        <CommandEmpty className="py-3 text-center text-xs text-white/30">No city found.</CommandEmpty>
                                        <CommandGroup>
                                            {filteredCities.map((c, idx) => (
                                                <CommandItem
                                                    key={`${c.name}-${idx}`}
                                                    value={c.name}
                                                    onSelect={(currentValue) => {
                                                        // When manually filtering, currentValue is what we passed as value
                                                        setSelectedCity(c.name);
                                                        setOpenCity(false);
                                                        setCitySearch(""); // Reset search
                                                    }}
                                                    className="text-white/80 hover:text-white hover:bg-white/10 aria-selected:bg-white/10 aria-selected:text-white cursor-pointer text-sm py-2 px-3 rounded-lg transition-colors"
                                                >
                                                    <span className={`w-1.5 h-1.5 rounded-full mr-3 ${selectedCity === c.name ? 'bg-primary' : 'bg-transparent border border-white/20'}`} />
                                                    {c.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Date Inputs */}
                    <div className="flex-1 min-w-[150px]">
                        <label className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2 block ml-1">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl p-3 h-12 text-white focus:outline-none focus:border-cyan-500/50 [color-scheme:dark]"
                        />
                    </div>

                    <div className="flex-1 min-w-[150px]">
                        <label className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2 block ml-1">End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl p-3 h-12 text-white focus:outline-none focus:border-cyan-500/50 [color-scheme:dark]"
                        />
                    </div>

                    <button
                        onClick={fetchData}
                        className="bg-white text-black font-bold py-3 px-6 h-12 rounded-xl hover:bg-gray-200 transition-all active:scale-95 whitespace-nowrap flex items-center gap-2"
                    >
                        <Search className="w-4 h-4" /> Refresh
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
                        {/* Correlation Matrix - Full Width Bottom */}
                        <div className="lg:col-span-12">
                            <div className="flex justify-center mb-8">
                                <Button
                                    onClick={() => setShowCorrelation(!showCorrelation)}
                                    className="bg-white/5 border border-white/10 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-2xl transition-all"
                                >
                                    {showCorrelation ? "Hide Correlation Matrix" : "Show Correlation Matrix"}
                                </Button>
                            </div>

                            <AnimatePresence>
                                {showCorrelation && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="p-8 rounded-[3rem] bg-[#0F0F0F] border border-white/5 relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-emerald-900/10 to-transparent pointer-events-none" />

                                        <div className="relative z-10">
                                            <h2 className="text-3xl text-white font-medium mb-2">Correlation Matrix</h2>
                                            <p className="text-white/60 font-light mb-8 max-w-2xl">
                                                Visualizing the relationship between different climate variables for <span className="text-emerald-400 font-medium">{selectedCity}</span>.
                                                (1.0 = Perfect positive correlation, -1.0 = Perfect negative).
                                            </p>

                                            {correlationImg ? (
                                                <div className="rounded-3xl overflow-hidden border border-white/10 bg-black/50 shadow-2xl">
                                                    <img src={`data:image/png;base64,${correlationImg}`} alt="Correlation Matrix" className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-500" />
                                                </div>
                                            ) : (
                                                <div className="h-64 flex flex-col items-center justify-center text-white/30 bg-white/5 rounded-3xl border border-white/5 gap-4">
                                                    <div className="p-4 rounded-full bg-white/5">
                                                        <Search className="w-8 h-8 opacity-50" />
                                                    </div>
                                                    <p>Correlation data unavailable for {selectedCity}</p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
