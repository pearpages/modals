import { test, expect } from '@playwright/test'
import { activeElement, waitOpen } from './helpers'

// jsdom cannot press a real Tab key. This proves the trap against the browser's
// own sequential focus navigation.
test.describe('focus trap', () => {
  test('Tab and Shift+Tab stay inside the dialog, Escape returns focus to the trigger', async ({
    page,
  }) => {
    await page.goto('/guides/accessibility')
    const trigger = page.getByRole('button', { name: 'Open, then press Tab' })
    await trigger.click()
    await waitOpen(page)

    // Focus moved in on open.
    expect((await activeElement(page))?.insideDialog).toBe(true)

    // Four focusables inside (Close, First, Second, A link): eight Tabs wrap
    // twice and never leave.
    const seen = new Set<string>()
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Tab')
      const active = await activeElement(page)
      expect(active?.insideDialog, `Tab #${i + 1} landed on ${active?.tag} "${active?.text}"`).toBe(
        true,
      )
      seen.add(`${active?.tag}:${active?.text}`)
    }
    expect(seen.size).toBe(4)

    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Shift+Tab')
      expect((await activeElement(page))?.insideDialog).toBe(true)
    }

    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).toHaveCount(0)
    await expect(trigger).toBeFocused()
  })

  test('a sidebar link cannot take focus while a modal is open', async ({ page, isMobile }) => {
    test.skip(isMobile, 'the sidebar is collapsed on phones')
    await page.goto('/guides/accessibility')
    await page.getByRole('button', { name: 'Open, then press Tab' }).click()
    await waitOpen(page)

    const link = page.locator('.nav__link', { hasText: 'Setup' })
    await link.evaluate((el) => (el as HTMLElement).focus())
    const active = await activeElement(page)
    expect(active?.text).not.toBe('Setup')
    expect(active?.insideDialog).toBe(true)
  })
})
