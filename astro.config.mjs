import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  adapter: cloudflare(),
  integrations: [react(), keystatic(), markdoc()],
  vite: { plugins: [tailwindcss()] }
});