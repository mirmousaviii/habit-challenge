/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#6366F1', // indigo-500
          dark: '#4F46E5',    // indigo-600
        },
        danger: {
          DEFAULT: '#F43F5E', // rose-500
          dark: '#E11D48',    // rose-600
        },
      },
      borderRadius: {
        DEFAULT: '0.375rem', // rounded-md
      },
    },
  },
  plugins: [],
}
