import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
      "2xl": "1540px",
    },
    fontFamily: {
      rubik: ["Rubik", "sans-serif"],
    },
    extend: {
      colors: {
        primary: {
          1: "#252626",
          2: "#5d6974",
          3: "#f8d73a",
          4: "#f6fbff",
          5: "#F5F6F8",
        },
      },
    },
  },
  variants: {
    scrollbar: ["rounded"],
  },
} satisfies Config;
