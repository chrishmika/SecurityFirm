/** @type {import('tailwindcss').Config} */
import scrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mjs}"],
  theme: {
    extend: {},
  },
  plugins: [scrollbarHide],
};
