/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'logo': "url('to-do-list.jpg')",
        "todo":"url('todo.svg')"
      },
      spacing:{

        85:'22rem',
        90:'25.5rem',
        98:'29rem',
        100:'35rem',
        110:'40rem'

      },
      screens: {
        'phone': '10px'},
      fontSize: {
        xss: ['1.1rem', { lineHeight: '1rem' }],
        '1xl': ['2rem', { lineHeight: '0.5rem' }]
      }
    
    },
  },
  plugins: [],
}

