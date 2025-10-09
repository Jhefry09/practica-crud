/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Asegurar que Tailwind procese las clases de @apply
  corePlugins: {
    preflight: true,
  },
}
