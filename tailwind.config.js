/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#050505', 
        cardBg: 'rgba(20, 20, 20, 0.7)',
        accentNeon: '#00f3ff', 
        accentPurple: '#bc13fe', 
      },
    },
  },
  plugins: [],
}
