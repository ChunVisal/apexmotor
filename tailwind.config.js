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
        primary: '#0077FF',
        secondary: '#00C897', 
        dark: '#1F2937', 
        light: '#F9FAFB',
        card: '#FFFFFF',
        blue: '#2384C1', 
      },
      fontFamily: {
        base: ['Poppins', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
        Ancizar: ['Ancizar', 'sans-serif'],
        Roboto: ['Roboto', 'sans-serif'],
        RobotoMono: ['Roboto Mono', 'monospace'],
      },
      backgroundImage: {
        'hero-pattern': "url('/assets/hero.jpg')",
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
