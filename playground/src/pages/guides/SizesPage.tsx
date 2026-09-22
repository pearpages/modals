import { Link } from 'react-router-dom'
import { Page } from '../../components/Page'
import { Showcase } from '../../components/Showcase'
import { PropsTable } from '../../components/PropsTable'
import { CodeBlock } from '../../components/CodeBlock'
import ContentSizes from '../../examples/components/modal-content/ContentSizes'
import contentSizesSource from '../../examples/components/modal-content/ContentSizes.tsx?raw'

export function SizesPage() {
  return (
    <Page title="Sizes" lead="Three widths, and what each is for.">
      <PropsTable
        caption="Modal.Content size"
        rows={[
          {
            name: "'auto'",
            type: 'fit content',
            description:
              'As wide as its content needs, capped at the viewport. Good for short confirmations.',
          },
          {
            name: "'md'",
            type: 'var(--modal-width-md), 520px',
            description: 'The default. A fixed, comfortable reading width.',
          },
          {
            name: "'full'",
            type: '100vw / 100vh',
            description: 'Fills the viewport. For immersive content — editors, galleries, wizards.',
          },
        ]}
      />

      <Showcase code={contentSizesSource} fileName="ContentSizes.tsx">
        <ContentSizes />
      </Showcase>

      <h2>Below 768px there is only one size</h2>
      <p>
        <code>auto</code> and <code>md</code> both become fullscreen on phones, so
        comparing them at that width shows no difference. That is deliberate — a
        centred card with margins wastes space on a small screen. See{' '}
        <Link to="/guides/mobile">Mobile</Link>.
      </p>

      <h2>A width of your own</h2>
      <p>
        <code>md</code> and <code>full</code> read their width from a custom property
        (<code>auto</code> simply fits its content, above <code>--modal-min-width</code>),
        and docked sheets read <code>--modal-width-sheet</code> (24rem) or{' '}
        <code>--modal-height-sheet</code> (60vh). Overriding one is a one-liner that needs
        no extra specificity:
      </p>
      <CodeBlock
        language="css"
        code={`.wide-modal {
  --modal-width-md: 720px;
}`}
      />
      <p>
        Override the property for the size you are using — <code>--modal-width-md</code>{' '}
        here, since <code>md</code> is the default. Your class and{' '}
        <code>.modal--md</code> end up on the same element, and{' '}
        <code>.modal--md</code> is <code>width: var(--modal-width-md)</code>, so it
        resolves against the value you set.
      </p>
      <CodeBlock code={`<Modal.Content className="wide-modal">{/* ... */}</Modal.Content>`} />
      <p>
        More in <Link to="/guides/theming">Theming</Link>.
      </p>
    </Page>
  )
}
