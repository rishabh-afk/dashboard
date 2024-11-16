// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JSX/TSX files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0655FF",
      },
      animation: {
        "fade-up": "fadeUp 1s ease-in-out",
        "fade-down": "fadeDown 1s ease-in-out",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeDown: {
          "0%": { opacity: "0", transform: "translateY(-25px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
