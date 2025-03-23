import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#126cff",
        primaryColorLight: "#e9efff",
        secondaryColor: "#3f37c9",
        successColor: "#4caf50",
        warningColor: "#ff9800",
        dangerColor: "#f44336",
        successBgColor: "#f0fff0",
        warningBgColor: "#fff8e6",
        dangerBgColor: "#fff0f0",
        baseTextColor: "#333",
        textLight: "#666",
        baseBorderColor: "#e1e4e8",
        bgColor: "#f8f9fa",
        cardBg: "#ffffff",
      },
    },
  },
  plugins: [],
};

export default config;
