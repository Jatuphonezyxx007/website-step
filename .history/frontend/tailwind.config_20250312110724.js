// const {heroui} = require('@heroui/theme');
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "./node_modules/heroui/**/*.{js,ts,jsx,tsx}",
//     "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['Mitr', 'sans-serif'],
//       },
//     },
//   },
//   darkMode: "class",
//   plugins: [heroui()],
// }





// /** @type {import('tailwindcss').Config} */
// const heroui = require("@heroui/theme");

// module.exports = {
//   darkMode: "class", // ✅ ต้องแน่ใจว่ามี darkMode
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}" // ✅ เพิ่ม path ของ HeroUI ให้ถูกต้อง
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ["Mitr", "sans-serif"],
//       },
//     },
//   },
//   plugins: [heroui()], // ✅ ตรวจสอบว่ามี heroui()
// };
/** @type {import('tailwindcss').Config} */
const heroui = require("@heroui/theme");

module.exports = {
  darkMode: "class", // ✅ ต้องมี darkMode: "class"
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}", // ✅ ต้องมี path นี้
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Mitr", "sans-serif"],
      },
    },
  },
  plugins: [heroui.theme], // ✅ ต้องใช้ `heroui.theme` **ไม่ต้องมี ()**
};
