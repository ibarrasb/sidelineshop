/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sideline-bg': '#C5BAAF',
        'sideline-card': '#dad7cd',
        'sideline-accent': '#a5a58d',
        'sideline-text': '#323232',
        'sideline-logo': '#dad7cd'
      },
      fontFamily: {
        'dancing': ['Dancing Script', 'cursive'],
        'noto': ['Noto Sans KR', 'sans-serif']
      },
      maxWidth: {
        'app': '1230px'
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.line-clamp-3': {
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '3',
          overflow: 'hidden',
        },
      })
    }
  ],
}
