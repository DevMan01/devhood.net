/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Tesla-inspired tokens
        accent: '#3E6AE1',
        ink: '#171A20',
        graphite: '#393C41',
        pewter: '#5C5E62',
        silver: '#8E8E8E',
        cloud: '#EEEEEE',
        ash: '#F4F4F4',
      },
      fontFamily: {
        sans: [
          '"Inter"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      borderRadius: {
        tesla: '4px',
      },
      transitionTimingFunction: {
        tesla: 'cubic-bezier(0.5, 0, 0, 0.75)',
      },
      transitionDuration: {
        tesla: '330ms',
      },
      backdropBlur: {
        glass: '18px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
