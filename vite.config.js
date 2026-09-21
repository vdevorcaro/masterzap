import { defineConfig } from 'vite';

import { BASE, SITE } from './scripts/lib/corpus.mjs';

export default defineConfig({
  root: '.',
  // '/' unless SITE_URL puts the site under a path (GitHub Pages)
  base: `${BASE}/`,
  define: {
    __SITE__: JSON.stringify(SITE),
  },
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html',
    },
  },
  preview: {
    // Reached through `tailscale serve`, which fronts the loopback port with
    // HTTPS on a *.ts.net name. Vite rejects hostnames it does not know, and
    // the browser needs a secure context for the clipboard and the share sheet.
    allowedHosts: ['.ts.net'],
  },
  test: {
    include: ['tests/unit/**/*.test.js'],
    environment: 'jsdom',
    // Node 25 ships its own localStorage global, which hides jsdom's
    poolOptions: {
      forks: { execArgv: ['--no-experimental-webstorage'] },
    },
  },
});
