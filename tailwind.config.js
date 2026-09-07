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
          950: '#050B14', // Deepest ocean base
          900: '#0A1120', // Main command center background
          850: '#0E172A', // Container / Sidebar surface
          800: '#14223A', // Card / Panel surface
          750: '#192B48', // Hover state
          700: '#1E3558', // Subdued border
          600: '#2D4B7A', // Active border
          500: '#3D649F',
          400: '#608BC1',
          300: '#95B6DC',
          200: '#CBDCF0',
          100: '#E7EFF8',
        },
        ice: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
        },
        arctic: {
          teal: '#14B8A6',
          cyan: '#06B6D4',
          frost: '#E0F2FE',
        },
        telemetry: {
          safe: '#10B981',
          caution: '#F59E0B',
          hazard: '#EF4444',
          sensor: '#8B5CF6',
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
        'panel': '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
      },
      borderWidth: {
        '1': '1px',
      }
    },
  },
  plugins: [],
}
