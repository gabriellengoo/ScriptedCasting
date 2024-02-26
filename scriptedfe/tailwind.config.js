/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      spacing: {
        // '6': '0rem', 
      },
    },
  },
  extend: {
    spacing: {
      // '6': '0rem', 
    },
  },
  plugins: [],
}

