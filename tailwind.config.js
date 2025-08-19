/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          500: '#5B21B6',
          600: '#4C1D95',
          700: '#4C1D95'
        },
        secondary: {
          500: '#8B5CF6'
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6'
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      animation: {
        'bounce-subtle': 'bounce-subtle 0.3s ease-out',
        'scale-check': 'scale-check 0.2s ease-out',
        'slide-up': 'slide-up 0.3s ease-out'
      },
      keyframes: {
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' }
        },
        'scale-check': {
          '0%': { transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}