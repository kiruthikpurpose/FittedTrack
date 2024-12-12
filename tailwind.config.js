/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          700: '#1a2942',
          800: '#162236',
          900: '#111927',
          950: '#0b111b',
        },
        green: {
          400: '#4ade80',
        },
      },
    },
  },
  plugins: [],
};