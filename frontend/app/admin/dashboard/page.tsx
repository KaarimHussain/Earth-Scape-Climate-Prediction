import AdminNavbar from "@/components/admin-navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");

    if (!token) {
        redirect("/admin/login");
    }

    return (
        <div className="min-h-screen bg-secondary font-sans selection:bg-emerald-500/30">
            <AdminNavbar />

            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] opacity-20" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] opacity-20" />
            </div>

            <div className="container mx-auto px-6 py-32 relative z-10">
                {/* Welcome Header */}
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/60 mb-6">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        System Online
                    </div>
                    <h1 className="text-5xl md:text-7xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 mb-6 tracking-tight font-serif italic">
                        Admin Dashboard
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
                        Welcome back. Monitor system performance, manage user requests, and analyze climate data streams in real-time.
                    </p>
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {/* Status Card */}
                    <div className="p-8 rounded-[2rem] bg-[#0F0F0F]/80 backdrop-blur-md border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all duration-500">
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                            <div className="w-16 h-16 rounded-full border-2 border-emerald-500 dashed animate-spin-slow" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-white/40 font-bold text-xs uppercase tracking-widest mb-4">System Status</h3>
                            <div className="flex items-center gap-4">
                                <span className="flex h-4 w-4 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 shadow-lg shadow-emerald-500/50"></span>
                                </span>
                                <span className="text-3xl font-medium text-white">Operational</span>
                            </div>
                            <p className="mt-4 text-sm text-white/40">All services running normally.</p>
                        </div>
                    </div>

                    {/* Quick Link: Requests */}
                    <a href="/admin/requests" className="group p-8 rounded-[2rem] bg-[#0F0F0F]/80 backdrop-blur-md border border-white/5 relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:bg-white/5">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium text-white mb-2">User Requests</h3>
                            <p className="text-white/40 text-sm font-light">View and manage incoming feedback and contact form submissions.</p>
                            <div className="mt-8 flex items-center text-white/60 text-sm group-hover:text-white transition-colors gap-2">
                                View Inbox <span className="text-lg leading-none">&rarr;</span>
                            </div>
                        </div>
                    </a>

                    {/* Quick Link: Analytics */}
                    <a href="/admin/analytics" className="group p-8 rounded-[2rem] bg-[#0F0F0F]/80 backdrop-blur-md border border-white/5 relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:bg-white/5">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium text-white mb-2">System Analytics</h3>
                            <p className="text-white/40 text-sm font-light">Monitor backend performance, dataset integrity, and API health.</p>
                            <div className="mt-8 flex items-center text-white/60 text-sm group-hover:text-white transition-colors gap-2">
                                View Data <span className="text-lg leading-none">&rarr;</span>
                            </div>
                        </div>
                    </a>
                </div>

                {/* Simple Activity Feed (Mock) - Visual Only */}
                <div className="rounded-[2.5rem] bg-[#0F0F0F]/50 border border-white/5 p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <h2 className="text-2xl font-medium text-white mb-8 flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-white/20 rounded-full" />
                        Recent System Activity
                    </h2>

                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-start gap-4 pb-6 border-b border-white/5 last:border-0 last:pb-0">
                                <div className="w-2 h-2 rounded-full bg-white/20 mt-2" />
                                <div>
                                    <p className="text-white/80 text-sm">System routine check completed successfully.</p>
                                    <p className="text-white/30 text-xs mt-1 font-mono">Today, {10 + i}:00 AM</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
