import AdminNavbar from "@/components/admin-navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Server, Database, Activity, HardDrive } from "lucide-react";

async function getSystemStats() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/system/stats`, {
            cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch stats");
        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default async function AdminAnalytics() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");

    if (!token) {
        redirect("/admin/login");
    }

    const stats = await getSystemStats();

    return (
        <div className="min-h-screen bg-secondary font-sans selection:bg-emerald-500/30">
            <AdminNavbar />

            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] opacity-20" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] opacity-20" />
            </div>

            <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
                <div className="mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/60 mb-6">
                        <Activity className="w-3 h-3 text-emerald-500" />
                        Live Metrics
                    </div>
                    <h1 className="text-4xl md:text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 mb-3 tracking-tight font-serif italic">
                        System Analysis
                    </h1>
                    <p className="text-white/60 text-lg font-light max-w-2xl">
                        Real-time telemetry and dataset integrity monitoring.
                    </p>
                </div>

                {stats ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {/* Status Card */}
                            <div className="p-6 rounded-[2rem] bg-[#0F0F0F]/80 backdrop-blur-md border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-3 mb-6 text-white/40">
                                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                                        <Activity className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest">API Status</span>
                                </div>
                                <div className="text-3xl font-medium text-white capitalize flex items-center gap-3">
                                    {stats.status}
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                    </span>
                                </div>
                            </div>

                            {/* Database Rows */}
                            <div className="p-6 rounded-[2rem] bg-[#0F0F0F]/80 backdrop-blur-md border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-3 mb-6 text-white/40">
                                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                                        <Database className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest">Total Records</span>
                                </div>
                                <div className="text-3xl font-medium text-white">
                                    {stats.dataset_rows.toLocaleString()}
                                </div>
                            </div>

                            {/* Cities Tracked */}
                            <div className="p-6 rounded-[2rem] bg-[#0F0F0F]/80 backdrop-blur-md border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-3 mb-6 text-white/40">
                                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                                        <Server className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest">Cities Tracked</span>
                                </div>
                                <div className="text-3xl font-medium text-white">
                                    {stats.cities_tracked.length}
                                </div>
                            </div>

                            {/* Last Updated */}
                            <div className="p-6 rounded-[2rem] bg-[#0F0F0F]/80 backdrop-blur-md border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-3 mb-6 text-white/40">
                                    <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
                                        <HardDrive className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest">Latest Data</span>
                                </div>
                                <div className="text-3xl font-medium text-white truncate text-ellipsis overflow-hidden">
                                    {stats.last_updated}
                                </div>
                            </div>
                        </div>

                        {/* Detailed List */}
                        <div className="p-8 rounded-[2.5rem] bg-[#0F0F0F]/60 backdrop-blur-xl border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            <h3 className="text-white font-medium text-xl mb-6">Tracked Locations</h3>
                            <div className="flex flex-wrap gap-2">
                                {stats.cities_tracked.map((city: string) => (
                                    <span key={city} className="px-4 py-2 rounded-xl bg-white/5 text-white/80 text-sm border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-default">
                                        {city}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="p-10 text-center text-red-400 border border-red-500/10 rounded-[2rem] bg-red-500/5 mb-12">
                        Failed to load system statistics. Backend might be offline.
                    </div>
                )}
            </div>
        </div>
    );
}
