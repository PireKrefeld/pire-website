import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const termine = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/termine' }),
  schema: z.object({
    titel: z.string().optional(),
    eventTyp: z.object({
      discriminant: z.string(),
      value: z.any(),
    }).optional(),
    uhrzeit: z.string().nullish(),
    ort: z.string().nullish(),
    beschreibung: z.string().nullish(),
  })
});

const projekte = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,mdoc}', base: './src/content/projekte' }),
  schema: z.object({
    titel: z.string().optional(),
    status: z.object({
      discriminant: z.string(),
      value: z.any(),
    }).optional(),
    kurzbeschreibung: z.string().nullish(),
    fakten: z.array(
      z.object({
        icon: z.string().optional(),
        bezeichnung: z.string().optional(),
        wert: z.string().optional(),
      })
    ).optional().default([]),
  }),
});

const buendnisse = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/buendnisse' }),
  schema: z.object({
    name: z.string().optional(),
    link: z.string().url().nullish().or(z.literal('').nullish()),
    logo: z.string().nullish(), 
    weisses_logo: z.boolean().optional(), // 🚀 NEU: Erlaubt das weiße Logo bei Bündnissen
  }),
});

export const collections = { termine, projekte, buendnisse };