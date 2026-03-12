// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc'; // <-- NEU

export default defineConfig({
  output: 'static',
  integrations: [
    react(),
    keystatic(),
    markdoc() // <-- NEU: Astro kann jetzt die CMS-Texte lesen
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});