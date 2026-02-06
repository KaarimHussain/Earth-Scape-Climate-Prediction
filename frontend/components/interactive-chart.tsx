"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

interface InteractiveChartProps {
    data: any[];
}

const PALETTE = [
    "#34d399", // Emerald 400
    "#22d3ee", // Cyan 400
    "#a78bfa", // Violet 400
    "#fb7185", // Rose 400
    "#fbbf24", // Amber 400
];

export default function InteractiveChart({ data }: InteractiveChartProps) {
    const keys = React.useMemo(() => {
        if (!data || data.length === 0) return [];
        return Object.keys(data[0]).filter(k => k !== 'date' && k !== 'location' && typeof data[0][k] === 'number');
    }, [data]);

    const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (keys.length > 0 && selectedKeys.length === 0) {
            setSelectedKeys(keys.slice(0, 2));
        }
    }, [keys, selectedKeys.length]);

    // Construct Chart Config dynamically
    const chartConfig = React.useMemo(() => {
        const config: ChartConfig = {};
        keys.forEach((key, index) => {
            config[key] = {
                label: key.replace(/_/g, ' ').toUpperCase(),
                color: PALETTE[index % PALETTE.length] || `hsl(${index * 50}, 70%, 50%)`,
            };
        });
        return config;
    }, [keys]);

    const toggleKey = (key: string) => {
        if (selectedKeys.includes(key)) {
            setSelectedKeys(selectedKeys.filter(k => k !== key));
        } else {
            setSelectedKeys([...selectedKeys, key]);
        }
    };

    if (!data || data.length === 0) return <p className="text-muted-foreground p-6">No data available for interactive analysis.</p>;

    return (
        <div className="w-full h-full p-8 flex flex-col">
            <div className="mb-6">
                <h2 className="text-2xl text-white mb-2">Interactive Historical Trends 📈</h2>
                <p className="text-white/60 text-sm mb-4">Click variables below to toggle them on the chart.</p>
                <div className="flex flex-wrap gap-2">
                    {keys.map((k) => (
                        <button
                            key={k}
                            onClick={() => toggleKey(k)}
                            style={{
                                backgroundColor: selectedKeys.includes(k) ? chartConfig[k]?.color : "transparent",
                                borderColor: selectedKeys.includes(k) ? chartConfig[k]?.color : "rgba(255,255,255,0.2)",
                                color: selectedKeys.includes(k) ? "#000" : "rgba(255,255,255,0.7)"
                            }}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-300 hover:scale-105 ${!selectedKeys.includes(k) && "hover:border-white hover:text-white"
                                }`}
                        >
                            {chartConfig[k]?.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-[400px] w-full">
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.15)" />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                            minTickGap={30}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        {selectedKeys.map((key) => (
                            <Line
                                key={key}
                                type="monotone"
                                dataKey={key}
                                stroke={chartConfig[key]?.color}
                                strokeWidth={3}
                                dot={false}
                                activeDot={{ r: 6, strokeWidth: 0, fill: chartConfig[key]?.color }}
                                animationDuration={1500}
                            />
                        ))}
                    </LineChart>
                </ChartContainer>
            </div>
            <p className="text-center text-white/40 text-sm mt-4">Real-time data visualization using Shadcn Charts.</p>
        </div>
    );
}
