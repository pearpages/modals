import { test, expect } from '@playwright/test'
import { waitOpen } from './helpers'

test('a controlled modal refuses Escape and backdrop clicks until its owner agrees', async ({
  page,
}) => {
  await page.goto('/guides/controlled')
  await page.getByRole('button', { name: 'Open (controlled)' }).click()
  await waitOpen(page)
  const dialog = page.getByRole('dialog', { name: 'Controlled modal' })

  await page.keyboard.press('Escape')
  await page.waitForTimeout(300)
  await expect(dialog).toBeVisible()
  await expect(page.getByText('state: open', { exact: true })).toBeVisible()

  // Top-left corner is backdrop, not dialog.
  await page.mouse.click(8, 8)
  await page.waitForTimeout(300)
  await expect(dialog).toBeVisible()

  await dialog.getByRole('checkbox').check()
  await dialog.getByRole('button', { name: 'Continue' }).click()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.getByText('state: closed', { exact: true })).toBeVisible()
})
