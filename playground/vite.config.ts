import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

// GitHub Pages has no rewrite rules: a request for /guides/stacking matches no
// file, so Pages serves 404.html. Shipping a byte-identical copy of index.html
// as 404.html turns that into an SPA fallback — the app boots and the router
// renders the deep-linked route. Doing it here rather than in the workflow keeps
// the fallback a property of the build, so `vite preview` matches production.
function spaFallback(): Plugin {
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    closeBundle() {
      const outDir = path.resolve(__dirname, 'dist')
      fs.copyFileSync(path.join(outDir, 'index.html'), path.join(outDir, '404.html'))
    },
  }
}

// `vite --mode source` resolves @pearpages/modals to ../src: HMR, no build step.
// Any other mode resolves it through the package's own exports map into ../dist —
// exactly what an npm consumer gets. The deployed build always uses dist, so the
// site doubles as proof that the published package resolves.
export default defineConfig(({ mode }) => ({
  plugins: [react(), spaFallback()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    // Order matters: Vite string aliases are prefix matches, first hit wins, so
    // the /styles.css entry has to come before the bare specifier.
    alias:
      mode === 'source'
        ? [
            {
              find: '@pearpages/modals/styles.css',
              replacement: path.resolve(__dirname, 'src/styles.noop.css'),
            },
            {
              find: '@pearpages/modals',
              replacement: path.resolve(__dirname, '../src/index.ts'),
            },
          ]
        : [],
  },
  optimizeDeps: { exclude: ['@pearpages/modals'] },
}))
