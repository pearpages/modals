import { test, expect } from '@playwright/test'
import { waitOpen } from './helpers'

test('the page does not scroll behind a modal and keeps its position', async ({ page }) => {
  await page.goto('/guides/scroll-lock')
  // Make sure there is something to scroll, then scroll partway down.
  const scrollable = await page.evaluate(
    () => document.documentElement.scrollHeight > window.innerHeight + 200,
  )
  expect(scrollable, 'the scroll-lock guide should be taller than the viewport').toBe(true)
  await page.evaluate(() => window.scrollTo(0, 200))
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(200)

  // Playwright scrolls the trigger into view before clicking, so the
  // position to hold is whatever it is once the modal is open.
  await page.getByRole('button', { name: 'Open and try to scroll' }).click()
  await waitOpen(page)
  const held = await page.evaluate(() => window.scrollY)
  expect(held).toBeGreaterThan(0)

  const compensation = await page.evaluate(() =>
    document.body.style.getPropertyValue('--scrollbar-compensation'),
  )
  expect(compensation).toMatch(/^\d+px$/)

  await page.mouse.wheel(0, 600)
  await page.waitForTimeout(150)
  const during = await page.evaluate(() => window.scrollY)
  // Either the body is overflow:hidden (scrollY frozen) or, on the iOS path,
  // position:fixed (scrollY reads 0). Both mean the page behind did not move.
  expect([held, 0]).toContain(during)

  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(held)
  expect(
    await page.evaluate(() => document.body.style.getPropertyValue('--scrollbar-compensation')),
  ).toBe('')
})
