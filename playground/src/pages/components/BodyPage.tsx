import { Page } from '../../components/Page'
import { Showcase } from '../../components/Showcase'
import { PropsTable } from '../../components/PropsTable'
import BodyScrolling from '../../examples/components/modal-body/BodyScrolling'
import bodyScrollingSource from '../../examples/components/modal-body/BodyScrolling.tsx?raw'
import BodyContentTypes from '../../examples/components/modal-body/BodyContentTypes'
import bodyContentTypesSource from '../../examples/components/modal-body/BodyContentTypes.tsx?raw'

export function BodyPage() {
  return (
    <Page
      title="Modal.Body"
      lead="The main content area, and the only part of the modal that scrolls."
    >
      <PropsTable
        rows={[
          { name: 'asChild', type: 'boolean', default: 'false', description: 'Render your own element.' },
          { name: 'className', type: 'string', description: 'Appended to the component class.' },
          {
            name: 'children',
            type: 'ReactNode',
            description: 'The content. An empty body is valid.',
          },
        ]}
      />

      <Showcase
        title="Overflow"
        code={bodyScrollingSource}
        fileName="BodyScrolling.tsx"
        description="Header and footer stay fixed while the body scrolls, and the modal never exceeds the viewport."
      >
        <BodyScrolling />
      </Showcase>

      <Showcase
        title="Any content"
        code={bodyContentTypesSource}
        fileName="BodyContentTypes.tsx"
        description="Media is capped at the body width; content too wide to wrap scrolls sideways inside the body rather than stretching the modal."
      >
        <BodyContentTypes />
      </Showcase>
    </Page>
  )
}
