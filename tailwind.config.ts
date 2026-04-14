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
          50: "#E6E7E9",
          100: "#CCCFD2",
          200: "#999FA5",
          300: "#666F78",
          400: "#333F4B",
          500: "#0A0F1E",
          600: "#080C18",
          700: "#060912",
          800: "#04060C",
          900: "#020306",
        },
        gold: {
          DEFAULT: "#C9A84C",
          50: "#F9F6ED",
          100: "#F3EDDB",
          200: "#E8DBB7",
          300: "#DCC993",
          400: "#D1B76F",
          500: "#C9A84C",
          600: "#A1863D",
          700: "#79652E",
          800: "#50431E",
          900: "#28210F",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        dm: ["var(--font-dm-sans)", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(to right, #C9A84C, #E8C97A, #C9A84C)",
        "dark-gradient": "linear-gradient(to bottom, #0A0F1E, #111827)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delay": "float 6s ease-in-out 1.5s infinite",
        "float-delay-2": "float 6s ease-in-out 3s infinite",
        fadeUp: "fadeUp 0.5s ease-out forwards",
        "fadeUp-1": "fadeUp 0.5s ease-out 0.1s forwards",
        "fadeUp-2": "fadeUp 0.5s ease-out 0.2s forwards",
        "fadeUp-3": "fadeUp 0.5s ease-out 0.3s forwards",
        ticker: "ticker 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        gold: "0 4px 14px 0 rgba(201, 168, 76, 0.39)",
        "gold-lg": "0 10px 25px -5px rgba(201, 168, 76, 0.4)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
        "card-hover": "0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 20px rgba(201, 168, 76, 0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
