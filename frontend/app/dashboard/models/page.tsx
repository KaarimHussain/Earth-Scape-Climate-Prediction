"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw } from "lucide-react";

export default function ModelsPage() {
    const models = [
        { name: "Aerith-v4.2 (Global Temp)", status: "Active", accuracy: "98.4%", lastTrain: "2 hrs ago", type: "LSTM" },
        { name: "EcoNet-Precipitation", status: "Training", accuracy: "N/A", lastTrain: "In Progress", type: "Transformer" },
        { name: "Carbon-Flux-Estimator", status: "Active", accuracy: "94.1%", lastTrain: "1 day ago", type: "Random Forest" },
        { name: "Anomaly-Detector-Pro", status: "Maintenance", accuracy: "89.2%", lastTrain: "3 days ago", type: "Isolation Forest" },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Machine Learning Models</h1>
                <p className="text-muted-foreground">Monitor and manage the AI models powering the Aerith platform.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {models.map((model) => (
                    <Card key={model.name} className="bg-white/5 border-white/10 backdrop-blur-md">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-medium">{model.name}</CardTitle>
                            <Badge variant="outline" className={model.status === "Active" ? "border-green-500 text-green-500" : model.status === "Training" ? "border-blue-500 text-blue-500" : "border-amber-500 text-amber-500"}>
                                {model.status}
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                                <div>
                                    <p className="text-muted-foreground">Accuracy</p>
                                    <p className="text-xl font-bold mt-1">{model.accuracy}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Architecture</p>
                                    <p className="font-medium mt-1">{model.type}</p>
                                </div>
                                <div className="col-span-2 pt-2 border-t border-white/5 flex items-center gap-2 text-muted-foreground">
                                    <RefreshCw className={`w-3 h-3 ${model.status === "Training" ? "animate-spin" : ""}`} />
                                    Last trained: {model.lastTrain}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
