import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 🚀 DIE NEUE MASTER-DATENBANK
const aktionen = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,mdoc}', base: './src/content/aktionen' }),
  schema: z.object({
    titel: z.string().optional(),
  }).catchall(z.any()) 
});

const buendnisse = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/buendnisse' }),
  schema: z.object({
    name: z.string().optional(),
  }).catchall(z.any())
});

const ui_texte = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/ui_texte' }),
  schema: z.object({
    sprache: z.string().optional()
  }).catchall(z.any()) 
});

export const collections = { aktionen, buendnisse, ui_texte };