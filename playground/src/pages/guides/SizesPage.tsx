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
            type: 'var(--modal-width-md), 480px',
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
        The size prop sets a custom property, so overriding it is a one-liner and does
        not need a more specific selector:
      </p>
      <CodeBlock
        language="css"
        code={`.wide-modal {
  --modal-width: 720px;
}`}
      />
      <CodeBlock code={`<Modal.Content className="wide-modal">{/* ... */}</Modal.Content>`} />
      <p>
        More in <Link to="/guides/theming">Theming</Link>.
      </p>
    </Page>
  )
}
