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
        // Sage / Eucalyptus Green
        sage: {
          50:  '#F2F7F2',
          100: '#E0EBE0',
          200: '#BDD1BC',
          300: '#93B392',
          400: '#6A9569',
          500: '#4E7050', // primary accent
          600: '#3E5A3F',
          700: '#2E4330', // footer / dark CTA backgrounds
          800: '#1E2D20',
          900: '#111A12',
        },
        // Champagne / Warm Sand Gold
        gold: {
          50:  '#FAF6EC',
          100: '#F4EAD0',
          200: '#E8D5A0',
          300: '#D9BC6E',
          400: '#C9A24A', // primary gold accent
          500: '#B8893A',
          600: '#9A7230',
          700: '#7A5A26',
          800: '#5C431C',
          900: '#3D2D12',
        },
        // Warm Neutral — overrides Tailwind's default cool-gray neutral
        neutral: {
          50:  '#FAF8F5', // page background
          100: '#F2EDE6', // section tint
          200: '#E8E0D6', // deeper cream
          300: '#D5CBC0', // borders light
          400: '#B8ADA0', // placeholder text, borders medium
          500: '#8A8078', // body text light
          600: '#635A52', // body text
          700: '#3F3830', // body text dark (primary)
          800: '#211D18', // almost black
          900: '#0F0C09', // near black
        },
      },

      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)',    'system-ui', 'sans-serif'],
      },

      fontSize: {
        '8xl':  ['6rem',    { lineHeight: '1.0',  letterSpacing: '-0.025em' }],
        '7xl':  ['5rem',    { lineHeight: '1.05', letterSpacing: '-0.02em'  }],
        '6xl':  ['4rem',    { lineHeight: '1.1',  letterSpacing: '-0.02em'  }],
        '5xl':  ['3.25rem', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        '4xl':  ['2.5rem',  { lineHeight: '1.2',  letterSpacing: '-0.01em'  }],
        '3xl':  ['2rem',    { lineHeight: '1.25', letterSpacing: '-0.01em'  }],
        '2xl':  ['1.5rem',  { lineHeight: '1.35' }],
        'xl':   ['1.25rem', { lineHeight: '1.45' }],
        'lg':   ['1.125rem',{ lineHeight: '1.6'  }],
        'base': ['1rem',    { lineHeight: '1.65' }],
        'sm':   ['0.875rem',{ lineHeight: '1.6'  }],
        'xs':   ['0.75rem', { lineHeight: '1.55' }],
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },

      maxWidth: {
        site:       '1280px',
        'prose-lg': '72ch',
        prose:      '65ch',
        'prose-sm': '55ch',
      },

      boxShadow: {
        'card':      '0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
        'card-hover':'0 8px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
        'navbar':    '0 1px 0 rgba(0,0,0,0.06)',
        'gold-glow': '0 0 0 1px rgba(201,162,74,0.3), 0 4px 24px rgba(201,162,74,0.12)',
      },

      transitionTimingFunction: {
        'smooth':    'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'out-expo':  'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-quart':  'cubic-bezier(0.5, 0, 0.75, 0)',
      },

      transitionDuration: {
        '400':  '400ms',
        '600':  '600ms',
        '700':  '700ms',
        '800':  '800ms',
        '900':  '900ms',
        '1200': '1200ms',
      },

      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)'    },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)'     },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)'    },
        },
      },

      animation: {
        'fade-in-up':   'fadeInUp 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'fade-in':      'fadeIn 600ms ease both',
        'slide-in-left':'slideInLeft 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'scale-in':     'scaleIn 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
      },
    },
  },
  plugins: [],
}

export default config
