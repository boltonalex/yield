import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { plugin as mdPlugin, Mode } from 'vite-plugin-markdown';

export default defineConfig({
  plugins: [sveltekit(), tailwindcss(), mdPlugin({ mode: [Mode.HTML, Mode.TOC] })],
  server: {
    fs: {
      allow: ['./README.md'],
    },
  },
});
