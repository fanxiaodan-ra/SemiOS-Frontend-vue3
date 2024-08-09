/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'grey': {
          1: '#9e9e9e',
          2: '#bbbbbb',
          3: '#bbbaba',
          4: '#757575',
        },
        'main': {
          1: '#b3b5f2'
        },
        'primary': {
          1: '#8C91FF',
          2: '#C2C5FF',
          3: '#B3B5F2'
        },
        'w': {
          1: '#fff',
          2: '#f3f3f3'
        }
      },
      borderColor: {
        purple: '#2F305B',
      },
      fontFamily: {
        'body': ['Inter4', 'sans-serif'],
      },
      backgroundImage: {
        'btn-linear': 'repeating-linear-gradient(110deg,#504092,#504092 15px,#2F305B 0,#2F305B 30px)',
        'btn-linear-hover': 'repeating-linear-gradient(110deg,#4077aa,#4077aa 15px,#7596be 0,#7596be 30px)',
        'btn-linear-disabled': 'repeating-linear-gradient(110deg,#151626,#151626 15px,#1A1F2E 0,#1A1F2E 30px)',
      },
      backgroundColor: {
        card: {
          1: '#1A1F2E',
          2: '#1F2435'
        }
      },
    },
  },
  plugins: [],
}

