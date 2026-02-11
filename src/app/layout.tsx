import type { Metadata } from "next";
import { Cinzel, Courier_Prime } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/context/GameContext";

const cinzel = Cinzel({
    subsets: ["latin"],
    variable: "--font-cinzel",
    display: "swap",
});

const courier = Courier_Prime({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-courier",
    display: "swap",
});

export const metadata: Metadata = {
    title: "The Elder Code",
    description: "A quest for the Golden Record - Learn COBOL Magic",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${cinzel.variable} ${courier.variable} font-fantasy antialiased`}>
                <GameProvider>
                    {children}
                </GameProvider>
            </body>
        </html>
    );
}
