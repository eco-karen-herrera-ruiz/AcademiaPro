import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A0F1E",
          800: "#111827",
          700: "#1a2236",
          600: "#243050",
        },
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E8C97A",
          dark: "#a8872e",
          muted: "rgba(201,168,76,0.2)",
        },
        cream: "#F5F0E8",
        surface: "rgba(255,255,255,0.04)",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        dm: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        goldLine: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        drawerIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delay": "float 6s ease-in-out infinite 2s",
        "float-delay-2": "float 6s ease-in-out infinite 4s",
        fadeUp: "fadeUp 0.6s ease forwards",
        "fadeUp-1": "fadeUp 0.6s ease 0.1s forwards",
        "fadeUp-2": "fadeUp 0.6s ease 0.2s forwards",
        "fadeUp-3": "fadeUp 0.6s ease 0.3s forwards",
        "fadeUp-4": "fadeUp 0.6s ease 0.4s forwards",
        ticker: "ticker 30s linear infinite",
        "ticker-fast": "ticker 20s linear infinite",
        drawerIn: "drawerIn 0.3s ease forwards",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        gold: "0 0 30px rgba(201,168,76,0.15)",
        "gold-lg": "0 0 60px rgba(201,168,76,0.2)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 48px rgba(0,0,0,0.6)",
      },
      screens: {
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
export default config;
