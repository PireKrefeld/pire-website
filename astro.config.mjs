import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';
import markdoc from '@astrojs/markdoc'; // 🚀 DER FEHLENDE ÜBERSETZER!

export default defineConfig({
  output: 'static', 
  adapter: cloudflare(), 
  
  integrations: [
    react(),
    markdoc(), // 🚀 HIER IST ER WIEDER! Ohne den sind deine Projekte unsichtbar.
    keystatic(), 
    tailwind()
  ]
});