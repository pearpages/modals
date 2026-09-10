import { test, expect } from '@playwright/test'
import { waitOpen } from './helpers'

test('a second modal stacks above the first and Escape peels one layer', async ({ page }) => {
  await page.goto('/guides/stacking')
  await page.getByRole('button', { name: 'Open first' }).click()
  await waitOpen(page)
  await page.getByRole('button', { name: 'Open second' }).click()
  await expect(page.getByRole('dialog')).toHaveCount(2)

  const backdrops = page.locator('.modalBackdrop')
  await expect(backdrops).toHaveCount(2)
  const [lower, upper] = await backdrops.evaluateAll((els) =>
    els.map((el) => {
      const s = getComputedStyle(el)
      return { z: Number(s.zIndex), pointer: s.pointerEvents, top: el.getAttribute('data-modal-backdrop') }
    }),
  )
  expect(upper.z).toBeGreaterThan(lower.z)
  expect(lower.pointer).toBe('none')
  expect(upper.pointer).toBe('auto')
  expect(lower.top).toBe('false')
  expect(upper.top).toBe('true')

  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(1)
  await expect(page.getByRole('dialog', { name: 'First modal' })).toBeVisible()
  // Still locked: the stack is not empty.
  await expect(page.locator('#root')).toHaveAttribute('inert', '')

  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.locator('#root')).not.toHaveAttribute('inert', '')
})
