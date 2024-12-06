/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    screens: {
      'sm': '540px',
      'md': '850px',
      'lg': '1140px',
    },
    plugins: [],
  }
}
