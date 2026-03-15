import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

export default defineConfig({
  // 🚀 DER MAGISCHE SCHALTER: Wir zwingen Astro, reines HTML zu bauen!
  output: 'static', 
  
  integrations: [
    react(),
    keystatic(),
    tailwind()
  ]
});