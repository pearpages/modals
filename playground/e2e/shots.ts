import { test } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { docsRoutes, firstTrigger, waitOpen } from './helpers'

// Review material, not a test: one PNG per route × viewport × colour scheme,
// plus a frame with the first modal open. Output is git-ignored.
const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'shots')
const VIEWPORTS = { desktop: { width: 1280, height: 800 }, phone: { width: 390, height: 844 } }
const SCHEMES = ['light', 'dark'] as const

test('capture every route', async ({ page }) => {
  test.setTimeout(10 * 60_000)
  fs.rmSync(OUT, { recursive: true, force: true })
  fs.mkdirSync(OUT, { recursive: true })
  const routes = await docsRoutes(page)

  for (const route of routes) {
    const slug = route === '/' ? 'overview' : route.replace(/^\//, '').replace(/\//g, '__')
    for (const [name, viewport] of Object.entries(VIEWPORTS)) {
      await page.setViewportSize(viewport)
      for (const scheme of SCHEMES) {
        await page.emulateMedia({ colorScheme: scheme })
        await page.goto(route)
        await page.locator('.page__title').waitFor()
        await page.waitForTimeout(100)
        const file = (suffix: string) => path.join(OUT, `${slug}--${name}--${scheme}${suffix}.png`)
        await page.screenshot({ path: file(''), fullPage: true })

        const trigger = firstTrigger(page)
        if ((await trigger.count()) > 0) {
          await trigger.scrollIntoViewIfNeeded()
          await trigger.click()
          await waitOpen(page)
          await page.waitForTimeout(350) // let the fade finish
          await page.screenshot({ path: file('--open') })
          await page.keyboard.press('Escape')
        }
      }
    }
  }
  console.log(`wrote ${fs.readdirSync(OUT).length} screenshots to ${OUT}`)
})
