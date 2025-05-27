// tailwind.config.ts
import { defineConfig } from "tailwindcss";

export default defineConfig({
  theme: {
    fontFamily: {
      sans: ["Roboto", "system-ui"],
    },
    extend: {
      colors: {
        orange: {
          50: "#FDEFEC",
          100: "#FCDBD5",
          200: "#F8B7AA",
          300: "#F59380",
          400: "#F16F55",
          500: "#EE4D2D",
          600: "#D03111",
          700: "#9C240D",
          800: "#681808",
          900: "#340C04",
          950: "#1C0702",
        },
      },
    },
  },
  safelist: [
    {
      pattern: /border-primary-(50|100|200|300|400|500|600|700|800|950)/,
      variants: ["hover", "focus"],
    },
  ],
});
