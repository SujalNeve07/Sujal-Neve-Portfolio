/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: 'var(--canvas)',
          alt: 'var(--canvas-alt)',
          pure: 'var(--canvas-pure)',
        },
        surface: {
          1: 'var(--surface-1)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3)',
          glass: 'var(--surface-glass)',
        },
        accent: {
          green: {
            DEFAULT: 'var(--accent-green)',
            hover: 'var(--accent-green-hover)',
            dark: 'var(--accent-green-dark)',
            glow: 'var(--accent-green-glow)',
          },
          lime: {
            DEFAULT: 'var(--accent-lime)',
            light: 'var(--accent-lime-light)',
            badge: 'var(--accent-lime-badge)',
            'badge-text': 'var(--accent-lime-badge-text)',
          },
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          faint: 'var(--text-faint)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          medium: 'var(--border-medium)',
          strong: 'var(--border-strong)',
          green: 'var(--border-green)',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(2.75rem, 6.5vw, 5.75rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'display': ['clamp(2.25rem, 4.5vw, 3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'heading-lg': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.18', letterSpacing: '-0.02em' }],
        'heading': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
      },
      boxShadow: {
        'glow-green': '0 0 25px -4px var(--accent-green-glow)',
        'surface-card': 'var(--shadow-surface-card)',
        'surface-elevated': 'var(--shadow-surface-elevated)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
