module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors:{
        'button':'#6933FF',
        'header':'#5429CC',
        'body':'#E5E5E5',
        'total-card':'#33CC95',
        'table-tittle':'#969CB2'
      },
      fontFamily:{
        'roboto':['Roboto', 'sans-serif']
      }
    },
    
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
