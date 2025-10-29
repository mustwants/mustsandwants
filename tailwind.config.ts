import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mwGreen: "#8ABA4E",
        mwAqua: "#74E4B8",
        mwLime: "#D1EE00",
        mwPink: "#F20359",
        mwBlack: "#000000",
        mwWhite: "#FFFFFF",
      },
      fontFamily: {
        heading: ['"Hoglar Bold"', "sans-serif"],
        subheading: ['"Roboto Condensed"', "sans-serif"],
        body: ["Roboto", "sans-serif"],
      },
      gradientColorStops: {
        mw: ["#74E4B8", "#D1EE00"],
      },
    },
  },
  plugins: [],
};

export default config;
