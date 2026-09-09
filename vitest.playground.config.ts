/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

// Renders every documentation route the way a browser would, against the built
// package — so a broken exports map or a page that throws on mount fails here
// rather than after deploy. Requires `npm run build` first.
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    include: ['playground/src/**/*.test.{ts,tsx}'],
  },
})
