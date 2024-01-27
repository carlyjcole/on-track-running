module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        lightblue: 'rgb(172, 209, 239)',
        mediumblue: 'rgb(94, 113, 129)',
        lightestblue: 'rgb(217, 229, 238)', 
      },
      fontFamily: {
        wotfard: ['wotfard']
      },
    },
    keyframes: {
      wiggle: {
        "0%, 100%": { transform: "rotate(360deg)" },
        "50%": { transform: "rotate(0deg)" },
      },
      spinner: {
        "0%": { transform: "rotate(360deg)" },
        "100%": { transform: "rotate(0deg)" },
      },
    },
    animation: {
      rotater: "spinner 10s linear infinite",
      wiggle: "wiggle 10s linear infinite",
    },
  },
  variants: {},
  plugins: [],
}
