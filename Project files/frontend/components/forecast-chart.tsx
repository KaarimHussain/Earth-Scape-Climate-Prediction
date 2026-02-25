"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

interface ForecastChartProps {
    data: { time: string; temp: number }[];
}

const chartConfig = {
    temp: {
        label: "Temperature",
        color: "#10b981", // Emerald-500
    },
} satisfies ChartConfig;

export default function ForecastChart({ data }: ForecastChartProps) {
    if (!data || data.length === 0) return null;

    return (
        <div className="w-full h-64 mt-6 bg-black/20 p-4 rounded-xl border border-white/5">
            <h3 className="text-white/80 text-sm mb-4">12-Hour Temperature Forecast</h3>
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <LineChart data={data} margin={{ left: -20, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                    <XAxis
                        dataKey="time"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                        tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                        tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                        unit="°"
                    />
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Line
                        type="monotone"
                        dataKey="temp"
                        stroke="var(--color-temp)"
                        strokeWidth={3}
                        dot={{ fill: 'var(--color-temp)', strokeWidth: 2, r: 4, stroke: '#fff' }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                </LineChart>
            </ChartContainer>
        </div>
    );
}
