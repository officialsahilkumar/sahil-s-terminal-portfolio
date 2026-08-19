/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#4682B4',
        'custom-skyblue': 'skyblue',
        'custom-bgcolor': '#040C11',
      },
    },
  },
  plugins: [],
};
