"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, Thermometer, Wind, Droplets, TrendingUp, TrendingDown, AlertCircle, CheckCircle2 } from "lucide-react";
import { Area, AreaChart, Pie, PieChart, Cell, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Mock Data
const tempData = [
    { month: "Jan", temp: 1.1 },
    { month: "Feb", temp: 1.3 },
    { month: "Mar", temp: 1.4 },
    { month: "Apr", temp: 1.2 },
    { month: "May", temp: 1.5 },
    { month: "Jun", temp: 1.8 },
    { month: "Jul", temp: 2.1 },
];

const emissionData = [
    { name: "Energy", value: 450, color: "#10b981" }, // emerald-500
    { name: "Transport", value: 320, color: "#3b82f6" }, // blue-500
    { name: "Industry", value: 280, color: "#f59e0b" }, // amber-500
    { name: "Agriculture", value: 190, color: "#8b5cf6" }, // violet-500
    { name: "Waste", value: 110, color: "#ef4444" }, // red-500
];

const stabilityData = [
    { name: "Stability", value: 78, fill: "var(--color-primary)" }
];

const chartConfig = {
    temp: { label: "Temperature Anomaly", color: "hsl(var(--primary))" },
    emissions: { label: "Emissions", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
                <p className="text-muted-foreground">Real-time system alerts and updates.</p>
            </div>
            {/* 1. Global Status Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="col-span-1 bg-linear-to-br from-green-900/20 to-black border-white/10 backdrop-blur-md relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-muted-foreground">Climate Stability Index</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center -mt-4">
                        <div className="relative w-[200px] h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={20} data={stabilityData} startAngle={90} endAngle={-270}>
                                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                                    <RadialBar background dataKey="value" cornerRadius={30} fill="var(--color-primary)" />
                                </RadialBarChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="text-5xl font-bold text-white">78</span>
                                <span className="text-sm text-green-400 font-medium">STABLE</span>
                            </div>
                        </div>
                        <p className="text-center text-sm text-muted-foreground mt-2">
                            Global systems operating within nominal parameters. <br /> Projected stability for next 24h: <span className="text-white">High</span>.
                        </p>
                    </CardContent>
                </Card>

                {/* 2. Key Metrics Grid */}
                <div className="col-span-1 lg:col-span-2 grid grid-cols-2 gap-4">
                    {[
                        { title: "Avg Temperature", value: "15.2°C", change: "+1.2%", trend: "up", icon: Thermometer, color: "text-orange-500" },
                        { title: "CO2 Concentration", value: "418 ppm", change: "-0.5%", trend: "down", icon: Wind, color: "text-green-500" },
                        { title: "Global Humidity", value: "62%", change: "+3%", trend: "up", icon: Droplets, color: "text-blue-500" },
                        { title: "Active Sensors", value: "1,240", change: "+12", trend: "up", icon: Activity, color: "text-purple-500" },
                    ].map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={i} className="bg-white/5 border-white/10 backdrop-blur-md flex flex-col justify-center">
                                <CardContent className="px-5 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                                        <div className="text-3xl font-bold text-white mt-2">{stat.value}</div>
                                        <div className={`flex items-center text-xs mt-1 ${stat.trend === "up" && !stat.change.startsWith("-") ? "text-red-400" : "text-green-400"}`}>
                                            {stat.change} from last month
                                        </div>
                                    </div>
                                    <div className={`p-3 rounded-full bg-white/5 ${stat.color}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>

            {/* 3. Main Trend Chart */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                <CardHeader>
                    <CardTitle>Global Temperature Anomalies (2025)</CardTitle>
                    <CardDescription>Monthly deviation from 20th-century average (°C)</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                        <AreaChart data={tempData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorTempMain" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                            <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}°C`} />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <Area type="monotone" dataKey="temp" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorTempMain)" />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* 4. Secondary Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="col-span-1 lg:col-span-1 bg-white/5 border-white/10 backdrop-blur-md">
                    <CardHeader>
                        <CardTitle>Emission Contributions</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[250px] flex items-center justify-center">
                        <div className="w-full h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={emissionData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {emissionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.5)" />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-black/80 border border-white/10 p-2 rounded-lg text-xs text-white">
                                                        <p className="font-bold">{payload[0].name}</p>
                                                        <p>{payload[0].value} Mt</p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1 lg:col-span-2 bg-white/5 border-white/10 backdrop-blur-md">
                    <CardHeader>
                        <CardTitle>Latest Intelligence</CardTitle>
                        <CardDescription>Recent AI-generated insights and alerts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { title: "Anomaly Detected", desc: "Significant temperature variance in North Atlantic (-1.2°C).", time: "2h ago", icon: AlertCircle, color: "text-blue-400" },
                            { title: "Model Optimized", desc: "Aerith-v4.2 prediction accuracy increased to 98.4%.", time: "5h ago", icon: CheckCircle2, color: "text-green-400" },
                            { title: "Sensor Cluster Offline", desc: "Connection lost to Sector 4 (Amazon Basin). Re-routing data.", time: "8h ago", icon: AlertCircle, color: "text-amber-400" },
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                                    <div className={`mt-1 ${item.color}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-sm font-medium text-white">{item.title}</h4>
                                            <span className="text-xs text-muted-foreground">{item.time}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}