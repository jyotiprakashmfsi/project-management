import { Config } from "tailwindcss"
  
  /** @type {import('tailwindcss').Config} */
  const config: Config = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  
      // Or if using `src` directory:
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          hBlack : '#191919',
          hGray : "#D9D9D9",
          hWhite: "#f8fafa",
          hGreen : "#BAD472",
          hBlue : "#DEF0FA",
        },
      },
      
    },
  };
  
export default config