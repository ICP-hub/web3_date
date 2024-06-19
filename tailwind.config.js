
 /** @type {import('tailwindcss').Config} */

 module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          custom: ['Poppins', 'Helvetica', 'sans-serif'],
          num: ['Poppins'],
          'viga': ['Viga', 'sans-serif'],

        },
        height: {
          vh: '200vh',
        },
        fontWeight: {
          custom: '600', 
        },
        fontSize: {
          'hover-lg': ['1.125rem', { hover: '1.25rem' }], 
        },
        colors: {
          'custom-red': '#c70039',
          'custom-orange':'#ff5733',
          'custom-purple': '#571845',
          'feedbackColor':'#d9d9d9',
          'walletColor':'#180C08'
        },
        translate: {
          'full': '100%',
          '-full': '-100%',
        },
        scale: {
          '90': '0.9',
        },
      },
    },
    plugins: [],
   }
   