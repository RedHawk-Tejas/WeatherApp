/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('../public/images/25501.jpg')",
      }
      
    },
  },
  plugins: [],
}