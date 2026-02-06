"use client";

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Note: In a real app, this should be an environment variable (NEXT_PUBLIC_MAPBOX_TOKEN)
// Default public token (placeholder) - User must replace this.
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGlqaXFqbnYwMGZkM2ZtbGZnNXlmbnJqIn0.SampleTokenReplaceMe";

interface AnalysisMapProps {
    data: any[];
}

export default function AnalysisMap({ data }: AnalysisMapProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [tokenMissing, setTokenMissing] = useState(false);

    useEffect(() => {
        if (!MAPBOX_TOKEN || MAPBOX_TOKEN.includes("ReplaceMe")) {
            setTokenMissing(true);
            return;
        }

        if (map.current) return; // initialize map only once
        if (!mapContainer.current) return;

        mapboxgl.accessToken = MAPBOX_TOKEN;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v11', // Dark theme for EarthScape
            center: [0, 20],
            zoom: 1.5,
            projection: 'globe' // Display as a 3D globe
        });

        const mapInstance = map.current;

        mapInstance.on('load', () => {
            // Add atmosphere styling
            mapInstance.setFog({
                'color': 'rgb(186, 210, 235)', // Lower atmosphere
                'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
                'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
                'space-color': 'rgb(11, 11, 25)', // Background color
                'star-intensity': 0.6 // Background star brightness (default 0.35 at low zoooms )
            });

            // Iterate data and add markers
            // Note: For large datasets, use GeoJSON source/layer instead of DOM markers
            data.forEach((point) => {
                // Simple random offset for demo if multiple points have exact same loc
                const lng = point.lng || (Math.random() * 360 - 180);
                const lat = point.lat || (Math.random() * 180 - 90);

                // Create a DOM element for each marker.
                const el = document.createElement('div');
                el.className = 'marker';
                el.style.backgroundImage = 'radial-gradient(circle, #ef4444 0%, rgba(255,0,0,0) 70%)';
                el.style.width = '10px';
                el.style.height = '10px';
                el.style.borderRadius = '50%';
                el.style.cursor = 'pointer';

                new mapboxgl.Marker(el)
                    .setLngLat([lng, lat])
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 }) // add popups
                            .setHTML(
                                `<div style="color:black">
                                    <strong>${point.location || "Unknown"}</strong><br>
                                    ${point.temperature}°C
                                </div>`
                            )
                    )
                    .addTo(mapInstance);
            });
        });

        // Clean up on unmount
        return () => mapInstance.remove();
    }, [data]);

    return (
        <div className="w-full h-[500px] rounded-xl overflow-hidden border border-white/10 relative">
            {tokenMissing ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-6 text-center">
                    <p className="text-xl mb-2">Mapbox Token Missing</p>
                    <p className="text-white/60 text-sm max-w-md">
                        To view the high-fidelity interactive map, please add your Mapbox Access Token to your environment variables as <code>NEXT_PUBLIC_MAPBOX_TOKEN</code>.
                    </p>
                </div>
            ) : null}
            <div ref={mapContainer} className="w-full h-full" />
        </div>
    );
}
