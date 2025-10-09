/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#fdf7f0',
          100: '#f9ede0',
          200: '#f2d8c0',
          300: '#e8b894',
          400: '#dd9366',
          500: '#d4733a',
          600: '#c65a2e',
          700: '#a54728',
          800: '#843a26',
          900: '#6b3022',
        }
      }
    },
  },
  plugins: [],
}
