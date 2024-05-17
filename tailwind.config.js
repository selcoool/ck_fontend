/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'background_sidebar': "url('/public/assets/bg01.jpeg')",
        'background_sidebar2': "url('/public/assets/bg02.jpeg')",
        // 'background_logout':"url('/public/assets/logout.jpeg')",
        // 'background_logout':"url('/public/assets/logout.jpeg')",
        // 'background_detail':"url('/public/assets/detailbg.jpeg')"
        
      }
    },
  },
  plugins: [],
}
