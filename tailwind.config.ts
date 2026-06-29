import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Thematic accent colors
        ironman: {
          dark: "#1a0808",
          red: "#dc2626",
          gold: "#fbbf24",
          neon: "#38bdf8",
        },
        cap: {
          navy: "#1e3a8a",
          blue: "#2563eb",
          red: "#b91c1c",
          star: "#f8fafc",
          sepia: "#fef3c7",
        },
        thor: {
          cosmic: "#4c1d95",
          thunder: "#67e8f9",
          purple: "#9333ea",
          gold: "#f59e0b",
        },
        guardians: {
          purple: "#7c3aed",
          magenta: "#db2777",
          neonGreen: "#10b981",
          cyan: "#06b6d4",
          orange: "#f97316",
        },
        avengers: {
          deepNavy: "#0f172a",
          gold: "#eab308",
          epicBlue: "#3b82f6",
          crimson: "#e11d48",
        },
      },
      animation: {
        pulseFast: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        spinSlow: "spin 20s linear infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(56, 189, 248, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(56, 189, 248, 0.9)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
