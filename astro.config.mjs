import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

export default defineConfig({
  integrations: [
    react(), 
    markdoc(), 
    tailwind(), 
    keystatic()
  ],
  
  // 🚀 HIER STARTEN WIR DEN PLATIN-STANDARD MOTOR
  i18n: {
    // Die Standardsprache deiner Seite
    defaultLocale: 'de',
    
    // Alle Sprachen, die wir in Zukunft unterstützen wollen
    locales: ['de', 'ku', 'en', 'tr'],
    
    // Wie sollen die URLs aussehen?
    routing: {
      // 'de' bleibt auf der Hauptdomain (pire.de/), die anderen bekommen Ordner (pire.de/ku/)
      prefixDefaultLocale: false,
      
      // Fallback-Strategie, wenn eine Seite noch nicht übersetzt ist
      fallbackType: 'redirect',
    },
    
    // Fallback-Regeln (Wenn jemand Türkisch sucht, aber es noch nicht da ist, zeige Deutsch)
    fallback: {
      ku: 'de',
      tr: 'de',
      en: 'de'
    }
  }
});