/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      // colors: {
      //   'blue-btn-menu': '#243c5a',
      // },// na pas fonctionné !!!!
      flex:{'2':'0 0 15rem'}
    },
  },
  plugins: [],
}

