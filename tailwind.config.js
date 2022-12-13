/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
