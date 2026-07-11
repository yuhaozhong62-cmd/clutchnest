import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        panel: "#0b0b0c",
        line: "#1f1f22",
        mist: "#a7a7ad",
        valorant: "#ff4655"
      },
      boxShadow: {
        glow: "0 0 60px rgba(255, 70, 85, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
