"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await register(username, email, password);
            // Optionally auto-login or just redirect
            router.push("/auth/login");
        } catch (err: any) {
            console.error(err);
            const specificError = err.response?.data?.message || "Registration failed. Please try again.";
            setError(specificError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-background text-foreground overflow-hidden">
            {/* Left Side - Visual & Branding */}
            <div className="hidden lg:flex w-1/2 relative bg-black items-center justify-center overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] opacity-20" />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="absolute top-[-50%] left-[-50%] h-[200%] w-[200%] hero-bg opacity-40 blur-3xl animate-pulse-slow"
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 p-12 text-center max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h1 className="text-8xl font-ahsing text-white mb-2 drop-shadow-2xl">
                            Rise With Us
                        </h1>
                        <p className="text-xl text-white/80 font-light tracking-[0.2em] uppercase">
                            Join the Network
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="mt-12 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10"
                    >
                        <p className="text-white/90 italic font-light leading-relaxed">
                            "Be part of the solution. Contribute to the world's most comprehensive climate intelligence database."
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Register Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background relative">
                <Link href={"/"}>
                    <Button variant="outline" className="absolute top-4 left-4">
                        <ArrowLeft className="h-5 w-5" />
                        Go Back
                    </Button>
                </Link>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md space-y-8"
                >

                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight">Create an account</h2>
                        <p className="text-muted-foreground mt-2">
                            Enter your details to get started with Aerith.
                        </p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="username" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="username"
                                    placeholder="Choose a username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="pl-10 h-12 bg-secondary/10 border-input focus:border-primary/50 transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-12 bg-secondary/10 border-input focus:border-primary/50 transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="password"
                                    placeholder="Create a password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 h-12 bg-secondary/10 border-input focus:border-primary/50 transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <Button disabled={loading} className="w-full h-12 text-base font-medium shadow-lg hover:shadow-primary/25 transition-all duration-300">
                            {loading ? "Creating Account..." : "Create Account"} <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-muted/50" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or
                            </span>
                        </div>
                    </div>

                    <div className="text-center text-sm">
                        <span className="text-muted-foreground">Already have an account? </span>
                        <Link
                            href="/auth/login"
                            className="font-medium text-primary hover:underline hover:text-primary/80 transition-colors"
                        >
                            Sign in
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}