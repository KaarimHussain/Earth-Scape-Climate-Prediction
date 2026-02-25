"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    FileText,
    BrainCircuit,
    Bell,
    CloudSun,
    Settings,
    LogOut
} from "lucide-react";

export function DashboardSidebar({ className }: { className?: string }) {
    const pathname = usePathname();

    const links = [
        { href: "/dashboard", label: "Data Visualization", icon: LayoutDashboard },
        { href: "/dashboard/reports", label: "Report Generator", icon: FileText },
        { href: "/dashboard/models", label: "ML Models", icon: BrainCircuit },
        { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
        { href: "/dashboard/predictions", label: "Predictions", icon: CloudSun },
        { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className={cn("flex flex-col h-full bg-black/40 backdrop-blur-xl border-r border-white/10", className)}>
            <div className="h-16 flex items-center px-6 border-b border-white/5">
                <Link href="/" className="flex items-center gap-2 font-ahsing text-4xl text-white hover:opacity-80 transition-opacity">
                    AERIS
                </Link>
            </div>

            <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;

                    return (
                        <Link key={link.href} href={link.href}>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start gap-3 h-12 text-base font-light",
                                    isActive
                                        ? "bg-primary/10 text-primary border border-primary/20"
                                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                {link.label}
                            </Button>
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-white/5">
                <Link href="/">
                    <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 hover:border hover:border-red-500/20">
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </Button>
                </Link>
            </div>
        </div>
    );
}
