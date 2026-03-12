import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const termine = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/termine' }),
  schema: z.object({
    titel: z.string().optional(),
    eventTyp: z.string().nullish(),
    rhythmus: z.string().nullish(),      // NEU: Wiederkehrender Rhythmus
    monat: z.string().nullish(),         
    tag: z.string().nullish(),           
    exaktes_datum: z.string().nullish(), 
    uhrzeit: z.string().nullish(),
    ort: z.string().nullish(),
    beschreibung: z.string().nullish(),
  })
});

const projekte = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,mdoc}', base: './src/content/projekte' }),
  schema: z.object({
    titel: z.string().optional(),
    status: z.string().optional(),
    kurzbeschreibung: z.string().nullish(),
    box_infos: z.string().nullish(),
  }),
});

const buendnisse = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/buendnisse' }),
  schema: z.object({
    name: z.string().optional(),
    link: z.string().url().nullish().or(z.literal('').nullish()),
    logo: z.string().nullish(), 
  }),
});

export const collections = { termine, projekte, buendnisse };