import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        mb: { max: "455px" },
        tsm: { min: "455px", max: "666px" },
        sm: { min: "666px", max: "810px" },
        md: { min: "810px", max: "1023px" },
        lg: { min: "1024px", max: "1116px" },
        xl: { min: "1116px", max: "1535px" },
        xxl: { min: "1536px" },
      },
    },
  },
  plugins: [],
};
export default config;
