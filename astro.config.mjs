import { defineConfig } from 'astro/config';

// https://astro.build/config
import react from '@astrojs/react';

function insertBlogLayoutPlugin() {
  return function (_tree, file) {
    file.data.astro.frontmatter.layout = file.cwd + '/src/layouts/PostLayout.astro';
  };
}

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  markdown: {
    remarkPlugins: [insertBlogLayoutPlugin],
    extendDefaultPlugins: true,
  },
});
