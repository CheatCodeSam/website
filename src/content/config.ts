import { z, defineCollection } from 'astro:content';

const dateSchema = z.preprocess((arg) => {
  if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
}, z.date());

const blog = defineCollection({
  slug: ({ defaultSlug }) => {
    let parts = defaultSlug.split('/');
    let year = parts[0];
    let id = parts[1].split('-')[0];
    let title = parts[1].slice(3);
    return `${year}/${id}/${title}`;
  },
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
  slug: ({ defaultSlug }) => {
    let id = defaultSlug.split('-')[0];
    let title = defaultSlug.slice(3);
    return `${id}/${title}`;
  },
  schema: {
    id: z.number(),
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
