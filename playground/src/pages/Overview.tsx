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

      <h2>What you get</h2>
      <ul>
        <li>
          <strong>Composable.</strong> <code>Modal.Content</code>,{' '}
          <code>Modal.Header</code>, <code>Modal.Body</code> and the rest are separate
          pieces you arrange, not a fixed template.
        </li>
        <li>
          <strong>Accessible by construction.</strong> <code>role="dialog"</code>,
          focus trapping and return, and ARIA wiring you get without asking. See{' '}
          <Link to="/guides/accessibility">Accessibility</Link>.
        </li>
        <li>
          <strong>Stackable.</strong> Modals nest, and only the topmost one owns the
          backdrop and the Escape key. See <Link to="/guides/stacking">Stacking</Link>.
        </li>
        <li>
          <strong>Yours to style.</strong> No CSS-in-JS and no theme provider — just
          custom properties. See <Link to="/guides/theming">Theming</Link>.
        </li>
        <li>
          <strong>Small.</strong> One peer dependency: React.
        </li>
      </ul>

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
