// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        walnut: "#1c1815",
        walnutdeep: "#141110",
        ivory: "#f2ece2",
        brass: "#b8925a",
        brassbright: "#d4ab78",
        muted: "#9c9186",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 20% 20%, rgba(184,146,90,0.06), transparent 40%), radial-gradient(circle at 80% 60%, rgba(184,146,90,0.05), transparent 45%)",
      },
    },
  },
  plugins: [],
};

export default config;
