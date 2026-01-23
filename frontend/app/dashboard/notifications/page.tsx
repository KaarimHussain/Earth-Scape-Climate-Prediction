"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Bell, AlertTriangle, Info, CheckCircle } from "lucide-react";

export default function NotificationsPage() {
    const notifications = [
        { id: 1, title: "High Temperature Alert", message: "Unusual heat spike detected in Sector 7G (North Africa).", time: "10 mins ago", type: "critical" },
        { id: 2, title: "Model Training Complete", message: "EcoNet-Precipitation v2.1 has finished training successfully.", time: "1 hour ago", type: "success" },
        { id: 3, title: "Sensor Maintenance", message: "Scheduled maintenance for Pacific Ocean Buoy Network #42.", time: "4 hours ago", type: "info" },
        { id: 4, title: "Data Sync Warning", message: "Latency detected in satellite feed ingestion.", time: "6 hours ago", type: "warning" },
        { id: 5, title: "New Report Available", message: "The Q1 Climate Impact Assessment is ready for download.", time: "1 day ago", type: "info" },
    ];

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Notifications</h1>
                <p className="text-muted-foreground">Real-time system alerts and updates.</p>
            </div>

            <div className="space-y-4">
                {notifications.map((notif) => (
                    <Card key={notif.id} className="bg-white/5 border-white/10 backdrop-blur-md">
                        <CardContent className="flex gap-4 px-5">
                            <div className={`mt-1 p-2 rounded-full h-fit
                                ${notif.type === 'critical' ? 'bg-red-500/10 text-red-500' :
                                    notif.type === 'warning' ? 'bg-amber-500/10 text-amber-500' :
                                        notif.type === 'success' ? 'bg-green-500/10 text-green-500' :
                                            'bg-blue-500/10 text-blue-500'}`
                            }>
                                {notif.type === 'critical' && <AlertTriangle className="w-5 h-5" />}
                                {notif.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
                                {notif.type === 'success' && <CheckCircle className="w-5 h-5" />}
                                {notif.type === 'info' && <Info className="w-5 h-5" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-medium text-foreground">{notif.title}</h3>
                                    <span className="text-xs text-muted-foreground">{notif.time}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
