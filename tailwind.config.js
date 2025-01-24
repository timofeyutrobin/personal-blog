/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      boxShadow: {
        'DEFAULT': '0 0 8px',
        'bars': '0 0 4px',
      }
    },
  },
  plugins: [],
  darkMode: 'selector',
}
