import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

export default defineConfig({
  // 🚀 Zwingt Astro, reines, extrem schnelles HTML zu bauen (Keine 404-Fehler mehr!)
  output: 'static', 
  
  integrations: [
    react(),
    keystatic(),
    tailwind()
  ]
});