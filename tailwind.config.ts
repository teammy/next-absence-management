import { type Config } from 'tailwindcss';
import {nextui} from "@nextui-org/react";
import colors from 'tailwindcss/colors';

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        secondary: colors.sky,
        success: colors.green,
        danger: colors.red,
        info: colors.cyan,
        warn: colors.yellow,
        default: colors.gray,
      },
    },
  },
  plugins: [nextui()],
} satisfies Config;
