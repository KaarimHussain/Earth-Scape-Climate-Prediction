"use client";

import { Download } from "lucide-react";
// CSV Export logic
export default function AnalysisExport({ data }: { data: any[] }) {
    const handleDownload = () => {
        if (!data || data.length === 0) return;

        // Simple CSV export logic to avoid heavy xlsx dependency if possible, 
        // but user asked for "more interactivity". Let's stick to simple CSV for now.
        const csvContent = [
            Object.keys(data[0]).join(","),
            ...data.map(row => Object.values(row).join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "climate_analysis_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
            onClick={handleDownload}
            className="group w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-4 rounded-xl transition-all duration-300 hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
        >
            <div className="p-2 rounded-full bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                <Download size={20} />
            </div>
            <span className="font-light tracking-wide">Download CSV Report</span>
        </button>
    );
}
