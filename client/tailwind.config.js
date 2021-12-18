const colors = require("tailwindcss/colors");
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      orange: colors.orange,
      amber: colors.amber,
      white: colors.white,
      gray: colors.gray,
    },
  },
  extend: {
    fontFamily: {
      sans:['Heebo', 'sans-serif'],
      serif:['Frank Ruhl Libre', 'serif'],
    }
  },
  variants: {
    extend: {},
  },
};
