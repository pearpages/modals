import { Link } from 'react-router-dom'
import { Page } from '../../components/Page'
import { CodeBlock } from '../../components/CodeBlock'
import { Showcase } from '../../components/Showcase'
import { PropsTable } from '../../components/PropsTable'
import { Callout } from '../../components/Callout'
import StackInspector from '../../examples/hooks/StackInspector'
import stackInspectorSource from '../../examples/hooks/StackInspector.tsx?raw'

export function UseModalStackPage() {
  return (
    <Page
      title="useModalStack"
      lead="Open, close and inspect modals from code, by id."
    >
      <CodeBlock
        language="ts"
        code={`const modals = useModalStack()

modals.open('confirm')
modals.close('confirm')
modals.isOpen('confirm')     // => boolean
modals.getModal('confirm')   // => ModalStackEntry | undefined`}
      />

      <PropsTable
        caption="Returns"
        rows={[
          { name: 'open', type: '(id: string) => void', description: 'Opens the modal with this id.' },
          { name: 'close', type: '(id: string) => void', description: 'Closes it.' },
          {
            name: 'isOpen',
            type: '(id: string) => boolean',
            description: 'Whether it is currently open. False for unknown ids.',
          },
          {
            name: 'getModal',
            type: '(id: string) => ModalStackEntry | undefined',
            description: 'Full stack entry — open, isTop, stackIndex — or undefined.',
          },
        ]}
      />

      <Callout variant="info" title="Why functions take an id">
        <p>
          An earlier draft of the API indexed by id — <code>modals['confirm'].open()</code>.
          It reads nicely and cannot be typed honestly: an index signature makes a typo
          type-check and then throw. Exposing <code>isOpen</code> as a value rather
          than a function would also rebuild the returned object whenever any modal
          changed, re-rendering every component that calls the hook.
        </p>
      </Callout>

      <Showcase
        title="Inspecting the stack"
        code={stackInspectorSource}
        fileName="StackInspector.tsx"
        layout="column"
        description="getModal is the one to reach for when a z-index or stacking question needs answering."
      >
        <StackInspector />
      </Showcase>

      <h2>Unknown ids are not errors</h2>
      <p>
        Opening or closing an id that is not registered logs a warning and does
        nothing. <code>isOpen</code> returns <code>false</code> and{' '}
        <code>getModal</code> returns <code>undefined</code>, so you can call them
        before a modal has mounted.
      </p>

      <p>
        A worked example is on <Link to="/guides/programmatic">Programmatic control</Link>.
      </p>
    </Page>
  )
}
