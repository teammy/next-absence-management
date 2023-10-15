import { type Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          100: '#5528FF',
        }
      }
    },
  },
  plugins: [nextui({
    addCommonColors: true,
  })],
} satisfies Config;
