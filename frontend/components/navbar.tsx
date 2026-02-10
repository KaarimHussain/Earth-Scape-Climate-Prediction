"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Logo from "./logo";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { LogOut, User } from "lucide-react";
import { LogoutModal } from "./logout-modal";

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, logout } = useAuth();
    const router = useRouter();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        if (pathname === "/") {
            const handleScroll = () => {
                setIsScrolled(window.scrollY > 200);
            };

            // Initial check
            handleScroll();

            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        } else {
            // Always use the "scrolled" (white) style on other pages
            setIsScrolled(true);
        }
    }, [pathname]);

    const handleLogoutConfirm = () => {
        setShowLogoutModal(false);
        logout();
        router.push("/");
    };

    return (
        <>
            <motion.div
                initial={pathname === "/" ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
                className="flex items-center justify-between gap-5 py-5 container mx-auto px-5 sm:px-10 md:px-15 lg:px-18 xl:px-20 w-full fixed top-0 left-0 right-0 z-50"
            >
                <Link href="/">
                    <Logo
                        className="w-25 sm:w-30"
                        variant={isScrolled ? "white" : "black"}
                    />
                </Link>
                <div className="hidden md:flex items-center gap-6">
                    {user ? (
                        // Logged In Links
                        <>
                            <Link href="/predict" className={`text-sm font-medium ${isScrolled ? "text-white" : "text-black"} hover:opacity-80 transition-opacity`}>
                                Prediction
                            </Link>
                            <Link href="/analysis" className={`text-sm font-medium ${isScrolled ? "text-white" : "text-black"} hover:opacity-80 transition-opacity`}>
                                Analysis
                            </Link>
                            <Link href="/feedback" className={`text-sm font-medium ${isScrolled ? "text-white" : "text-black"} hover:opacity-80 transition-opacity`}>
                                Feedback
                            </Link>
                            <Link href="/notifications" className={`text-sm font-medium ${isScrolled ? "text-white" : "text-black"} hover:opacity-80 transition-opacity`}>
                                Alerts
                            </Link>
                        </>
                    ) : (
                        // Guest Links
                        <>
                            <Link href="/about" className={`text-sm font-medium ${isScrolled ? "text-white" : "text-black"} hover:opacity-80 transition-opacity`}>
                                About
                            </Link>
                            <Link href="/blogs" className={`text-sm font-medium ${isScrolled ? "text-white" : "text-black"} hover:opacity-80 transition-opacity`}>
                                Blogs
                            </Link>
                            <Link href="/feedback" className={`text-sm font-medium ${isScrolled ? "text-white" : "text-black"} hover:opacity-80 transition-opacity`}>
                                Feedback
                            </Link>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <Link href="/profile">
                                <Button variant="ghost" size="icon" className={`rounded-full hover:bg-white/10 ${isScrolled ? "text-white" : "text-black"}`}>
                                    <User className="w-5 h-5" />
                                </Button>
                            </Link>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`rounded-full hover:bg-red-500/10 hover:text-red-500 ${isScrolled ? "text-white" : "text-black"}`}
                                onClick={() => setShowLogoutModal(true)}
                            >
                                <LogOut className="w-5 h-5" />
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href={"/auth/login"}>
                                <Button variant={"outline"}
                                    className="rounded-full sm:text-md sm:px-7 border-none shadow-none text-black">
                                    Login
                                </Button>
                            </Link>
                            <Link href={"/auth/register"}>
                                <Button variant={"secondary"}
                                    className="rounded-full sm:text-md sm:px-10">
                                    Register
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </motion.div>

            <LogoutModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogoutConfirm}
            />
        </>
    )
}
