import { test, expect, type Page } from '@playwright/test'

const IDENTITY = ['none', 'matrix(1, 0, 0, 1, 0, 0)']

/** Computed motion of the newest dialog, read the moment it reports open. */
async function dialogMotion(page: Page) {
  await page.locator('[role="dialog"][data-state="open"]').last().waitFor()
  return page.locator('[role="dialog"]').last().evaluate((el) => {
    const style = getComputedStyle(el)
    const backdrop = el.closest('.modalBackdrop')
    const running = document
      .getAnimations()
      .filter((a) => {
        const target = (a.effect as KeyframeEffect | null)?.target
        return target === el || target === backdrop
      })
      .filter((a) => a.playState === 'running').length
    return {
      durations: style.transitionDuration.split(',').map((d) => d.trim()),
      transform: style.transform,
      running,
    }
  })
}

test.describe('prefers-reduced-motion: reduce', () => {
  test.use({ reducedMotion: 'reduce' })

  test('a centred dialog opens without moving', async ({ page }) => {
    await page.goto('/components/modal-content')
    await page.getByRole('button', { name: 'size="md"' }).click()
    const motion = await dialogMotion(page)
    expect(motion.durations.every((d) => d === '0s')).toBe(true)
    expect(IDENTITY).toContain(motion.transform)
    expect(motion.running).toBe(0)
  })

  test('a docked sheet does not slide in', async ({ page }) => {
    await page.goto('/components/modal-content')
    await page.getByRole('button', { name: 'placement="end"' }).click()
    const motion = await dialogMotion(page)
    expect(motion.durations.every((d) => d === '0s')).toBe(true)
    expect(IDENTITY).toContain(motion.transform)
    expect(motion.running).toBe(0)
  })

  test('the × button does not scale on hover', async ({ page, isMobile }) => {
    test.skip(isMobile, 'no hover on touch')
    await page.goto('/components/modal-content')
    await page.getByRole('button', { name: 'size="md"' }).click()
    const close = page.locator('.modalClose--icon').last()
    await close.hover()
    expect(IDENTITY).toContain(await close.evaluate((el) => getComputedStyle(el).transform))
  })
})

test.describe('default motion', () => {
  test.use({ reducedMotion: 'no-preference' })

  // Control: without the preference the entrance still animates, so the
  // reduced-motion tests above cannot pass by the transition simply being gone.
  test('a centred dialog still transitions', async ({ page }) => {
    await page.goto('/components/modal-content')
    await page.getByRole('button', { name: 'size="md"' }).click()
    const motion = await dialogMotion(page)
    expect(motion.durations).toContain('0.25s')
  })
})
