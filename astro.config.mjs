import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import cloudflare from '@astrojs/cloudflare'; 

export default defineConfig({
  output: 'server', // <-- DER MOTOR MUSS REIN, DAMIT DER WÄCHTER GEBAUT WIRD!
  adapter: cloudflare(), // <-- DER ADAPTER VERHINDERT DEN CRASH!
  integrations: [
    react(),
    keystatic(),
    markdoc()
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});