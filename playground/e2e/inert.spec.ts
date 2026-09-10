import { test, expect } from '@playwright/test'
import { waitOpen } from './helpers'

test.describe('the page behind an open modal', () => {
  test('is inert and aria-hidden, and comes back on close', async ({ page }) => {
    await page.goto('/guides/accessibility')
    const root = page.locator('#root')
    await expect(root).not.toHaveAttribute('inert', '')
    await expect(root).not.toHaveAttribute('aria-hidden', 'true')

    await page.getByRole('button', { name: 'Open, then press Tab' }).click()
    await waitOpen(page)

    await expect(root).toHaveAttribute('inert', '')
    await expect(root).toHaveAttribute('aria-hidden', 'true')
    // The dialog itself is not hidden from the accessibility tree.
    await expect(page.getByRole('dialog', { name: 'Accessible by construction' })).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).toHaveCount(0)
    await expect(root).not.toHaveAttribute('inert', '')
    await expect(root).not.toHaveAttribute('aria-hidden', 'true')
  })

  test('a click where a sidebar link sits hits the backdrop, not the link', async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, 'the sidebar is collapsed on phones')
    await page.goto('/guides/accessibility')
    await page.getByRole('button', { name: 'Open, then press Tab' }).click()
    await waitOpen(page)

    const link = page.locator('.nav__link', { hasText: 'Setup' })
    const box = (await link.boundingBox())!
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)

    // The backdrop took the click and closed the modal; no navigation happened.
    await expect(page.getByRole('dialog')).toHaveCount(0)
    await expect(page).toHaveURL(/\/guides\/accessibility$/)

    // With the modal gone the same link works again.
    await link.click()
    await expect(page).toHaveURL(/\/setup$/)
  })
})
