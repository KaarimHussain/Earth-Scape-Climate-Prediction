"use client";

import React, { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { scaleLinear } from "d3-scale";

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import("react-globe.gl"), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full flex items-center justify-center bg-black/20 text-white/50 rounded-xl">Initializing Earth Virtualization...</div>
});

interface ClimateMapProps {
    data: any[];
}

export default function ClimateMap({ data }: ClimateMapProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Aggregate data by unique location
    const uniqueLocations = useMemo(() => {
        return Array.from(new Set(data.map(d => d.location)))
            .map(loc => {
                const entries = data.filter(d => d.location === loc);
                entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                return entries[0];
            });
    }, [data]);

    const cityCoords: Record<string, { lat: number, lng: number }> = {
        "New York": { lat: 40.7128, lng: -74.006 },
        "London": { lat: 51.5074, lng: -0.1276 },
        "Tokyo": { lat: 35.6895, lng: 139.6917 },
        "Paris": { lat: 48.8566, lng: 2.3522 },
        "Sydney": { lat: -33.8688, lng: 151.2093 },
        "Mumbai": { lat: 19.0760, lng: 72.8777 },
        "Beijing": { lat: 39.9042, lng: 116.4074 },
        "Cairo": { lat: 30.0444, lng: 31.2357 },
        "Rio de Janeiro": { lat: -22.9068, lng: -43.1729 },
        "Lagos": { lat: 6.5244, lng: 3.3792 }
    };

    const colorScale = scaleLinear<string>()
        .domain([10, 35])
        .range(["#60a5fa", "#ef4444"]);

    // Prepare data for Globe
    const pointsData = uniqueLocations.map(d => {
        const coords = cityCoords[d.location];
        if (!coords) return null;
        return {
            ...d,
            lat: coords.lat,
            lng: coords.lng,
            color: colorScale(d.temperature),
            size: 0.5
        };
    }).filter(Boolean);

    return (
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm mt-10">
            <h2 className="text-2xl text-white mb-4">Global Climate Monitor 🌍</h2>
            <p className="text-white/60 text-sm mb-6">Real-time planetary telemetry from our orbital and ground networks.</p>

            <div className="w-full h-[500px] border border-white/10 rounded-xl bg-black/40 overflow-hidden relative cursor-move">
                {mounted && (
                    <Globe
                        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                        pointsData={pointsData}
                        pointAltitude={0.1}
                        pointColor="color"
                        pointRadius={0.5}
                        pointLabel={(d: any) => `
                            <div style="background: rgba(0,0,0,0.8); color: white; padding: 4px 8px; border-radius: 4px; font-family: sans-serif;">
                                <b>${d.location}</b><br/>Temp: ${d.temperature.toFixed(1)}°C
                            </div>
                        `}
                        atmosphereColor="#3a228a"
                        atmosphereAltitude={0.2}
                    />
                )}
            </div>
        </div>
    );
}
