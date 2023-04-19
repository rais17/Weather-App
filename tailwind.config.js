/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {

      screens: {
        begin: '0px',
        midler: '380px',
      },

      fontFamily: {
        merriWeather: ["Merriweather Sans", "sans-serif"],
      },

      colors: {
        colorDark1: ["#112D4E"],
        colorDark2: ["#3F72AF"],
        colorLight1: ["#DBE2EF"],
        colorLight2: ["#F9F7F7"],
      },

      backgroundImage: {
        backGrad: ["linear-gradient(160deg, #112d4e 0%, #3f72af 100%)"],
      },

      backgroundColor: {
        tabBgColor: ["rgba(219, 226, 239, 0.5)"],
      },
    },
  },
  plugins: [],
};
