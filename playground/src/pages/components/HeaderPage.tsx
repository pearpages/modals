import { Link } from 'react-router-dom'
import { Page } from '../../components/Page'
import { Showcase } from '../../components/Showcase'
import { PropsTable } from '../../components/PropsTable'
import { Callout } from '../../components/Callout'
import HeaderAnatomy from '../../examples/components/modal-header/HeaderAnatomy'
import headerAnatomySource from '../../examples/components/modal-header/HeaderAnatomy.tsx?raw'
import HeaderCustomIds from '../../examples/components/modal-header/HeaderCustomIds'
import headerCustomIdsSource from '../../examples/components/modal-header/HeaderCustomIds.tsx?raw'

const slotRows = [
  {
    name: 'asChild',
    type: 'boolean',
    default: 'false',
    description: 'Render your own element instead.',
  },
  { name: 'className', type: 'string', description: 'Appended to the component class.' },
]

export function HeaderPage() {
  return (
    <Page
      title="Header, Title & Description"
      lead="Three components that are almost always used together — and that produce the dialog's accessible name and description between them."
    >
      <Showcase
        title="Anatomy"
        code={headerAnatomySource}
        fileName="HeaderAnatomy.tsx"
        description="Header lifts any Modal.Close into the corner, whatever order you write it in."
      >
        <HeaderAnatomy />
      </Showcase>

      <h2>Modal.Header</h2>
      <p>
        A layout slot. It separates the close button from everything else, so the title
        and description stack on the left and the close button sits top-right, without
        you positioning anything.
      </p>
      <PropsTable
        caption="Modal.Header"
        rows={[
          ...slotRows,
          { name: 'children', type: 'ReactNode', description: 'Title, description, close.' },
        ]}
      />

      <Callout variant="warning" title="Close detection is by displayName">
        <p>
          The header finds the close button by looking for a child whose{' '}
          <code>displayName</code> is <code>Modal.Close</code>. Wrapping{' '}
          <code>Modal.Close</code> in a component of your own hides it, and it will be
          laid out as ordinary content instead.
        </p>
      </Callout>

      <h2>Modal.Title</h2>
      <p>
        Renders an <code>h2</code> and becomes the dialog&apos;s{' '}
        <code>aria-labelledby</code> target. Omit it and the dialog has no accessible
        name, which screen readers will announce as just &ldquo;dialog&rdquo;.
      </p>
      <PropsTable
        caption="Modal.Title"
        rows={[
          ...slotRows,
          {
            name: 'id',
            type: 'string',
            default: 'generated',
            description: 'Override when something outside the modal must reference it.',
          },
          { name: 'children', type: 'ReactNode', required: true, description: 'The title text.' },
        ]}
      />

      <h2>Modal.Description</h2>
      <p>
        Renders a <code>p</code> and becomes the <code>aria-describedby</code> target.
        Optional — use it for the sentence that explains the consequence of the action.
      </p>
      <PropsTable
        caption="Modal.Description"
        rows={[
          ...slotRows,
          { name: 'id', type: 'string', default: 'generated', description: 'Override the generated id.' },
          { name: 'children', type: 'ReactNode', required: true, description: 'The description text.' },
        ]}
      />

      <Showcase
        title="Your own ids"
        code={headerCustomIdsSource}
        fileName="HeaderCustomIds.tsx"
        description="Ids are generated unless you supply them."
      >
        <HeaderCustomIds />
      </Showcase>

      <p>
        More on how this is wired in{' '}
        <Link to="/guides/accessibility">Accessibility</Link>.
      </p>
    </Page>
  )
}
