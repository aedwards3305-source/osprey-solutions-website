import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#070A0B",
          dark: "#0B0F10",
          darker: "#0E1315",
          card: "#111819",
          border: "#1A2425",
          emerald: "#0B5D3B",
          "emerald-light": "#0E7A4E",
          "emerald-glow": "#14A868",
          gold: "#D4AF37",
          "gold-light": "#E4C65B",
          "gold-dim": "#A08520",
          text: "#E7E7E1",
          muted: "#9CA3A0",
          subtle: "#6B7370",
        },
      },
      fontFamily: {
        sans: [
          "Satoshi",
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "Clash Display",
          "Satoshi",
          "system-ui",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(135deg, #070A0B 0%, #0B1A14 40%, #0B0F10 100%)",
        "card-gradient":
          "linear-gradient(145deg, rgba(11,24,25,0.8) 0%, rgba(14,19,21,0.6) 100%)",
        "emerald-gradient":
          "linear-gradient(135deg, #0B5D3B 0%, #0E7A4E 100%)",
      },
      animation: {
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "fade-in": "fade-in 0.6s ease-out",
        "aurora-1": "aurora-1 22s ease-in-out infinite",
        "aurora-2": "aurora-2 28s ease-in-out infinite",
        "aurora-3": "aurora-3 34s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-slower": "float 11s ease-in-out infinite",
        "draw": "draw 1.6s ease-out forwards",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "aurora-1": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(8%, 6%) scale(1.18)" },
        },
        "aurora-2": {
          "0%, 100%": { transform: "translate(0, 0) scale(1.1)" },
          "50%": { transform: "translate(-10%, -4%) scale(0.92)" },
        },
        "aurora-3": {
          "0%, 100%": { transform: "translate(0, 0) scale(0.95)" },
          "50%": { transform: "translate(6%, -8%) scale(1.12)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "draw": {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [],
}
export default config
