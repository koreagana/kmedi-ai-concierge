/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy:    '#0a1628',
        navy2:   '#0d2244',
        lounge:  '#112c58',
        blue:    '#0066cc',
        'blue-light': '#0088ee',
        teal:    '#00b4d8',
        gold:    '#c49a3c',
        'gold-light': '#e8c76a',
        surface: '#f4f7fb',
        surface2:'#eef2f8',
      },
      fontFamily: {
        sans: ["'Noto Sans SC'", 'PingFang SC', 'Microsoft YaHei', 'system-ui', 'sans-serif'],
        mono: ["'Share Tech Mono'", 'SF Mono', 'Courier New', 'monospace'],
      },
      keyframes: {
        bounceDown: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGold: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(196,154,60,0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(196,154,60,0)' },
        },
      },
      animation: {
        bounceDown: 'bounceDown 2s ease-in-out infinite',
        fadeUp: 'fadeUp 0.6s ease-out both',
        shimmer: 'shimmer 3s linear infinite',
        pulseGold: 'pulseGold 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
