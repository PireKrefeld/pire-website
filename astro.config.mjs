import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

// 🚀 DER GENIALE TRICK: Wir prüfen, ob Cloudflare gerade die Seite baut ("build") 
// oder ob du lokal an deinem PC arbeitest ("dev")
const isBuild = process.argv.includes('build');

export default defineConfig({
  // Lokal: Static (kein Server, lokales CMS läuft super). 
  // Live: Hybrid (Cloudflare bekommt seinen Server-Schnuller und baut das HTML).
  output: isBuild ? 'hybrid' : 'static', 
  
  // Der Adapter wird NUR beim Upload (Build) hochgefahren! Lokal bleibt er aus.
  adapter: isBuild ? cloudflare() : undefined, 
  
  integrations: [
    react(),
    keystatic(), // Bleibt an, damit deine .mdoc Texte gelesen werden!
    tailwind()
  ]
});