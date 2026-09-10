import { Link } from 'react-router-dom'
import { Page } from '../../components/Page'
import { Showcase } from '../../components/Showcase'
import { Callout } from '../../components/Callout'
import { CodeBlock } from '../../components/CodeBlock'
import ControlledModal from '../../examples/guides/ControlledModal'
import controlledModalSource from '../../examples/guides/ControlledModal.tsx?raw'

export function ControlledPage() {
  return (
    <Page
      title="Controlled modals"
      lead="When your component owns the open state, the modal asks permission to close."
    >
      <p>
        Pass <code>open</code> and <code>onOpenChange</code> and the modal becomes
        controlled. Everything that would dismiss it — Escape, a backdrop click, a{' '}
        <code>Modal.Close</code> — now calls <code>onOpenChange(false)</code> and{' '}
        <em>nothing else</em>. The modal stays on screen until you flip{' '}
        <code>open</code> yourself.
      </p>
      <p>
        That is the entire point: it lets you refuse. A form with unsaved changes can
        intercept the dismissal, ask, and stay open.
      </p>

      <Showcase
        code={controlledModalSource}
        fileName="ControlledModal.tsx"
        description="Try Escape or a backdrop click before ticking the box — the modal declines to close."
      >
        <ControlledModal />
      </Showcase>

      <Callout variant="info" title="One rule for every path">
        <p>
          The same goes for opening. <code>Modal.Trigger</code> and{' '}
          <Link to="/hooks/use-modal-stack">
            <code>useModalStack</code>
          </Link>{' '}
          never write to a controlled modal: <code>modals.open(id)</code> calls{' '}
          <code>onOpenChange(true)</code>, <code>modals.close(id)</code> calls{' '}
          <code>onOpenChange(false)</code>, and the modal follows your state. That also
          means <code>open</code> without <code>onOpenChange</code> is a modal nothing
          can close — the same contract as an <code>&lt;input value&gt;</code> without{' '}
          <code>onChange</code>.
        </p>
      </Callout>

      <h2>Opening it</h2>
      <p>
        Set your state. A <code>Modal.Trigger</code> works too — it asks through{' '}
        <code>onOpenChange(true)</code> — but a plain button is more direct:
      </p>
      <CodeBlock
        code={`const [open, setOpen] = useState(false)

<button onClick={() => setOpen(true)}>Open</button>

<Modal id="confirm" open={open} onOpenChange={setOpen}>
  {/* ... */}
</Modal>`}
      />
      <p>
        Focus still returns on close: the provider remembers whichever element had
        focus when the modal opened, so a plain button gets it back just as a{' '}
        <code>Modal.Trigger</code> would.
      </p>
    </Page>
  )
}
