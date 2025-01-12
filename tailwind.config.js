/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      boxShadow: {
        'DEFAULT': "0 0 8px"
      }
    },
  },
  plugins: [],
}
