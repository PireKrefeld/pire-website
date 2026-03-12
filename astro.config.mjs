import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import cloudflare from '@astrojs/cloudflare'; 

export default defineConfig({
  // KEIN output-Befehl! Du hast recht, Astro 5 macht das im Standard (static) perfekt.
  adapter: cloudflare(), // Der Adapter MUSS rein, das hat den Fehler gerade verursacht.
  integrations: [
    react(),
    keystatic(),
    markdoc()
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});