import type { Metadata } from "next";
import { Inter, MuseoModerno } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const museoModerno = MuseoModerno({
  variable: "--font-museo-moderno",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aeris — Climate Intelligence Platform",
  description:
    "Aeris is an AI-powered climate intelligence platform that analyzes environmental data to predict climate patterns, risks, and long-term trends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${museoModerno.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
