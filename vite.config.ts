import { remixPWA } from '@remix-pwa/dev'
import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import { remixDevTools } from 'remix-development-tools/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [remixDevTools(), remix(), tsconfigPaths(), remixPWA()],
  server: {
    open: true,
    port: 3000,
  },
})
