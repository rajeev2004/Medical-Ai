/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B6FF0",
        accent: "#06B6D4",
        muted: "#6B7280",
        bg: "#F8FAFC",
      },
    },
  },
  plugins: [],
};
