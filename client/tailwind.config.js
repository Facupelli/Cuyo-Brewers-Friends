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
      yellow: colors.yellow,
      white: colors.white,
      gray: colors.gray,
      blue1: '#0F7BA6',
      blueDark: '#0A5573',
      blueLight: '#16B4F2',
      brown1: '#592F00',
      brownLight: '#A65E0F',

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
