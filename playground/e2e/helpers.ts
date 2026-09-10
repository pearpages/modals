import type { Page } from '@playwright/test'

/** Every sidebar route, read from the rendered nav so nothing is hard-coded. */
export async function docsRoutes(page: Page): Promise<string[]> {
  await page.goto('/')
  const hrefs = await page.locator('.nav__link').evaluateAll((links) =>
    links.map((a) => (a as HTMLAnchorElement).getAttribute('href') ?? ''),
  )
  return Array.from(new Set(hrefs.filter(Boolean)))
}

/** The first enabled trigger on the page, if any. */
export function firstTrigger(page: Page) {
  return page.locator('[data-modal-trigger]:not([disabled])').first()
}

/** Wait for the open animation to settle: data-state moves opening → open in ~10ms. */
export async function waitOpen(page: Page) {
  await page.locator('[role="dialog"][data-state="open"]').last().waitFor()
  // data-state flips to "open" 10ms in, but the fade/scale transition runs
  // ~250ms. Measuring geometry or colour before it ends reads a dialog that is
  // still scaled to 0.96 and blended into the backdrop.
  await page.evaluate(() =>
    Promise.all(document.getAnimations().map((a) => a.finished.catch(() => undefined))),
  )
}

/** Focused element's tag/text, evaluated in the page. */
export function activeElement(page: Page) {
  return page.evaluate(() => {
    const el = document.activeElement
    if (!el) return null
    return {
      tag: el.tagName.toLowerCase(),
      text: (el.textContent ?? '').trim().slice(0, 40),
      insideDialog: !!el.closest('[role="dialog"]'),
    }
  })
}
