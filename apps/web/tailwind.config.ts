import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "var(--primary-color)",
        primaryColorLight: "var(--primary-color-light)",
        secondaryColor: "var(--secondary-color)",
        successColor: "var(--success-color)",
        warningColor: "var(--warning-color)",
        dangerColor: "var(--danger-color)",
        successBgColor: "var(--success-bg-color)",
        warningBgColor: "var(--warning-bg-color)",
        dangerBgColor: "var(--danger-bg-color)",
        successMidColor: "var(--success-mid-color)",
        warningMidColor: "var(--warning-mid-color)",
        dangerMidColor: "var(--danger-mid-color)",
        baseTextColor: "var(--base-text-color)",
        textLight: "var(--text-light)",
        baseBorderColor: "var(--base-border-color)",
        bgColor: "var(--bg-color)",
        timelineBg: "var(--timeline-bg)",
      },
    },
  },
  plugins: [],
};

export default config;
