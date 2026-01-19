import Image from "next/image";
import LogoWhite from "@/assets/image/Logo-White.png";
import LogoBlack from "@/assets/image/Logo-Black.png";

interface LogoProps {
    variant?: "white" | "black";
    className?: string;
}

export default function Logo({ variant = "black", className }: LogoProps) {
    return (
        <>
            <Image className={className} src={variant === "white" ? LogoWhite : LogoBlack} alt="Logo" />
        </>
    )
}