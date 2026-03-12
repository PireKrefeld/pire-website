import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';

export default defineConfig({
  // Kein Adapter, kein Output, reiner Standard.
  integrations: [
    react(),
    keystatic(),
    markdoc()
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});