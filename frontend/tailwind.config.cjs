/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.css"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
        },
        accent: {
          500: '#6366f1',
          400: '#818cf8',
        },
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
      }
    }
  },
  plugins: [],
}