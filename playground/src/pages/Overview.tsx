import { Link } from 'react-router-dom'
import { Page } from '../components/Page'
import { CodeBlock } from '../components/CodeBlock'
import { Showcase } from '../components/Showcase'
import { Callout } from '../components/Callout'
import FirstModal from '../examples/quick-start/FirstModal'
import firstModalSource from '../examples/quick-start/FirstModal.tsx?raw'

export function Overview() {
  return (
    <Page
      title="@pearpages/modals"
      lead="Accessible, composable modals for React — portal rendered, focus trapped, stackable, and styled entirely through CSS variables."
    >
      <h2>What that means</h2>
      <ul>
        <li>
          <strong>Composable.</strong> A dialog is assembled from parts you arrange —{' '}
          <code>Modal.Content</code>, <code>Modal.Header</code>,{' '}
          <code>Modal.Title</code>, <code>Modal.Body</code>,{' '}
          <code>Modal.Footer</code> — rather than configured through props on one
          component. Every part accepts <code>asChild</code>, so any of them can become
          an element of yours. See <Link to="/guides/as-child">asChild</Link>.
        </li>
        <li>
          <strong>Portal rendered.</strong> In the DOM the dialog is moved to{' '}
          <code>document.body</code>, wherever you wrote it in your JSX. That is what
          stops it being clipped by an ancestor&apos;s <code>overflow: hidden</code>, or
          buried under other content by an ancestor&apos;s <code>transform</code> or{' '}
          <code>z-index</code> — the &ldquo;my modal is cut off, or behind the
          header&rdquo; family of bugs. It stays where you wrote it in the{' '}
          <em>React</em> tree, so context, state and event bubbling are unaffected. See{' '}
          <Link to="/guides/portal-container">Portal container</Link>.
        </li>
        <li>
          <strong>Focus trapped.</strong> While a modal is open the keyboard cannot
          leave it: focus moves in when it opens, Tab and Shift+Tab cycle within it
          instead of reaching the page behind, and focus returns to whatever had it when
          the modal closes. Without this, someone using a keyboard or a screen reader
          tabs straight out of the dialog into content they cannot see and should not be
          able to reach. See <Link to="/guides/accessibility">Accessibility</Link>.
        </li>
        <li>
          <strong>Stackable.</strong> Several modals can be open at once, forming an
          ordered stack. Each renders at <code>baseZIndex</code> plus its position, only
          the topmost has an interactive backdrop and answers Escape, and page scroll
          stays locked until the last one closes — so a confirmation on top of a form
          works without you managing <code>z-index</code> or deciding which Escape
          closes what. See <Link to="/guides/stacking">Stacking</Link>.
        </li>
        <li>
          <strong>Styled through CSS variables.</strong> Every visual choice is a custom
          property — 166 of them. Restyling means setting a variable, at{' '}
          <code>:root</code>, on a class, or inline; not writing more specific selectors
          or reaching for <code>!important</code>. There is no CSS-in-JS runtime and no
          theme provider. See <Link to="/guides/theming">Theming</Link>.
        </li>
        <li>
          <strong>And small.</strong> No runtime dependencies — <code>react</code> and{' '}
          <code>react-dom</code> are peers.
        </li>
      </ul>

      <h2>Install</h2>
      <CodeBlock language="bash" code="npm install @pearpages/modals" title="terminal" />

      <Callout variant="warning" title="Import the stylesheet">
        <p>
          The package ships its CSS as a separate file. Import it once, wherever you
          mount the system — the JavaScript bundle does not pull it in for you.
        </p>
      </Callout>

      <CodeBlock
        language="tsx"
        title="main.tsx"
        code={`import { ModalSystem } from '@pearpages/modals'
import '@pearpages/modals/styles.css'

createRoot(document.getElementById('root')!).render(
  <ModalSystem>
    <App />
  </ModalSystem>,
)`}
      />

      <h2>A modal, end to end</h2>
      <p>
        Every example on this site shows the source first and the working modal below
        it. The code is the file that renders the demo, imported twice — so what you
        read is always what runs.
      </p>

      <Showcase
        code={firstModalSource}
        fileName="FirstModal.tsx"
        description="A trigger, a dialog, and the pieces it is built from."
      >
        <FirstModal />
      </Showcase>

      <h2>Where to next</h2>
      <ul>
        <li>
          <Link to="/setup">Setup</Link> — where the system goes in your tree.
        </li>
        <li>
          <Link to="/quick-start">Your first modal</Link> — built up one piece at a time.
        </li>
        <li>
          <Link to="/components/modal">Components</Link> — every prop of every part.
        </li>
      </ul>
    </Page>
  )
}
