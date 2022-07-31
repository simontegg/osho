import { defineConfig } from 'vite-plugin-windicss';

export default defineConfig({
  darkMode: false,
  theme: {
    extend: {
      maxWidth: {
        tablet: '40rem'
      },
      minHeight: {
        main: '29rem'
      },
      spacing: {
        prim: '2.55rem',
        arrow: '13.4rem'
      }
    },
  },
});
