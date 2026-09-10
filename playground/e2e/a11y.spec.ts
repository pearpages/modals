import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { docsRoutes, firstTrigger, waitOpen } from './helpers'

// axe over every route, and again with the first modal open. Only serious and
// critical violations fail; the rest are printed for someone to read.
test.describe('axe', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'one engine is enough for axe')

  test('every documentation route, closed and with a modal open', async ({ page }) => {
    test.setTimeout(120_000)
    const routes = await docsRoutes(page)
    expect(routes.length).toBeGreaterThan(20)
    const failures: string[] = []
    const notes: string[] = []

    for (const route of routes) {
      await page.goto(route)
      await page.locator('.page__title').waitFor()
      const states: Array<['closed' | 'open', () => Promise<void>]> = [['closed', async () => {}]]
      if ((await firstTrigger(page).count()) > 0) {
        states.push(['open', async () => { await firstTrigger(page).click(); await waitOpen(page) }])
      }
      for (const [state, prepare] of states) {
        await prepare()
        const results = await new AxeBuilder({ page }).analyze()
        for (const v of results.violations) {
          const node = v.nodes[0]
          const data = node?.any[0]?.data as
            | { fgColor?: string; bgColor?: string; contrastRatio?: number; expectedContrastRatio?: string }
            | undefined
          const detail = data?.contrastRatio
            ? ` ${data.fgColor} on ${data.bgColor} = ${data.contrastRatio} (needs ${data.expectedContrastRatio})`
            : ''
          const line = `${route} [${state}] ${v.impact}: ${v.id} (${v.nodes.length} node${v.nodes.length === 1 ? '' : 's'}: ${node?.target.join(' ')})${detail}`
          if (v.impact === 'serious' || v.impact === 'critical') failures.push(line)
          else notes.push(line)
        }
      }
    }

    if (notes.length) console.log(`axe minor/moderate:\n  ${notes.join('\n  ')}`)
    expect(failures, failures.join('\n')).toEqual([])
  })
})
