/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    screens: {
      sm: { min: "320px", max: "767px" },
      md: { min: "768px", max: "1024px" },
      lg: { min: "1025px", max: "1280px" },
      xl: { min: "1281px" },
    },
    extend: {
      colors: {
        base: {
          A: "#F7F9FB",
          B: "#EEF1F7",
        },
        dark: {
          DEFAULT: "#4F4F4F",
          50: "#F6F6F6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#757575",
          600: "#5d5d5d",
          800: "#454545",
          900: "#3d3d3d",
          950: "#262626",
        },
        state: {
          R: "#ED695E",
          G: "#7FC964",
          Y: "#EDBC5E",
        },
        primary: {
          DEFAULT: "#787CFD",
          100: "#E4E5FF",
          200: "#C9CBFF",
          300: "#AFB1FF",
          500: "#787CFD",
          600: "#6164CC",
          700: "#494B99",
          800: "#303266",
          900: "#181933",
        },
      },
      fontSize: {
        h1B: ["32px", { fontWeight: "700", color: "262626" }],
        h1R: ["32px", { fontWeight: "400", color: "262626" }],
        h2B: ["28px", { fontWeight: "700", color: "262626" }],
        h2R: ["28px", { fontWeight: "400", color: "262626" }],
        h3B: ["24px", { fontWeight: "700", color: "262626" }],
        h3R: ["24px", { fontWeight: "400", color: "262626" }],

        str1Bt: ["22px", { lineHeight: 1, fontWeight: "700" }],
        str1Rt: ["22px", { lineHeight: 1, fontWeight: "400" }],
        str1B: ["22px", { fontWeight: "700" }],
        str1R: ["22px", { fontWeight: "400" }],

        str2Bt: ["20px", { lineHeight: 1, fontWeight: "700" }],
        str2Rt: ["20px", { lineHeight: 1, fontWeight: "400" }],
        str2B: ["20px", { fontWeight: "700" }],
        str2R: ["20px", { fontWeight: "400" }],

        p1Bt: ["16px", { lineHeight: 1, fontWeight: "700" }],
        p1Rt: ["16px", { lineHeight: 1, fontWeight: "400" }],
        p1B: ["16px", { fontWeight: "700" }],
        p1R: ["16px", { fontWeight: "400" }],

        p2Bt: ["14px", { lineHeight: 1, fontWeight: "700" }],
        p2Rt: ["14px", { lineHeight: 1, fontWeight: "400" }],
        p2B: ["14px", { fontWeight: "700" }],
        p2R: ["14px", { fontWeight: "400" }],

        span1Bt: ["12px", { lineHeight: 1, fontWeight: "700" }],
        span1Rt: ["12px", { lineHeight: 1, fontWeight: "400" }],
        span1B: ["12px", { fontWeight: "700" }],
        span1R: ["12px", { fontWeight: "400" }],

        span2Bt: ["10px", { lineHeight: 1, fontWeight: "700" }],
        span2Rt: ["10px", { lineHeight: 1, fontWeight: "400" }],
        span2B: ["10px", { fontWeight: "700" }],
        span2R: ["10px", { fontWeight: "400" }],

        divBt: ["8px", { lineHeight: 1, fontWeight: "700" }],
        divRt: ["8px", { lineHeight: 1, fontWeight: "400" }],
        divB: ["8px", { fontWeight: "700" }],
        divR: ["8px", { fontWeight: "400" }],
      },
      boxShadow: {
        /* <offset-x> | <offset-y> | <blur-radius> | <color> */
        key: "0 3px 8px 1px #787CFD13",
        bottomNav: "0 0 15px rgba(24, 25, 51, 0.12)",
        basic: "0 1px 8px #63636320",
        feedback: "0 0px 32px #18193325",
      },
      borderImage: {
        search: "linear-gradient(to right, #E4E5FF, #FFE7F1)",
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateX(-100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
