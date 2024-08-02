/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [
        function ({addUtilities}) {
            const newUtility = {
                ".hide-scrollbar::-webkit-scrollbar": {
                 display: "none"
                },
                ".hide-scrollbar": {
                    "-ms-overflow-style": "none",
                    "scrollbar-width": "none"
                  }
            }
            addUtilities(newUtility)
        }
      ],
  }
  