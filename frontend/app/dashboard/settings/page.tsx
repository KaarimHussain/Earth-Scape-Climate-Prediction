"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Bell, Shield, Palette } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <h1 className="text-4xl tracking-tight text-white font-bold">System Settings</h1>

            <div className="grid gap-6">
                <Card className="bg-black/40 border-white/10 backdrop-blur-xl">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="p-2 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Update your personal details</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">First Name</label>
                                <Input className="bg-white/5 border-white/10" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                                <Input className="bg-white/5 border-white/10" placeholder="Doe" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Email</label>
                            <Input className="bg-white/5 border-white/10" placeholder="john.doe@example.com" />
                        </div>
                        <div className="pt-2 flex justify-end">
                            <Button>Save Changes</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-black/40 border-white/10 backdrop-blur-xl">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="p-2 w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <Bell className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                                <CardTitle>Notifications</CardTitle>
                                <CardDescription>Manage your alert preferences</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {['Email Alerts for Critical Events', 'Weekly Summary Reports', 'System Health Updates'].map((item) => (
                            <div key={item} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                <span className="text-sm">{item}</span>
                                <div className="h-5 w-9 rounded-full bg-primary/20 p-0.5 cursor-pointer">
                                    <div className="h-4 w-4 rounded-full bg-primary shadow-sm" />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
