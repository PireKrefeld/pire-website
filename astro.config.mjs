import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

const isBuild = process.argv.includes('build');

export default defineConfig({
  // 🚀 DU HATTEST RECHT: Nur "static". Kein "hybrid" mehr.
  output: 'static', 
  
  // Der Adapter springt nur beim Upload an, damit es online keinen Error gibt
  // und lässt dich lokal in Ruhe arbeiten.
  adapter: isBuild ? cloudflare() : undefined, 
  
  integrations: [
    react(),
    keystatic(), 
    tailwind()
  ]
});