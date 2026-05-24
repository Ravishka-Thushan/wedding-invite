import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FFFDF7',
          100: '#FFF9F0',
          200: '#FFF3E0',
          300: '#FFE8C8',
        },
        champagne: {
          300: '#E8D5A3',
          400: '#D4B896',
          500: '#C9A96E',
          600: '#B8924A',
          700: '#9A7A3A',
        },
        blush: {
          100: '#FDF0F3',
          200: '#F9D9E1',
          300: '#F2C4CE',
          400: '#E8A0B0',
          500: '#D4789A',
        },
        mocha: {
          50: '#F5EDE8',
          100: '#E8D5CC',
          200: '#C4A090',
          300: '#8B6358',
          400: '#5C3D35',
          500: '#2C1810',
          600: '#1A0F0A',
        },
        sage: {
          100: '#EEF2EC',
          200: '#D4E0CE',
          300: '#A8C09C',
          400: '#7A9E6E',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        script: ['Great Vibes', 'cursive'],
        body: ['Lato', 'sans-serif'],
        accent: ['Playfair Display', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'petal-fall': 'petalFall 8s linear infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'shimmer': 'shimmer 2s infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(0.98)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A96E 0%, #E8D5A3 50%, #C9A96E 100%)',
        'ivory-gradient': 'linear-gradient(180deg, #FFF9F0 0%, #FFF3E0 100%)',
        'blush-gradient': 'linear-gradient(135deg, #F9D9E1 0%, #FDF0F3 100%)',
      },
      boxShadow: {
        'gold': '0 4px 30px rgba(201, 169, 110, 0.3)',
        'gold-lg': '0 8px 50px rgba(201, 169, 110, 0.4)',
        'soft': '0 4px 40px rgba(44, 24, 16, 0.08)',
        'soft-lg': '0 20px 60px rgba(44, 24, 16, 0.12)',
        'inner-soft': 'inset 0 2px 10px rgba(44, 24, 16, 0.05)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
export default config
