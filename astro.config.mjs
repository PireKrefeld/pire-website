import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc'; 

// Wir prüfen, ob du lokal arbeitest ('dev')
const isDev = process.argv.includes('dev');

export default defineConfig({
  output: 'static', 
  
  integrations: [
    react(),
    markdoc(), // 🚀 Der wahre Held: Er liest die Texte.
    tailwind(),
    // 🚀 Der Türsteher: Lokal hast du dein Dashboard, 
    // online wird Keystatic gelöscht. Kein Server, kein Adapter nötig!
    ...(isDev ? [keystatic()] : [])
  ]
});