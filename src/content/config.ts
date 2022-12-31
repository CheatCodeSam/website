import { z, defineCollection } from 'astro:content';

const dateSchema = z.preprocess((arg) => {
  if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
}, z.date());

const blog = defineCollection({
  schema: {
    id: z.number(),
    url: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    createdAt: dateSchema,
    thumbnail: z.object({
      src: z.string(),
      alt: z.string(),
      format: z.string().optional(),
      width: z.number().optional(),
      height: z.number().optional(),
      aspectRatio: z.string().optional(),
    }).optional(),
  }
});

const projects = defineCollection({
  schema: {
    title: z.string(),
    url: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    createdAt: dateSchema,
    thumbnail: z.object({
      src: z.string(),
      alt: z.string(),
      format: z.string().optional(),
      width: z.number().optional(),
      height: z.number().optional(),
      aspectRatio: z.string().optional(),
    }).optional(),
  }
});

export const collections = {
  blog,
  projects
};
