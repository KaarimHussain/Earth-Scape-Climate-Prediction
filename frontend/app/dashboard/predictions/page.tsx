"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudSun, CloudRain, Sun, CloudLightning, Wind } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PredictionsPage() {
    const forecast = [
        { day: "Today", temp: "24°C", condition: "Partly Cloudy", icon: CloudSun, risk: "Low" },
        { day: "Tomorrow", temp: "22°C", condition: "Heavy Rain", icon: CloudRain, risk: "Med" },
        { day: "Wed", temp: "26°C", condition: "Sunny", icon: Sun, risk: "Low" },
        { day: "Thu", temp: "29°C", condition: "Heatwave Warning", icon: Sun, risk: "High" },
        { day: "Fri", temp: "25°C", condition: "Thunderstorms", icon: CloudLightning, risk: "Med" },
        { day: "Sat", temp: "21°C", condition: "Windy", icon: Wind, risk: "Low" },
        { day: "Sun", temp: "23°C", condition: "Clear", icon: Sun, risk: "Low" },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Climate Predictions</h1>
                <p className="text-muted-foreground">AI-powered weather and climate forecasting model (7-day outlook).</p>
            </div>

            {/* Featured Prediction Card */}
            <Card className="bg-linear-to-r from-blue-900/40 to-purple-900/40 border-white/10 backdrop-blur-xl">
                <CardHeader>
                    <CardTitle className="text-xl">AI Insight</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg font-light leading-relaxed">
                        "Models predict a <span className="text-orange-400 font-medium">94% probability</span> of a localized heatwave event affecting the Southern Hemisphere region within the next 48 hours. Recommend adjusting energy output thresholds."
                    </p>
                </CardContent>
            </Card>

            {/* 7-Day Forecast Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {forecast.map((day) => {
                    const Icon = day.icon;
                    return (
                        <Card key={day.day} className={`border-white/10 backdrop-blur-md hover:-translate-y-1 transition-transform ${day.risk === "High" ? "bg-red-500/10 border-red-500/20" : "bg-white/5"}`}>
                            <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                                <span className="text-sm font-medium text-muted-foreground">{day.day}</span>
                                <Icon className={`w-8 h-8 ${day.condition.includes("Sun") ? "text-orange-400" : day.condition.includes("Rain") ? "text-blue-400" : "text-gray-400"}`} />
                                <div>
                                    <div className="text-2xl font-bold">{day.temp}</div>
                                    <div className="text-xs text-muted-foreground mt-1">{day.condition}</div>
                                </div>
                                {day.risk !== "Low" && (
                                    <Badge variant="outline" className="text-xs border-red-500/50 text-red-500 bg-red-500/10">
                                        Risk: {day.risk}
                                    </Badge>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
