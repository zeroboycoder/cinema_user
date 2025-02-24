import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui(
    {
    prefix:"my-theme",
    addCommonColors:true,
    defaultExtendTheme:'dark',
    defaultTheme:'dark',
    layout:{
    },themes:{
        'dark':{
            layout:{
                boxShadow: {
                    // shadow-small
                    small:
                      "0px 4px 15px 0px rgb(255 255 255 / 0.01), 0px 4px 15px 0px rgb(255 255 255 / 0.05), 0px 4px 15px 0px rgb(255 255 255 / 0.2)",
                    // shadow-medium
                    medium:
                      "0px 4px 15px 0px rgb(255 255 255 / 0.03), 0px 4px 30px 0px rgb(255 255 255 / 0.08), 0px 4px 1px 0px rgb(255 255 255 / 0.3)",
                    // shadow-large
                    large:
                      "0px 4px 30px 0px rgb(255 255 255 / 0.04), 0px 30px 60px 0px rgb(255 255 255 / 0.12), 0px 0px 1px 0px rgb(255 255 255 / 0.3)",
                  },
                fontSize: {
                  tiny: "0.65rem", 
                  small: "0.824rem", 
                  medium: "1rem", 
                  large: "1.125rem", 
                },
                radius: {
                  small: "0.45rem",   
                  medium: "0.45rem", 
                  large: "0.45rem", 
                },
                borderWidth: {
                  small: "1px", 
                  medium: "2px", 
                  large: "3px", 
                },
              },
              colors:{
                 background:'#1A2232',
                 foreground:"#FFFFFF",
                 primary:{
                    DEFAULT:"#FC6D19",
                    foreground:"#FFFFFF",
                    50:"#fff6ed",
                    100:"#ffebd4",
                    200:"#ffd4a9",
                    300:"#ffb472",
                    400:"#fd8a3a",
                    500:"#fc6d19",
                    600:"#ed4e09",
                    700:"#c4390a",
                    800:"#9c2d10",
                    900:"#7d2811"
                 },
                 secondary:{
                    DEFAULT:"#1F293D",
                    foreground:"#FFFFFF",
                    50:"#f4f6fb",
                    100:"#e9edf5",
                    200:"#ced9e9",
                    300:"#a3b8d6",
                    400:"#7192bf",
                    500:"#4f74a8",
                    600:"#3c5b8d",
                    700:"#324a72",
                    800:"#2c4060",
                    900:"#293751"
                 }
              }   
        }
    }
})],
}
