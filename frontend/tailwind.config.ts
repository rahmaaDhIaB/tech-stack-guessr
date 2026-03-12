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
        mono: ["'IBM Plex Mono'", "monospace"],
        display: ["'Syne'", "sans-serif"],
      },
      colors: {
        acid: "#C8F135",
        dark: "#0A0A0A",
        surface: "#111111",
        border: "#1E1E1E",
        muted: "#3A3A3A",
      },
      animation: {
        "scan": "scan 2s linear infinite",
        "pulse-acid": "pulseAcid 2s ease-in-out infinite",
        "fade-up": "fadeUp 0.5s ease forwards",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        pulseAcid: {
          "0%, 100%": { boxShadow: "0 0 0px #C8F135" },
          "50%": { boxShadow: "0 0 20px #C8F13588" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
