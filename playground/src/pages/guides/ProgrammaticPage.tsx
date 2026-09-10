import { Link } from 'react-router-dom'
import { Page } from '../../components/Page'
import { Showcase } from '../../components/Showcase'
import { Callout } from '../../components/Callout'
import ProgrammaticControl from '../../examples/guides/ProgrammaticControl'
import programmaticControlSource from '../../examples/guides/ProgrammaticControl.tsx?raw'
import AsyncConfirmation from '../../examples/guides/AsyncConfirmation'
import asyncConfirmationSource from '../../examples/guides/AsyncConfirmation.tsx?raw'

export function ProgrammaticPage() {
  return (
    <Page
      title="Programmatic control"
      lead="Open modals from code when the thing that opens them is not a button."
    >
      <p>
        <Link to="/hooks/use-modal-stack">
          <code>useModalStack</code>
        </Link>{' '}
        addresses modals by id and keeps the state in the provider, so no component of
        yours has to hold it. This is the right tool for a modal opened by a failed
        request, an expiring session, or a route change.
      </p>

      <Showcase
        code={programmaticControlSource}
        fileName="ProgrammaticControl.tsx"
        description="No useState anywhere — the provider is the state."
      >
        <ProgrammaticControl />
      </Showcase>

      <Callout variant="info" title="With the open prop, these become requests">
        <p>
          Add <code>open</code> and the modal is controlled: <code>modals.open(id)</code>{' '}
          and <code>modals.close(id)</code> then call your <code>onOpenChange</code>{' '}
          instead of changing anything, and the modal follows your state. See{' '}
          <Link to="/guides/controlled">Controlled modals</Link>.
        </p>
      </Callout>

      <h2>Waiting on something</h2>
      <p>
        Because the modal does not own the async work, closing it is just another call
        — after the request resolves, in a <code>finally</code>, wherever it belongs.
        While the work is in flight, turn off the dismissal paths so a stray Escape
        cannot abandon it half-done.
      </p>

      <Showcase
        code={asyncConfirmationSource}
        fileName="AsyncConfirmation.tsx"
        description="Escape and the backdrop are disabled while deleting, and the close button is not rendered at all."
      >
        <AsyncConfirmation />
      </Showcase>

      <Callout variant="info" title="Focus return is on you">
        <p>
          The provider records whatever had focus when the modal opened and restores it
          on close. Opening from code — a timer, a socket message — means that could be
          anything, so move focus deliberately if it matters.
        </p>
      </Callout>
    </Page>
  )
}
