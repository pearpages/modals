import { Link } from 'react-router-dom'
import { Page } from '../../components/Page'
import { CodeBlock } from '../../components/CodeBlock'
import { PropsTable } from '../../components/PropsTable'
import { Callout } from '../../components/Callout'

export function ModalPage() {
  return (
    <Page
      title="Modal"
      lead="The registration point. It owns an id and decides whether its children exist."
    >
      <CodeBlock
        code={`<Modal id="publish">
  <Modal.Content>{/* ... */}</Modal.Content>
</Modal>`}
      />

      <PropsTable
        rows={[
          {
            name: 'id',
            type: 'string',
            required: true,
            description: (
              <>
                Unique within the provider. Registering the same id twice logs a warning
                and only the first modal is reachable.
              </>
            ),
          },
          {
            name: 'open',
            type: 'boolean',
            description: (
              <>
                Makes the modal controlled — you own the state. See{' '}
                <Link to="/guides/controlled">Controlled</Link>.
              </>
            ),
          },
          {
            name: 'onOpenChange',
            type: '(open: boolean) => void',
            description: 'Called when the modal asks to open or close.',
          },
          { name: 'className', type: 'string', description: 'Applied to the wrapper element.' },
          {
            name: 'children',
            type: 'ReactNode',
            required: true,
            description: 'Usually a single Modal.Content.',
          },
        ]}
      />
      <p>
        Any other prop is spread onto the wrapper <code>&lt;div&gt;</code>, which also
        carries <code>data-modal-id</code>.
      </p>

      <h2>Closed modals do not exist</h2>
      <p>
        A closed <code>Modal</code> renders <code>null</code>. Its children are
        unmounted, so their state is discarded and any effects they hold are cleaned
        up. Reopening starts from scratch.
      </p>
      <p>
        This is usually what you want, and it has one consequence worth knowing: state
        that must survive closing belongs in the component that renders the modal, not
        inside it.
      </p>

      <Callout variant="warning" title="A trigger cannot live inside the modal it opens">
        <p>
          Because a closed modal renders nothing, a <code>Modal.Trigger</code> nested
          inside the <code>Modal</code> it targets can never be clicked. Put it outside
          — or inside a <em>different</em> modal, which is how nesting works.
        </p>
      </Callout>

      <h2>Three ways to open one</h2>
      <ul>
        <li>
          <code>Modal.Trigger</code> — declarative, and handles focus return for you.
        </li>
        <li>
          <Link to="/hooks/use-modal-stack">
            <code>useModalStack</code>
          </Link>{' '}
          — from code, by id.
        </li>
        <li>
          The <code>open</code> prop — when your component owns the state.
        </li>
      </ul>
      <p>
        Pick one per modal. The first two both write to the provider&apos;s registry and
        work together; combining either with <code>open</code> means two owners of one
        piece of state, and they will fight.
      </p>
    </Page>
  )
}
