import { z, defineCollection } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    id: z.number(),
    url: z.string().url().optional(),
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    createdAt: z.string().or(z.date()).transform(str => new Date(str)),
    updatedAt: z.string().or(z.date()).transform(str => new Date(str)).optional(),
    thumbnail: z.object({
      src: z.string(),
      alt: z.string(),
      format: z.enum(['avif', 'jpeg', 'png', 'webp']).optional(),
      width: z.number(),
      height: z.number()
    }).optional(),
    links: z.array(z.object({
      url: z.string(),
      text: z.string().optional(),
      img: z.object({
        src: z.string(),
        darkThemeSrc: z.string().optional(),
        alt: z.string()
      }).optional()
    })).optional()
  })
});

const projects = defineCollection({
  schema: z.object({
    url: z.string().url().optional(),
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    createdAt: z.string().or(z.date()).transform(str => new Date(str)),
    updatedAt: z.string().or(z.date()).transform(str => new Date(str)).optional(),
    thumbnail: z.object({
      src: z.string(),
      alt: z.string(),
      format: z.enum(['avif', 'jpeg', 'png', 'webp']).optional(),
      width: z.number(),
      height: z.number()
    }).optional(),
    links: z.array(z.object({
      url: z.string(),
      text: z.string().optional(),
      img: z.object({
        src: z.string(),
        darkThemeSrc: z.string().optional(),
        alt: z.string()
      }).optional()
    })).optional()
  })
});

export const collections = {
  blog,
  projects
};
