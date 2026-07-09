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
        paper: "#faf9f6",
        panel: "#eeece6",
        shade: "#e3ded2",
        ink: "#161513",
        muted: "#84807a",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
        heading: ["var(--font-lexend)", "sans-serif"],
        description: ["var(--font-poppins)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
