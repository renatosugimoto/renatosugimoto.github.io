import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    excerpt: z.string().optional(),
    // Transform string to Date object
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    og_image: z.string().optional(),
    tags: z.union([z.string(), z.array(z.string())]).optional(),
    layout: z.string().optional(),
  }),
});

export const collections = { blog };
