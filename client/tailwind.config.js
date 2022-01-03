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
      blue: colors.blue,
      blue1: '#0F7BA6',
      blueDark: '#0A5573',
      blueLight: '#16B4F2',
      brown1: '#592F00',
      brownLight: '#A65E0F',
      1: "#ffe799",
      2: "#fed878",
      3: "#ffca5b",
      4: "#ffbf43",
      5: "#fcb124",
      6: "#f8a600",
      7: "#f39d01",
      8: "#ea8e00",
      9: "#e68501",
      10: "#df7c00",
      11: "#d77200",
      12: "#d06900",
      13: "#cb6300",
      14: "#c35801",
      15: "#bb5000",
      16: "#b74c01",
      17: "#b04401",
      18: "#a63e01",
      19: "#a13601",
      20: "#9d3301",
      21: "#4E2A0C",
      22: "#4A2727",
      23: "#361F1B",
      24: "#261716",
      25: "#231716",
      26: "#19100F",
      27: "#16100F",
      28: "#120D0C",
      29: "#100B0A",
      30: "#050B0A",
      black: '#000000'
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
