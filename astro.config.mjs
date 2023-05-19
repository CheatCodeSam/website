import { defineConfig } from 'astro/config';

import netlify from "@astrojs/netlify/functions";
import image from '@astrojs/image';
import svelte from '@astrojs/svelte';
import compress from "astro-compress";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkReadingTime } from './remark-plugins/remark-reading-time.mjs';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [image(), svelte(), compress()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    },
    remarkPlugins: [remarkMath, remarkReadingTime],
    rehypePlugins: [rehypeKatex]
  }
});
