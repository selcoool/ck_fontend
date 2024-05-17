/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'background_00': "url('/public/assets/bg01.jpeg')",
        'background_01': "url('/public/assets/bg02.jpeg')",
        'background_02':"url('/public/assets/bg03.jpeg')",
        // 'background_logout':"url('/public/assets/logout.jpeg')",
        // 'background_detail':"url('/public/assets/detailbg.jpeg')"
        
      }
    },
  },
  plugins: [],
}
