import { Link } from 'react-router-dom'
import { Page } from '../../components/Page'
import { Showcase } from '../../components/Showcase'
import { PropsTable } from '../../components/PropsTable'
import { Callout } from '../../components/Callout'
import ContentSizes from '../../examples/components/modal-content/ContentSizes'
import contentSizesSource from '../../examples/components/modal-content/ContentSizes.tsx?raw'
import ContentAsForm from '../../examples/components/modal-content/ContentAsForm'
import contentAsFormSource from '../../examples/components/modal-content/ContentAsForm.tsx?raw'

export function ContentPage() {
  return (
    <Page
      title="Modal.Content"
      lead="The dialog itself: role, size, animation, focus trap and dismissal all live here."
    >
      <PropsTable
        rows={[
          {
            name: 'size',
            type: "'auto' | 'md' | 'full'",
            default: "'md'",
            description: (
              <>
                Width behaviour. See <Link to="/guides/sizes">Sizes</Link>.
              </>
            ),
          },
          {
            name: 'animated',
            type: 'boolean',
            default: 'true',
            description: (
              <>
                Fade and scale transitions. See{' '}
                <Link to="/guides/animation">Animation</Link>.
              </>
            ),
          },
          {
            name: 'closeOnBackdrop',
            type: 'boolean',
            default: 'true',
            description: 'Whether a click on the backdrop dismisses it.',
          },
          {
            name: 'closeOnEscape',
            type: 'boolean',
            default: 'true',
            description: 'Whether Escape dismisses it.',
          },
          {
            name: 'onInteractOutside',
            type: '(e: { target; preventDefault() }) => void',
            description: (
              <>
                Fires for backdrop clicks and Escape. Call{' '}
                <code>preventDefault()</code> to refuse. See{' '}
                <Link to="/guides/dismiss">Dismissal</Link>.
              </>
            ),
          },
          {
            name: 'asChild',
            type: 'boolean',
            default: 'false',
            description: 'Make your own element the dialog — most often a <form>.',
          },
          { name: 'children', type: 'ReactNode', required: true, description: 'The dialog contents.' },
        ]}
      />

      <h2>What it renders</h2>
      <p>
        A <code>div</code> with <code>role="dialog"</code>,{' '}
        <code>aria-modal="true"</code>, and <code>aria-labelledby</code> /{' '}
        <code>aria-describedby</code> pointing at whichever{' '}
        <code>Modal.Title</code> and <code>Modal.Description</code> are present. It
        also carries a <code>data-state</code> of <code>opening</code>,{' '}
        <code>open</code> or <code>closing</code>, which is what the CSS animates on.
      </p>

      <Showcase
        title="Sizes"
        code={contentSizesSource}
        fileName="ContentSizes.tsx"
        description="Below 768px, auto and md both go fullscreen regardless."
      >
        <ContentSizes />
      </Showcase>

      <Showcase
        title="The dialog as a form"
        code={contentAsFormSource}
        fileName="ContentAsForm.tsx"
        description={
          <>
            <code>asChild</code> moves the dialog role, the ARIA wiring, the sizing and
            the focus trap onto your element, so a footer <code>type="submit"</code>{' '}
            submits without any wiring.
          </>
        }
      >
        <ContentAsForm />
      </Showcase>

      <Callout variant="info" title="Refs are merged, not replaced">
        <p>
          Content attaches its own ref for the focus trap. With <code>asChild</code>,
          a ref you put on the child is kept alongside it — both point at the element.
        </p>
      </Callout>
    </Page>
  )
}
