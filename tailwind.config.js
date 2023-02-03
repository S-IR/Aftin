/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Kaushan: ["Kahushan Script"],
      },
      animation: {
        blob: "blob 4s infinite",
      },
      keyframes: {
        blob: {
          0: {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px)scale(1.2)",
          },
          "66%": {
            transform: "translate(20px, -20px)scale(0.8)",
          },
          "100%": {
            transform: "translate(0px, 0px)scale(1)",
          },
        },
      },
      colors: {
        brown: {
          50: "#fdf8f6",
          100: "#f2e8e5",
          200: "#eaddd7",
          300: "#e0cec7",
          400: "#d2bab0",
          500: "#bfa094",
          600: "#a18072",
          700: "#977669",
          800: "#846358",
          900: "#43302b",
        },
      },
    },
  },
  plugins: [],
};
