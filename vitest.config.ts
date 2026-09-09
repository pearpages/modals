/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    // The library suite covers src/ only. The playground's smoke test resolves
    // @pearpages/modals through dist/, so it needs the library built first and
    // runs separately — see vitest.playground.config.ts.
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
