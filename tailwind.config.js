const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            default: {
              "50": "#fafafa",
              "100": "#f2f2f3",
              "200": "#ebebec",
              "300": "#e3e3e6",
              "400": "#dcdcdf",
              "500": "#d4d4d8",
              "600": "#afafb2",
              "700": "#8a8a8c",
              "800": "#656567",
              "900": "#404041",
              "foreground": "#000",
              DEFAULT: "#d4d4d8",
            },
            primary: {
              "50": "#ebeaf9",
              "100": "#cecbf0",
              "200": "#b2ade8",
              "300": "#958fdf",
              "400": "#7971d7",
              "500": "#5c53ce",
              "600": "#4c44aa",
              "700": "#3c3686",
              "800": "#2c2762",
              "900": "#1c193e",
              "foreground": "#fff",
              DEFAULT: "#5c53ce",
            },
            // ... copia el resto de colores aquí tal como los tienes
            background: "#ffffff",
            foreground: "#000000",
            focus: "#006FEE",
            overlay: "#000000",
            content1: { DEFAULT: "#ffffff", foreground: "#000" },
            content2: { DEFAULT: "#f4f4f5", foreground: "#000" },
            content3: { DEFAULT: "#e4e4e7", foreground: "#000" },
            content4: { DEFAULT: "#d4d4d8", foreground: "#000" },
          },
        },
        dark: {
          colors: {
            default: {
              "50": "#0d0d0e",
              "100": "#19191c",
              "200": "#26262a",
              "300": "#323238",
              "400": "#3f3f46",
              "500": "#65656b",
              "600": "#8c8c90",
              "700": "#b2b2b5",
              "800": "#d9d9da",
              "900": "#ffffff",
              "foreground": "#fff",
              DEFAULT: "#3f3f46",
            },
            primary: {
              "50": "#1c193e",
              "100": "#2c2762",
              "200": "#3c3686",
              "300": "#4c44aa",
              "400": "#5c53ce",
              "500": "#7971d7",
              "600": "#958fdf",
              "700": "#b2ade8",
              "800": "#cecbf0",
              "900": "#ebeaf9",
              "foreground": "#fff",
              DEFAULT: "#5c53ce",
            },
            // ... copia el resto igual que arriba
            background: "#000000",
            foreground: "#ffffff",
            focus: "#006FEE",
            overlay: "#ffffff",
            content1: { DEFAULT: "#18181b", foreground: "#fff" },
            content2: { DEFAULT: "#27272a", foreground: "#fff" },
            content3: { DEFAULT: "#3f3f46", foreground: "#fff" },
            content4: { DEFAULT: "#52525b", foreground: "#fff" },
          },
        },
      },
      layout: {
        disabledOpacity: "0.5",
      },
    }),
  ],
};
