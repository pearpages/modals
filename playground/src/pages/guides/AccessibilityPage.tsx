import { Link } from 'react-router-dom'
import { Page } from '../../components/Page'
import { Showcase } from '../../components/Showcase'
import { CodeBlock } from '../../components/CodeBlock'
import { Callout } from '../../components/Callout'
import AccessibilityTour from '../../examples/guides/AccessibilityTour'
import accessibilityTourSource from '../../examples/guides/AccessibilityTour.tsx?raw'

export function AccessibilityPage() {
  return (
    <Page
      title="Accessibility"
      lead="What you get for free, and the two things you still have to do."
    >
      <h2>Handled for you</h2>
      <ul>
        <li>
          <code>role="dialog"</code> and <code>aria-modal="true"</code> on the content
          element.
        </li>
        <li>
          <code>aria-labelledby</code> and <code>aria-describedby</code> wired to
          whichever <code>Modal.Title</code> and <code>Modal.Description</code> are
          present, with generated ids.
        </li>
        <li>Focus moves into the modal when it opens.</li>
        <li>Tab and Shift+Tab wrap within the modal instead of escaping to the page.</li>
        <li>Focus returns to whatever had it when the modal closes.</li>
        <li>Escape closes the topmost modal.</li>
        <li>Background scroll is locked while any modal is open.</li>
      </ul>

      <Showcase
        code={accessibilityTourSource}
        fileName="AccessibilityTour.tsx"
        description="Open it and hold Tab: focus cycles and never reaches the page behind."
      >
        <AccessibilityTour />
      </Showcase>

      <h2>What is still yours</h2>
      <p>
        <strong>Give every modal a title.</strong> Without a{' '}
        <code>Modal.Title</code> the dialog has no accessible name, and a screen reader
        announces it as just &ldquo;dialog&rdquo;. If the title should not be visible,
        keep it and hide it visually:
      </p>
      <CodeBlock
        code={`<Modal.Title className="visually-hidden">Image viewer</Modal.Title>`}
      />
      <p>
        <strong>Keep dismissal available.</strong> Turning off both{' '}
        <code>closeOnEscape</code> and <code>closeOnBackdrop</code> without an obvious
        visible close leaves keyboard users stuck. See{' '}
        <Link to="/guides/dismiss">Dismissal</Link>.
      </p>

      <Callout variant="info" title="Fixed in 0.2.0">
        <p>
          Focus trapping never actually engaged before 0.2.0. The trap activated on the
          render where the modal opened, but the dialog element did not exist yet —
          it is created once the portal is found — so it silently did nothing. Neither
          autofocus nor Tab containment worked. Both do now.
        </p>
      </Callout>

      <h2>Worth testing by hand</h2>
      <ul>
        <li>Open with the keyboard alone; confirm focus lands inside.</li>
        <li>Tab all the way round; confirm it wraps.</li>
        <li>Close with Escape; confirm focus returns to the trigger.</li>
        <li>Listen to the open announcement with VoiceOver or NVDA.</li>
      </ul>
    </Page>
  )
}
