/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      height: {
        'searchBar':'38px',
      },
      width: {
        'searchBar':'327px'
      },
      colors: {
        green: {
          650: '#63D838',
        },
        purple: {
          150: '#EEE3FF',
          650: '#8054C7',
          750: '#5A3696'
        },
      }
    },
  },
  plugins: [],
}