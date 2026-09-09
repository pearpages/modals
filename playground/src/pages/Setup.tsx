import { Link } from 'react-router-dom'
import { Page } from '../components/Page'
import { CodeBlock } from '../components/CodeBlock'
import { PropsTable } from '../components/PropsTable'
import { Callout } from '../components/Callout'
import modalSystemSource from '../examples/setup/ModalSystemSetup.tsx?raw'
import manualProviderSource from '../examples/setup/ManualProviderSetup.tsx?raw'

export function Setup() {
  return (
    <Page
      title="Setup"
      lead="Mount the system once. Everything below it can open a modal."
    >
      <h2>ModalSystem — the short way</h2>
      <p>
        <code>ModalSystem</code> is <code>ModalProvider</code> and{' '}
        <code>ModalRoot</code> composed together. Unless you need the portal to render
        somewhere specific, this is the one to use.
      </p>
      <CodeBlock code={modalSystemSource} title="App.tsx" />

      <PropsTable
        caption="ModalSystem"
        rows={[
          {
            name: 'baseZIndex',
            type: 'number',
            default: '1000',
            description: (
              <>
                Bottom of the stacking range. Each open modal renders at{' '}
                <code>baseZIndex + stackIndex</code>.
              </>
            ),
          },
          {
            name: 'container',
            type: 'HTMLElement',
            default: 'document.body',
            description: (
              <>
                Where the portal mounts. See{' '}
                <Link to="/guides/portal-container">Portal container</Link>.
              </>
            ),
          },
          { name: 'children', type: 'ReactNode', required: true, description: 'Your app.' },
        ]}
      />

      <h2>Provider and root, separately</h2>
      <p>
        Composing them by hand is worth it when the portal has to mount inside a
        specific element, or when the provider and the root cannot sit next to each
        other in your tree.
      </p>
      <CodeBlock code={manualProviderSource} title="App.tsx" />

      <Callout variant="warning" title="Set baseZIndex on the provider">
        <p>
          <code>ModalRoot</code> and <code>Modal.Content</code> both read{' '}
          <code>baseZIndex</code> from context. Setting it on the provider keeps them
          in the same layer band; passing a different value to{' '}
          <code>ModalRoot</code> puts the backdrop somewhere the content is not.
        </p>
      </Callout>

      <PropsTable
        caption="ModalProvider"
        rows={[
          {
            name: 'baseZIndex',
            type: 'number',
            default: '1000',
            description: 'Bottom of the stacking range, shared through context.',
          },
          { name: 'children', type: 'ReactNode', required: true, description: 'Your app.' },
        ]}
      />

      <PropsTable
        caption="ModalRoot"
        rows={[
          {
            name: 'container',
            type: 'HTMLElement',
            default: 'document.body',
            description: 'Element the portal renders into.',
          },
          {
            name: 'baseZIndex',
            type: 'number',
            default: 'from context',
            description: 'Overrides the provider value. Prefer setting it on the provider.',
          },
        ]}
      />

      <h2>Server rendering</h2>
      <p>
        <code>ModalRoot</code> renders <code>null</code> on the server and mounts its
        portal after hydration, so there is nothing to guard and no hydration mismatch
        to work around. A modal that should be open on first paint has to be opened
        from an effect on the client.
      </p>
    </Page>
  )
}
