/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'grey': {
          1: '#9e9e9e',
          2: '#bbbbbb',
        }
      },
      fontFamily: {
        'body': ['Inter4', 'sans-serif'],
      },
      backgroundImage: {
        'btn-linear': 'repeating-linear-gradient(110deg,#504092,#504092 15px,#6062aa 0,#6062aa 30px)',
        'btn-linear-hover': 'repeating-linear-gradient(110deg,#4077aa,#4077aa 15px,#7596be 0,#7596be 30px)',
        'btn-linear-disabled': 'repeating-linear-gradient(110deg,#151626,#151626 15px,#252b3a 0,#252b3a 30px)',
      }
    },
  },
  plugins: [],
}

