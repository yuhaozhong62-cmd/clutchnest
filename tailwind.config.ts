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
        ink: "#08090a",
        panel: "#0c0d0f",
        line: "#24262b",
        mist: "#b5b7bc",
        valorant: "#e45160"
      },
      boxShadow: {
        glow: "0 0 50px rgba(228, 81, 96, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
