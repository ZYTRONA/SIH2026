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
        monochrome: {
          950: '#09090B', // Pure Deep Black
          900: '#18181B', // Dark Zinc
          800: '#27272A',
          700: '#3F3F46',
          600: '#52525B', // Charcoal Muted
          500: '#71717A', // Secondary text
          400: '#A1A1AA',
          300: '#D4D4D8', // Light Border
          200: '#E4E4E7', // Subtle Divider
          100: '#F4F4F5', // Soft Surface
          50: '#FAFAFA',  // Off-white canvas
        },
        polar: {
          950: '#FFFFFF', // Pure White Main canvas
          900: '#FFFFFF', // Pure White - Surface / Panels
          850: '#FFFFFF', // Pure White - Cards
          800: '#F4F4F5', // Zinc 100 - Secondary surface / Hover
          750: '#E4E4E7', // Zinc 200 - Borders
          700: '#D4D4D8', // Zinc 300 - Active borders
          600: '#A1A1AA', // Zinc 400 - Muted
          500: '#71717A', // Zinc 500 - Secondary text
          400: '#52525B', // Zinc 600 - Body text
          300: '#27272A', // Zinc 800 - Dark text
          200: '#18181B', // Zinc 900 - Headings
          100: '#09090B', // Zinc 950 - Deepest Black text
        },
        ice: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0284C7',
          600: '#0369A1',
          700: '#075985',
        },
        navy: {
          950: '#09090B',
          900: '#18181B',
          800: '#27272A',
          700: '#3F3F46',
        },
        arctic: {
          teal: '#0D9488',
          cyan: '#0284C7',
          frost: '#FAFAFA',
        },
        telemetry: {
          safe: '#16A34A',
          caution: '#D97706',
          hazard: '#DC2626',
          sensor: '#6366F1',
        }
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
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
        'panel': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.02)',
        'panel-hover': '0 6px 16px -2px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.04)',
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 8px 24px -4px rgba(0, 0, 0, 0.1), 0 2px 6px -2px rgba(0, 0, 0, 0.04)',
        'glow-ice': '0 0 12px -2px rgba(2, 132, 199, 0.25)',
        'inner-glow': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
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

