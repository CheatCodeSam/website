import { z, defineCollection } from 'astro:content';

const blog = defineCollection({
  schema: ({ image }) => z.object({
    id: z.number(),
    url: z.string().url().optional(),
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    createdAt: z.string().or(z.date()).transform(str => new Date(str)),
    updatedAt: z.string().or(z.date()).transform(str => new Date(str)).optional(),
    thumbnail: image().optional(),
    thumbnailAlt: z.string().optional(),
    links: z.array(z.object({
      url: z.string(),
      text: z.string().optional(),
      img: image().optional(),
      imgAlt: z.string().optional()
    })).optional()
  })
});

const projects = defineCollection({
  schema: ({ image }) => z.object({
    url: z.string().url().optional(),
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    createdAt: z.string().or(z.date()).transform(str => new Date(str)),
    updatedAt: z.string().or(z.date()).transform(str => new Date(str)).optional(),
    thumbnail: image().optional(),
    thumbnailAlt: z.string().optional(),
    links: z.array(z.object({
      url: z.string(),
      text: z.string().optional(),
      img: image().optional(),
      imgAlt: z.string().optional()
    })).optional()
  })
});

export const collections = {
  blog,
  projects
};
