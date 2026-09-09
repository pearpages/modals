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

      <Callout variant="danger" title="Do not mix this with useModalStack">
        <p>
          Controlled state and{' '}
          <Link to="/hooks/use-modal-stack">
            <code>useModalStack</code>
          </Link>{' '}
          are two owners of one piece of state, and they will disagree. Calling{' '}
          <code>modals.open(id)</code> on a controlled modal writes to the provider
          behind your state&apos;s back.
        </p>
        <p>
          Pick one per modal: your own state, or the provider&apos;s. See{' '}
          <Link to="/guides/programmatic">Programmatic control</Link> for the other
          half of this pair.
        </p>
      </Callout>

      <h2>Opening it</h2>
      <p>
        A controlled modal has no use for <code>Modal.Trigger</code> — set your state
        instead:
      </p>
      <CodeBlock
        code={`const [open, setOpen] = useState(false)

<button onClick={() => setOpen(true)}>Open</button>

<Modal id="confirm" open={open} onOpenChange={setOpen}>
  {/* ... */}
</Modal>`}
      />
      <p>
        One thing you give up: focus return. <code>Modal.Trigger</code> restores focus
        to itself on close, and a plain button does not, so move focus back yourself if
        it matters.
      </p>
    </Page>
  )
}
