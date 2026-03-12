// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import cloudflare from '@astrojs/cloudflare'; // <-- Der Übersetzer für den Server

export default defineConfig({
  // WIR LASSEN DAS OUTPUT FELD WEG! Astro macht das jetzt vollautomatisch richtig.
  adapter: cloudflare(), // <-- Das ist das einzige Puzzleteil, das Cloudflare gefehlt hat
  integrations: [
    react(),
    keystatic(),
    markdoc()
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});