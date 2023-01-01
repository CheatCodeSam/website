import { defineConfig } from 'astro/config';

// https://astro.build/config
import react from '@astrojs/react';
import image from '@astrojs/image';
import svelte from '@astrojs/svelte';

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
  },
});
