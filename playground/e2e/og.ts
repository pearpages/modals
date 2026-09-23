import { test } from '@playwright/test'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { fileURLToPath } from 'node:url'

// Not a test: renders e2e/og-card.html at 1200x630 and writes public/og.png,
// the image link previews show. The dialog in it is drawn by the library's own
// dist/index.css, so build first. Re-run (and commit the PNG) whenever the
// default look or the numbers on the card change.
// `npm run og -w playground`.
const here = path.dirname(fileURLToPath(import.meta.url))
const CARD = pathToFileURL(path.join(here, 'og-card.html')).href
const OUT = path.resolve(here, '..', 'public', 'og.png')

test('capture the Open Graph card', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto(CARD)
  await page.locator('.modal').last().waitFor()
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: OUT })
  console.log(`wrote ${OUT}`)
})
