"use client";

import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

interface LocationComparisonProps {
    data: any[];
}

const PALETTE = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
];

export default function LocationComparison({ data }: LocationComparisonProps) {
    const [selectedLocs, setSelectedLocs] = useState<string[]>([]);

    // Get unique locations
    const availableLocations = useMemo(() => Array.from(new Set(data.map(d => d.location))), [data]);

    // Filter and structure data for comparison (group by date)
    const chartData = useMemo(() => {
        if (selectedLocs.length === 0) return [];

        const groupedByDate: Record<string, any> = {};

        data.forEach(d => {
            if (selectedLocs.includes(d.location)) {
                if (!groupedByDate[d.date]) {
                    groupedByDate[d.date] = { date: d.date };
                }
                groupedByDate[d.date][d.location] = d.temperature;
            }
        });

        return Object.values(groupedByDate).sort((a: any, b: any) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
    }, [data, selectedLocs]);

    const toggleLocation = (loc: string) => {
        if (selectedLocs.includes(loc)) {
            setSelectedLocs(selectedLocs.filter(l => l !== loc));
        } else {
            if (selectedLocs.length < 3) {
                setSelectedLocs([...selectedLocs, loc]);
            }
        }
    };

    // Dynamic Chart Config
    const chartConfig = useMemo(() => {
        const config: ChartConfig = {};
        selectedLocs.forEach((loc, idx) => {
            config[loc] = {
                label: loc,
                color: PALETTE[idx % PALETTE.length],
            };
        });
        return config;
    }, [selectedLocs]);

    return (
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm mt-10">
            <h2 className="text-2xl text-white mb-4">Location Comparison 🆚</h2>
            <p className="text-white/60 text-sm mb-6">Select up to 3 locations to compare their temperature trends.</p>

            <div className="flex flex-wrap gap-2 mb-6">
                {availableLocations.map(loc => (
                    <button
                        key={loc}
                        onClick={() => toggleLocation(loc)}
                        className={`px-3 py-1 rounded-full text-sm border transition ${selectedLocs.includes(loc)
                            ? "bg-white text-black border-white"
                            : "bg-transparent text-white border-white/20 hover:border-white"
                            }`}
                    >
                        {loc}
                    </button>
                ))}
            </div>

            {selectedLocs.length > 0 ? (
                <div className="h-[350px] w-full">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                        <LineChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            {selectedLocs.map((loc) => (
                                <Line
                                    key={loc}
                                    type="monotone"
                                    dataKey={loc}
                                    stroke={chartConfig[loc]?.color}
                                    strokeWidth={3}
                                    dot={false}
                                />
                            ))}
                        </LineChart>
                    </ChartContainer>
                </div>
            ) : (
                <div className="h-[200px] flex items-center justify-center border border-dashed border-white/20 rounded-xl text-white/30">
                    Select locations above to start comparing
                </div>
            )}
        </div>
    );
}
