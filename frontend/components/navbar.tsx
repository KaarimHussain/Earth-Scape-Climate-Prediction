"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Logo from "./logo";
import { Button } from "./ui/button";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1, ease: "easeInOut" }}
                className="flex items-center justify-between gap-5 py-5 px-5 sm:px-10 md:px-15 lg:px-18 xl:px-20 w-full fixed top-0 left-0 right-0 z-50"
            >
                <Logo
                    className="w-30 sm:w-50"
                    variant={isScrolled ? "white" : "black"}
                />
                <div className="flex items-center gap-3">
                    <Button variant={"outline"}
                        className="rounded-full  sm:text-xl sm:h-12 sm:px-7 border-none shadow-none">
                        Login
                    </Button>
                    <Button variant={"secondary"}
                        className="rounded-full sm:text-xl sm:h-12 sm:px-10">
                        Register
                    </Button>
                </div>
            </motion.div>

        </>
    )
}