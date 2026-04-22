import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://wwapps.io',
  integrations: [sitemap()],
  build: {
    format: 'directory'
  }
});
