/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        polar: {
          950: '#F8FAFC', // Slate 50 - Main canvas background
          900: '#FFFFFF', // Pure White - Surface / Panels
          850: '#FFFFFF', // Pure White - Cards
          800: '#F1F5F9', // Slate 100 - Secondary surface / Hover
          750: '#E2E8F0', // Slate 200 - Borders
          700: '#CBD5E1', // Slate 300 - Active borders
          600: '#94A3B8', // Slate 400 - Muted
          500: '#64748B', // Slate 500 - Secondary text
          400: '#475569', // Slate 600 - Body text
          300: '#334155', // Slate 700 - Dark text
          200: '#1E293B', // Slate 800 - Headings
          100: '#0F172A', // Slate 900 - Deepest text
        },
        ice: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0284C7', // Sky 600
          600: '#0369A1', // Sky 700
          700: '#075985', // Sky 800
        },
        navy: {
          950: '#0B132B',
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
        },
        arctic: {
          teal: '#0D9488',
          cyan: '#0284C7',
          frost: '#F8FAFC',
        },
        telemetry: {
          safe: '#059669',
          caution: '#D97706',
          hazard: '#E11D48',
          sensor: '#7C3AED',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          '"Fira Code"',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        'panel': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.03)',
        'panel-hover': '0 6px 16px -2px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
        'subtle': '0 1px 2px 0 rgba(15, 23, 42, 0.04)',
        'card': '0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
        'glow-ice': '0 0 12px -2px rgba(2, 132, 199, 0.25)',
        'glow-emerald': '0 0 12px -2px rgba(5, 150, 105, 0.25)',
        'glow-amber': '0 0 12px -2px rgba(217, 119, 6, 0.25)',
        'glow-rose': '0 0 12px -2px rgba(225, 29, 72, 0.25)',
        'inner-glow': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      borderWidth: {
        '1': '1px',
      },
      animation: {
        'radar-spin': 'radarSpin 5s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'ping-slow': 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        radarSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}

