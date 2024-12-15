import { defineConfig, sharpImageService } from 'astro/config';
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkReadingTime } from './remark-plugins/remark-reading-time.mjs';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  site: 'https://joonaa.dev',
  integrations: [svelte(), mdx(), sitemap(), partytown({ config: { forward: ['dataLayer.push'] } }), icon()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    },
    remarkPlugins: [remarkMath, remarkReadingTime],
    rehypePlugins: [rehypeKatex]
  },
  image: {
    service: sharpImageService(),
  },
});