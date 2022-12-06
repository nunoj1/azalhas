/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}",
            "./components/**/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        mainbg: "var(--bg-color)",
        component: "var(--component-color)",
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        tertiary: "var(--tertiary-color)",
        quaternary: "var(--quaternary-color)",
        'futsal': "var(--futsal-color)",
        'education': "var(--education-color)",
        'music': "var(--music-color)",
        'charity': "var(--charity-color)"
      }
    },
  },
  plugins: [],
};
