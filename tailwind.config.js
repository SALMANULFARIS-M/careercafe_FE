/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        navy: "rgb(21,38,58)",
        beige: "#F5F5DC",
        walnut: "#5D3A00",
        camel: "#C19A6B",
        espresso: "#3B2F2F",
        mocha: "#7B4F42",
        cream: "#F5EFE6",
        latte: "#D6C3B0",
        gold: "#D4AF37",
        roast: "#2E1F1C",

      },
    },
  },
  plugins: [],
};
