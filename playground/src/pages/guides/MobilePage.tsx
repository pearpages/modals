import { Link } from 'react-router-dom'
import { Page } from '../../components/Page'
import { Showcase } from '../../components/Showcase'
import { PropsTable } from '../../components/PropsTable'
import MobileFullscreen from '../../examples/guides/MobileFullscreen'
import mobileFullscreenSource from '../../examples/guides/MobileFullscreen.tsx?raw'

export function MobilePage() {
  return (
    <Page
      title="Mobile"
      lead="Responsive without a single prop — narrow the window and watch."
    >
      <Showcase
        code={mobileFullscreenSource}
        fileName="MobileFullscreen.tsx"
        description="Open this, then drag the window below 768px."
      >
        <MobileFullscreen />
      </Showcase>

      <PropsTable
        caption="What changes, and where"
        rows={[
          {
            name: '≤ 768px',
            type: 'fullscreen',
            description: (
              <>
                <code>auto</code> and <code>md</code> both fill the screen; a centred
                card with margins wastes a phone display.
              </>
            ),
          },
          {
            name: '≤ 768px',
            type: 'tighter chrome',
            description: 'Header and footer padding shrink to give content the room.',
          },
          {
            name: '≤ 768px',
            type: 'stacked footer',
            description:
              'Multiple actions stack, each at least 44px tall, with the primary one at the bottom nearest the thumb.',
          },
          {
            name: '≤ 768px',
            type: 'safe area',
            description: (
              <>
                The footer adds <code>env(safe-area-inset-bottom)</code> so the last
                button clears the home indicator.
              </>
            ),
          },
          {
            name: '≤ 480px',
            type: 'tighter still',
            description: 'A second step down in spacing and title size for small phones.',
          },
        ]}
      />

      <h2>Testing it</h2>
      <p>
        Resizing a desktop window covers the layout, but not{' '}
        <code>env(safe-area-inset-*)</code>, which only has a non-zero value on a
        notched device. Use a real phone, or the iOS simulator, before trusting the
        footer inset.
      </p>
      <p>
        Note also that <Link to="/guides/sizes">size</Link> comparisons are meaningless
        below the breakpoint — everything is fullscreen there.
      </p>
    </Page>
  )
}
