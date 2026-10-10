// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://gena.monkeymindtech.com',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'auto' },
  vite: {
    plugins: [tailwindcss()],
  },
});
