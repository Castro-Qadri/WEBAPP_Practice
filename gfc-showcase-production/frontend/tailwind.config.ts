import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: 'rgb(186, 118, 58)',
          light: 'rgb(250, 248, 179)',
          dark: 'rgb(193, 128, 64)',
        },
        gfc: {
          50: 'rgb(255, 251, 235)',
          100: 'rgb(254, 243, 199)',
          200: 'rgb(253, 230, 138)',
          300: 'rgb(250, 248, 179)',
          400: 'rgb(193, 128, 64)',
          500: 'rgb(186, 118, 58)',
          600: 'rgb(161, 98, 48)',
          700: 'rgb(136, 78, 38)',
          800: 'rgb(111, 58, 28)',
          900: 'rgb(86, 38, 18)',
        },
        'primary': '#0a0a0a',
        'secondary': '#1a1a1a',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
