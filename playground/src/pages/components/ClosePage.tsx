import { Page } from '../../components/Page'
import { Showcase } from '../../components/Showcase'
import { PropsTable } from '../../components/PropsTable'
import CloseVariants from '../../examples/components/modal-close/CloseVariants'
import closeVariantsSource from '../../examples/components/modal-close/CloseVariants.tsx?raw'

export function ClosePage() {
  return (
    <Page title="Modal.Close" lead="Closes the modal it is inside. No id needed.">
      <PropsTable
        rows={[
          { name: 'asChild', type: 'boolean', default: 'false', description: 'Use your own element.' },
          { name: 'className', type: 'string', description: 'Appended to the component class.' },
          {
            name: 'children',
            type: 'ReactNode',
            default: '×',
            description: 'Label. Defaults to a × glyph.',
          },
        ]}
      />
      <p>
        Other button attributes are forwarded. With no children it renders a{' '}
        <code>×</code> button labelled <code>Close modal</code> for assistive
        technology.
      </p>

      <Showcase
        title="Three ways to write one"
        code={closeVariantsSource}
        fileName="CloseVariants.tsx"
        description="Your onClick runs before the modal closes; call preventDefault() to keep it open."
      >
        <CloseVariants />
      </Showcase>
    </Page>
  )
}
