import { unstable_vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import { remixDevTools } from 'remix-development-tools/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { unstable_RemixPWA as remixPWA } from '@remix-pwa/dev'

export default defineConfig({
  plugins: [
    remix(),
    tsconfigPaths(),
    remixDevTools(),
    remixPWA({
      workerMinify: true,
    }),
  ],
  server: {
    open: true,
    port: 3000,
  },
})
