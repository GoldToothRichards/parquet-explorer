import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      screens: {
        tall: { raw: '(min-height: 800px)' }
      },
      animation: {
        fade: 'fadeIn .25s ease-in-out'
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        }
      },
      colors: {
        'lavender-blue': {
          50: '#f2f3ff',
          100: '#e4e7ff',
          200: '#c9cfff',
          300: '#aeb8ff',
          400: '#93a0ff',
          500: '#7888ff',
          600: '#606dcc',
          700: '#485299',
          800: '#303666',
          900: '#181b33'
        }
      }
    }
  }
};

export default config;
