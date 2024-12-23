/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "my-green": " #338573",
      },
      backgroundImage: {
        saleBanner: "url('/bggirl2.png')",
      },
    },
  },
  plugins: [],
};
