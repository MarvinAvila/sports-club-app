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
          // Añade colores para el tema claro
          light: {
            900: '#f8fafc',
            800: '#f1f5f9',
            700: '#e2e8f0',
          }
        },
        accent: {
          500: '#6366f1',
          400: '#818cf8',
        },
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        // Añade colores base para ambos temas
        background: {
          dark: '#020617',
          light: '#ffffff'
        },
        text: {
          dark: '#f8fafc',
          light: '#020617'
        }
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out forwards',
      }
    }
  },
  plugins: [],
}