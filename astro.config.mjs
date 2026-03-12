import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import cloudflare from '@astrojs/cloudflare'; 

export default defineConfig({
  output: 'server', // <-- Das MUSS rein, sonst wirft Astro das Dashboard in den Müll!
  adapter: cloudflare(), 
  integrations: [
    react(),
    keystatic(),
    markdoc()
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});