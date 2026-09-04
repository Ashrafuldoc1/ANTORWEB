/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1F4A2E',
        'primary-dark': '#163820',
        secondary: '#2E7D46',
        cream: '#FAF7F0',
        gold: '#D9A441',
        ink: '#1A1A1A',
        muted: '#6B6B6B',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 6px 24px -10px rgba(31, 74, 46, 0.25)',
      },
    },
  },
  plugins: [],
};