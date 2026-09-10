import { test, expect, type Page } from '@playwright/test'
import { waitOpen } from './helpers'

const box = (page: Page, selector: string) =>
  page.locator(selector).last().evaluate((el) => {
    const r = el.getBoundingClientRect()
    return { x: r.x, y: r.y, w: r.width, h: r.height, right: r.right, bottom: r.bottom }
  })

test.describe('desktop layout', () => {
  test.skip(({ isMobile }) => isMobile)

  test('size="md" is the token width and never taller than the viewport', async ({ page }) => {
    await page.goto('/components/modal-content')
    await page.getByRole('button', { name: 'size="md"' }).click()
    await waitOpen(page)
    const dialog = await box(page, '[role="dialog"]')
    expect(Math.round(dialog.w)).toBe(520)
    expect(dialog.h).toBeLessThanOrEqual(800)
  })

  test('a long body scrolls inside the dialog, the dialog does not grow past the viewport', async ({
    page,
  }) => {
    await page.goto('/components/modal-body')
    await page.getByRole('button', { name: 'Long content' }).click()
    await waitOpen(page)
    const dialog = await box(page, '[role="dialog"]')
    expect(dialog.bottom).toBeLessThanOrEqual(800)
    const body = await page.locator('.modalBody').last().evaluate((el) => ({
      scroll: el.scrollHeight,
      client: el.clientHeight,
      overflowY: getComputedStyle(el).overflowY,
    }))
    expect(body.scroll).toBeGreaterThan(body.client)
    expect(['auto', 'scroll']).toContain(body.overflowY)
  })
})

test.describe('phone layout', () => {
  test.skip(({ isMobile }) => !isMobile)

  test('auto and md dialogs go fullscreen', async ({ page }) => {
    await page.goto('/components/modal-content')
    const viewport = page.viewportSize()!
    for (const size of ['auto', 'md']) {
      await page.getByRole('button', { name: `size="${size}"` }).click()
      await waitOpen(page)
      const dialog = await box(page, '[role="dialog"]')
      expect(Math.round(dialog.w), `${size} width`).toBe(viewport.width)
      expect(Math.round(dialog.h), `${size} height`).toBe(viewport.height)
      await page.keyboard.press('Escape')
      await expect(page.getByRole('dialog')).toHaveCount(0)
    }
  })

  test('footer buttons stack vertically with 44px targets', async ({ page }) => {
    await page.goto('/components/modal-footer')
    await page.getByRole('button', { name: 'Three actions' }).click()
    await waitOpen(page)
    const buttons = await page
      .locator('.modalFooter button')
      // offset* are layout boxes: the hover transform (the emulated pointer is
      // left over one button after the tap) does not distort them.
      .evaluateAll((els) =>
        els.map((el) => {
          const b = el as HTMLElement
          return { top: b.offsetTop, bottom: b.offsetTop + b.offsetHeight, left: b.offsetLeft, width: b.offsetWidth, height: b.offsetHeight, text: b.textContent?.trim() }
        }),
      )
    expect(buttons).toHaveLength(3)
    // Visual order is column-reverse (primary nearest the thumb), so sort by
    // position rather than trusting DOM order.
    buttons.sort((a, b) => a.top - b.top)
    const layout = JSON.stringify(buttons)
    for (let i = 1; i < buttons.length; i++) {
      expect(buttons[i].top, layout).toBeGreaterThanOrEqual(buttons[i - 1].bottom)
      expect(Math.round(buttons[i].left), layout).toBe(Math.round(buttons[0].left))
    }
    for (const b of buttons) expect(b.height).toBeGreaterThanOrEqual(44)
  })
})

// Regression: Modal.Close asChild merged the icon button's fixed 32px size onto
// footer buttons, clipping "Cancel" to "ance". A text-labelled Modal.Close
// wrapped into a two-line square the same way.
for (const [route, trigger] of [
  ['/quick-start', 'Open modal'],
  ['/components/modal-close', 'Open'],
] as const) {
  test(`footer buttons on ${route} are not clipped`, async ({ page }) => {
    await page.goto(route)
    await page.getByRole('button', { name: trigger, exact: true }).first().click()
    await waitOpen(page)
    const buttons = await page.locator('.modalFooter button').evaluateAll((els) =>
      els.map((el) => ({
        text: el.textContent?.trim(),
        clippedX: el.scrollWidth > el.clientWidth + 1,
        lines: Math.round((el as HTMLElement).offsetHeight / parseFloat(getComputedStyle(el).lineHeight)),
      })),
    )
    expect(buttons.length).toBeGreaterThan(0)
    for (const b of buttons) {
      expect(b.clippedX, `${b.text} is clipped horizontally`).toBe(false)
      expect(b.lines, `${b.text} wrapped onto ${b.lines} lines`).toBeLessThanOrEqual(2)
    }
  })
}

// Open item in CLAUDE.md: "forms inside modals overflow the modal body". This
// either closes it or reproduces it, on desktop and on the phone project.
test('a form as the dialog keeps its fields inside the body', async ({ page }) => {
  await page.goto('/components/modal-content')
  await page.getByRole('button', { name: 'Rename project' }).click()
  await waitOpen(page)
  const dialog = page.locator('[role="dialog"]').last()
  expect(await dialog.evaluate((el) => el.tagName.toLowerCase())).toBe('form')

  const body = await box(page, '.modalBody')
  const input = await box(page, '#project-name')
  expect(input.right).toBeLessThanOrEqual(body.right + 0.5)
  expect(input.x).toBeGreaterThanOrEqual(body.x - 0.5)
  const overflow = await page
    .locator('.modalBody')
    .last()
    .evaluate((el) => el.scrollWidth - el.clientWidth)
  expect(overflow).toBeLessThanOrEqual(0)
})
