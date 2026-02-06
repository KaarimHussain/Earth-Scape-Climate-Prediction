"use client";

interface AnalysisInsightsProps {
    data: any[];
}

export default function AnalysisInsights({ data }: AnalysisInsightsProps) {
    if (!data || data.length === 0) return null;

    // Heuristic "AI" Analysis
    const generateInsights = () => {
        const insights = [];
        const avgTemp = data.reduce((acc, curr) => acc + curr.temperature, 0) / data.length;
        const maxTemp = Math.max(...data.map((d: any) => d.temperature));
        const avgCO2 = data.reduce((acc, curr) => acc + curr.co2_levels, 0) / data.length;

        insights.push(`The average recorded temperature is **${avgTemp.toFixed(1)}°C**, with a peak high of **${maxTemp.toFixed(1)}°C**.`); // Corrected line 19 for type

        if (avgCO2 > 400) {
            insights.push(`⚠️ **Critical Alert**: Average CO2 levels are **${avgCO2.toFixed(1)} ppm**, exceeding the safe threshold of 350 ppm. This indicates a significant greenhouse effect footprint.`);
        } else {
            insights.push(`CO2 levels are currently within a manageable range (Avg: ${avgCO2.toFixed(1)} ppm).`);
        }

        // Trend detection (simple first vs last)
        const first = data[0];
        const last = data[data.length - 1];
        if (last.temperature > first.temperature) {
            insights.push(`📈 **Warming Trend Detected**: Temperatures have risen by roughly **${(last.temperature - first.temperature).toFixed(1)}°C** over the recorded period.`);
        } else {
            insights.push(`📉 **Cooling Trend**: Temperatures show a slight decline of **${(first.temperature - last.temperature).toFixed(1)}°C**.`);
        }

        return insights;
    };

    return (
        <div className="space-y-4">
            {generateInsights().map((insight, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                    <div className="min-w-[4px] h-[4px] rounded-full bg-purple-400 mt-2.5 group-hover:scale-150 transition-transform" />
                    <p className="text-neutral-300 font-light leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: insight.replace(/\*\*(.*?)\*\*/g, '<span class="text-white font-medium">$1</span>') }} />
                </div>
            ))}
        </div>
    );
}
