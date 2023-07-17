/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: 'rgb(55,55,56)',
        darker: 'rgb(40,40,41)',
      },
      fontFamily: {
        // Add or modify the default font
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
