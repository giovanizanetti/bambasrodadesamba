import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// In dev, Vite's SPA fallback swallows /admin/ before the public dir is
// checked; rewrite it to the CMS page like GitHub Pages does in production.
const adminRewrite = {
  name: 'admin-rewrite',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/admin' || req.url === '/admin/') {
        req.url = '/admin/index.html'
      }
      next()
    })
  },
}

export default defineConfig({
  plugins: [vue(), adminRewrite],
  base: '/', // Use '/' for custom domain, or '/repository-name/' for GitHub Pages subdirectory
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})

