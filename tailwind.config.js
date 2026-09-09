/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F6F1E7",
        creamdark: "#EBE2D0",
        pine: "#3F5D52",
        pinedark: "#2E4640",
        terracotta: "#C1694F",
        terracottadark: "#A2543D",
        ink: "#3A332C",
      },
      fontFamily: {
        serif: ["'Noto Serif JP'", "serif"],
        sans: ["'Noto Sans JP'", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
      letterSpacing: {
        wide2: "0.08em",
      },
    },
  },
  plugins: [],
};
