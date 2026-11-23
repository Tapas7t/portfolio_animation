/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(var(--bg) / <alpha-value>)',
        surface: 'hsl(var(--surface) / <alpha-value>)',
        text: 'hsl(var(--text) / <alpha-value>)',
        muted: 'hsl(var(--muted) / <alpha-value>)',
        stroke: 'hsl(var(--stroke) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        display: ['"Instrument Serif"', 'serif'],
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
      },
      keyframes: {
        'scroll-down': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(8px)', opacity: '0.4' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'role-fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'scroll-down': 'scroll-down 2s cubic-bezier(0.65, 0, 0.35, 1) infinite',
        'role-fade-in': 'role-fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
