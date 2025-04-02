const heroui = require('@heroui/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ✅ เพิ่ม darkMode ให้อยู่ด้านบน
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/heroui/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}" // ✅ เพิ่ม path ตามที่ HeroUI แจ้ง
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Mitr', 'sans-serif'],
      },
    },
  },
  plugins: [heroui()], // ✅ โหลด plugin HeroUI ถูกต้อง
};
