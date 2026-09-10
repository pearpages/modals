import { defineConfig, devices } from '@playwright/test'

// Real-browser tests against the BUILT docs site — the same files CI deploys.
// Build first: `npm run build` at the root (library), then `npm run build -w
// playground`. `vite preview` serves playground/dist with the SPA fallback, so
// deep links like /guides/stacking work exactly as on GitHub Pages.
const PORT = 4173

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: `npm run preview -- --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
  projects: [
    {
      name: 'chromium',
      testIgnore: /shots\.ts/,
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } },
    },
    {
      name: 'webkit',
      testIgnore: /shots\.ts/,
      use: { ...devices['Desktop Safari'], viewport: { width: 1280, height: 800 } },
    },
    {
      name: 'mobile',
      testIgnore: /shots\.ts/,
      use: { ...devices['Pixel 7'] },
    },
    {
      // Not a test: writes review screenshots to e2e/shots. `npm run e2e:shots`.
      name: 'shots',
      testMatch: /shots\.ts/,
      retries: 0,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
