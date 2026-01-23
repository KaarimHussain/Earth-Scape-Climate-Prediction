"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Printer } from "lucide-react";

export default function ReportsPage() {
    const reports = [
        { id: "R-2025-001", title: "Q1 Climate Impact Assessment", date: "Jan 15, 2025", type: "PDF" },
        { id: "R-2024-048", title: "Annual Emissions Summary", date: "Dec 31, 2024", type: "PDF" },
        { id: "R-2024-042", title: "Regional Anomaly Analysis: SE Asia", date: "Nov 28, 2024", type: "CSV" },
        { id: "R-2024-039", title: "Sensor Network Health Report", date: "Nov 15, 2024", type: "PDF" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl text-white font-bold">Report Generator</h1>
                    <p className="text-muted-foreground">Generate and download comprehensive climate intelligence reports.</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-black">Generate New Report</Button>
            </div>

            <div className="grid gap-4">
                {reports.map((report) => (
                    <Card key={report.id} className="bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                        <CardContent className="flex items-center justify-between px-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-foreground">{report.title}</h3>
                                    <p className="text-sm text-muted-foreground">Generated on {report.date} • {report.type}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="hover:text-primary"><Printer className="w-4 h-4" /></Button>
                                <Button variant="ghost" size="icon" className="hover:text-primary"><Download className="w-4 h-4" /></Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
