import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F5F8FC',
        paper2: '#EAF0F7',
        ink: '#0F1B2D',
        body: '#3A4A60',
        muted: '#64748B',
        accent: { DEFAULT: '#0E6E85', ink: '#095264', wash: '#E4F1F4' },
        band: { DEFAULT: '#D99A2B', ink: '#8A5D10', wash: '#FDF3E2' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: { xl2: '18px' },
      maxWidth: { measure: '64ch' },
    },
  },
  plugins: [],
}
export default config
