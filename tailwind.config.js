module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./componets/**/*.{js,ts,jsx,tsx}", // Fix typo in folder name if necessary
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          500: "#34d399",
          700: "#047857",
        },
        gray: {
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          500: "#6b7280",
        },
        whatsappGreen: "#dcf8c6",
      },
      maxWidth: {
        "70%": "70%",
      },
    },
  },
  plugins: [],
};
