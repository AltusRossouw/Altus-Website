/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'electric-blue': '#00D4FF',
        'neon-green': '#39FF14',
        'nature-green': '#228B22',
        'earth-gold': '#DAA520',
        'mountain-grey': '#4A5568',
        'cyber-purple': '#8B5CF6',
        'circuit-orange': '#FF6B35',
        'dark-bg': '#050505',
        'dark-card': '#121212',
        'dark-border': '#2A2A2B',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'circuit-flow': 'circuit-flow 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%': {
            boxShadow: '0 0 5px currentColor',
          },
          '100%': {
            boxShadow: '0 0 20px currentColor, 0 0 30px currentColor',
          },
        },
        'circuit-flow': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'display': ['Space Grotesk', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
