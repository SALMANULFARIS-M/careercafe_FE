/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        navy: 'rgb(21,38,58)', // Custom color for your gradient
      },
    },
  },
  plugins: [],
}
