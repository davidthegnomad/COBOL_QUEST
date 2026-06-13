import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                fantasy: ["var(--font-cinzel)", "serif"],
                medieval: ["var(--font-cinzel)", "serif"], // Alias for compatibility
                mono: ["var(--font-courier)", "monospace"],
            },
            backgroundImage: {
                "parchment-texture": "url('/parchment-bg.png')",
            },
            colors: {
                parchment: {
                    light: "#efe5d1",
                    DEFAULT: "#e6d5b0",
                    dark: "#d1c098",
                },
                ink: {
                    light: "#4a4a4a",
                    DEFAULT: "#2d2a26",
                    dark: "#1a1a1a",
                },
                gold: {
                    DEFAULT: "#d4af37",
                    50: "#fffbeb",
                    100: "#fef3c7",
                    200: "#fde68a",
                    300: "#fcd34d",
                    400: "#fbbf24",
                    500: "#d4af37", // Base Gold
                    600: "#b49224",
                    700: "#927419",
                    800: "#735a14",
                    900: "#57430f",
                    hover: "#fcc200",
                },
                stone: {
                    DEFAULT: "#7a7a7a",
                    dark: "#4a4a4a",
                },
            },
        },
    },
    plugins: [],
};
export default config;
