import { Page } from '../../components/Page'
import { Showcase } from '../../components/Showcase'
import { CodeBlock } from '../../components/CodeBlock'
import { PropsTable } from '../../components/PropsTable'
import ThemedModal from '../../examples/guides/ThemedModal'
import themedModalSource from '../../examples/guides/ThemedModal.tsx?raw'

export function ThemingPage() {
  return (
    <Page
      title="Theming"
      lead="Custom properties all the way down. No theme provider, no CSS-in-JS, nothing to override with !important."
    >
      <PropsTable
        caption="The main variables"
        rows={[
          { name: '--modal-bg', type: 'color', default: '#fff', description: 'Dialog background.' },
          { name: '--modal-color', type: 'color', default: '#111', description: 'Dialog text.' },
          { name: '--modal-radius', type: 'length', default: '12px', description: 'Corner radius.' },
          { name: '--modal-shadow', type: 'shadow', default: 'soft drop shadow', description: 'Dialog shadow.' },
          {
            name: '--modal-width-md',
            type: 'length',
            default: '480px',
            description: (
              <>
                Width of <code>size="md"</code>. Set it on a class of your own to give
                one dialog its own width — your class and <code>.modal--md</code> land
                on the same element, so the <code>width</code> declaration reads your
                value.
              </>
            ),
          },
          {
            name: '--modal-width-full',
            type: 'length',
            default: '100vw',
            description: (
              <>
                Width of <code>size="full"</code>.
              </>
            ),
          },
          {
            name: '--modal-min-width',
            type: 'length',
            description: (
              <>
                Floor for <code>size="auto"</code>, which otherwise fits its content.
              </>
            ),
          },
          {
            name: '--modal-backdrop-bg',
            type: 'color',
            default: 'rgba(0,0,0,.5)',
            description: 'Backdrop fill.',
          },
          {
            name: '--scrollbar-compensation',
            type: 'length',
            description: 'Set by the scroll lock; read it for your own fixed elements.',
          },
        ]}
      />

      <h2>Three places to set them</h2>
      <p>Globally, for every modal in the app:</p>
      <CodeBlock
        language="css"
        code={`:root {
  --modal-radius: 4px;
  --modal-backdrop-bg: rgba(0, 0, 0, 0.7);
}`}
      />

      <p>Per modal, with a class:</p>
      <CodeBlock
        language="css"
        code={`.danger-modal {
  --modal-bg: #2b0b0b;
  --modal-color: #ffe9e9;
}`}
      />

      <p>Or inline, which is what the example below does:</p>
      <Showcase code={themedModalSource} fileName="ThemedModal.tsx">
        <ThemedModal />
      </Showcase>

      <h2>Dark mode</h2>
      <p>
        The library does not decide what dark means for your app. Redefine the
        variables under whichever signal you use:
      </p>
      <CodeBlock
        language="css"
        code={`@media (prefers-color-scheme: dark) {
  :root {
    --modal-bg: #161b22;
    --modal-color: #e6edf3;
    --modal-backdrop-bg: rgba(1, 4, 9, 0.7);
  }
}`}
      />

      <h2>Class names</h2>
      <p>
        The stylesheet targets flat classes — <code>.modal</code>,{' '}
        <code>.modalBackdrop</code>, <code>.modalHeader</code>,{' '}
        <code>.modalBody</code>, <code>.modalFooter</code> and so on — with no
        namespace wrapper, because portal-rendered elements are not inside your
        component tree and could not inherit one. Variables are the intended
        extension point; these class names are the escape hatch when they are not
        enough.
      </p>
    </Page>
  )
}
