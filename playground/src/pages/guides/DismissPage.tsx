import { Link } from 'react-router-dom'
import { Page } from '../../components/Page'
import { Showcase } from '../../components/Showcase'
import { PropsTable } from '../../components/PropsTable'
import { Callout } from '../../components/Callout'
import DismissBehaviour from '../../examples/guides/DismissBehaviour'
import dismissBehaviourSource from '../../examples/guides/DismissBehaviour.tsx?raw'

export function DismissPage() {
  return (
    <Page
      title="Dismissal"
      lead="Backdrop clicks and Escape, and how to intercept or refuse them."
    >
      <PropsTable
        caption="Modal.Content"
        rows={[
          {
            name: 'closeOnBackdrop',
            type: 'boolean',
            default: 'true',
            description: 'Clicking the backdrop closes the topmost modal.',
          },
          {
            name: 'closeOnEscape',
            type: 'boolean',
            default: 'true',
            description: 'Escape closes the topmost modal.',
          },
          {
            name: 'onInteractOutside',
            type: '(e: { target; preventDefault() }) => void',
            description: 'Runs before dismissal. preventDefault() refuses it.',
          },
        ]}
      />

      <Showcase
        code={dismissBehaviourSource}
        fileName="DismissBehaviour.tsx"
        description="One modal cannot be dismissed at all; the other counts and refuses every attempt."
      >
        <DismissBehaviour />
      </Showcase>

      <Callout variant="info" title="onInteractOutside also fires for Escape">
        <p>
          Despite the name, this is the dismissal hook for both paths — a backdrop
          click and the Escape key. That is usually what you want, since both mean
          &ldquo;get me out of here&rdquo;. Handle the two separately by turning{' '}
          <code>closeOnEscape</code> off and using the callback for the backdrop only.
        </p>
      </Callout>

      <h2>When to turn dismissal off</h2>
      <p>
        Sparingly. A modal with no way out is a trap, and Escape is what people reach
        for first. It is justified while a request is in flight, or when a destructive
        action needs a deliberate answer — and in both cases the modal should still
        offer a visible way out.
      </p>
      <p>
        Making the modal <Link to="/guides/controlled">controlled</Link> is the other
        option: dismissal then becomes a request you can answer however you like,
        rather than something you switch off.
      </p>
    </Page>
  )
}
