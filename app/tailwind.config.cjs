/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b', // Zinc 950
        foreground: '#fafafa', // Zinc 50
        card: '#18181b', // Zinc 900
        cardForeground: '#fafafa',
        primary: '#ffffff',
        primaryForeground: '#09090b',
        muted: '#27272a', // Zinc 800
        mutedForeground: '#a1a1aa', // Zinc 400
        accent: '#27272a',
        accentForeground: '#fafafa',
        border: '#27272a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // We are dropping Orbitron for a cleaner look
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E\")",
      }
    },
  },
  plugins: [],
}