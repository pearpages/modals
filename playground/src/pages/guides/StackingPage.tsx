import { Link } from 'react-router-dom'
import { Page } from '../../components/Page'
import { Showcase } from '../../components/Showcase'
import { CodeBlock } from '../../components/CodeBlock'
import { Callout } from '../../components/Callout'
import NestedModals from '../../examples/guides/NestedModals'
import nestedModalsSource from '../../examples/guides/NestedModals.tsx?raw'

export function StackingPage() {
  return (
    <Page
      title="Stacking"
      lead="Modals nest. Only the topmost one is interactive."
    >
      <p>
        The provider keeps an ordered stack. Opening a modal pushes it on, closing pops
        it, and each one renders at <code>baseZIndex + stackIndex</code>.
      </p>

      <Showcase
        code={nestedModalsSource}
        fileName="NestedModals.tsx"
        description="Open both, then press Escape: only the second one closes."
      >
        <NestedModals />
      </Showcase>

      <h2>What being on top means</h2>
      <ul>
        <li>Only the topmost modal answers Escape.</li>
        <li>
          Only the topmost modal has an interactive backdrop; the ones below have{' '}
          <code>pointer-events: none</code>, so a click cannot dismiss a modal you
          cannot see.
        </li>
        <li>
          Body scroll stays locked until the stack is empty — closing an inner modal
          does not unlock the page early.
        </li>
      </ul>

      <Callout variant="warning" title="A trigger cannot open its own modal">
        <p>
          A closed <code>Modal</code> renders nothing, so a{' '}
          <code>Modal.Trigger</code> inside the modal it targets is unreachable. Nested
          modals work because the trigger sits inside a <em>different</em>, already-open
          modal.
        </p>
      </Callout>

      <h2>Choosing the range</h2>
      <p>
        Set <code>baseZIndex</code> on the provider when modals have to clear a sticky
        header or a third-party widget:
      </p>
      <CodeBlock code={`<ModalSystem baseZIndex={5000}>{/* ... */}</ModalSystem>`} />
      <p>
        Set it in one place. Both <code>ModalRoot</code> and{' '}
        <code>Modal.Content</code> read it from context, and giving the root a
        different value puts the backdrop in a different band from the dialog it is
        meant to sit behind. Inspect what a modal actually got with{' '}
        <Link to="/hooks/use-modal-stack">
          <code>getModal</code>
        </Link>
        .
      </p>
    </Page>
  )
}
