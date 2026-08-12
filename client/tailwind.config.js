/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // custom colors used across the app, matching the assignment brief
        primary: "#1E3A8A", // deep blue
        secondary: "#F97316", // orange
        background: "#F3F4F6", // light grey
      },
    },
  },
  plugins: [],
};
