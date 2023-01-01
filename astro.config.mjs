import { defineConfig } from 'astro/config';

// https://astro.build/config
import react from '@astrojs/react';
import image from '@astrojs/image';
import svelte from '@astrojs/svelte';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [react(), image(), svelte()],
  experimental: {
    contentCollections: true,
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  extendDefaultPlugins: true,
});
