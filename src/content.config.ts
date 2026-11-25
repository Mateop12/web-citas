import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Artículos del blog. title incluye la marca y no pasa de 60 caracteres (lo que muestra Google).
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(60),
    description: z.string().max(160),
    h1: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // Slugs de PRODUCT_PAGES que se enlazan al final del artículo.
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
