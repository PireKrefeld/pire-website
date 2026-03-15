import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';
import markdoc from '@astrojs/markdoc'; 

const isDev = process.argv.includes('dev');

export default defineConfig({
  output: 'static', 
  
  adapter: isDev ? undefined : cloudflare(), 
  
  integrations: [
    react(),
    markdoc(), 
    keystatic(), 
    tailwind()
  ]
});