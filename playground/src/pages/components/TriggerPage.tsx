import { Page } from '../../components/Page'
import { Showcase } from '../../components/Showcase'
import { PropsTable } from '../../components/PropsTable'
import BasicTrigger from '../../examples/components/modal-trigger/BasicTrigger'
import basicTriggerSource from '../../examples/components/modal-trigger/BasicTrigger.tsx?raw'
import AsChildTrigger from '../../examples/components/modal-trigger/AsChildTrigger'
import asChildTriggerSource from '../../examples/components/modal-trigger/AsChildTrigger.tsx?raw'
import ComposedOnClick from '../../examples/components/modal-trigger/ComposedOnClick'
import composedOnClickSource from '../../examples/components/modal-trigger/ComposedOnClick.tsx?raw'
import DisabledTrigger from '../../examples/components/modal-trigger/DisabledTrigger'
import disabledTriggerSource from '../../examples/components/modal-trigger/DisabledTrigger.tsx?raw'

export function TriggerPage() {
  return (
    <Page
      title="Modal.Trigger"
      lead="Opens a modal by id, and gets focus back when it closes."
    >
      <PropsTable
        rows={[
          {
            name: 'target',
            type: 'string',
            required: true,
            description:
              'Id of the modal to open. An unregistered target logs a warning and does nothing.',
          },
          {
            name: 'asChild',
            type: 'boolean',
            default: 'false',
            description: 'Use your own element instead of rendering a button.',
          },
          {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Ignores clicks and keyboard activation.',
          },
          {
            name: 'children',
            type: 'ReactNode',
            required: true,
            description: 'Label, or a single element when asChild is set.',
          },
        ]}
      />
      <p>
        Everything else is a normal button attribute and is forwarded, including{' '}
        <code>onClick</code>, <code>type</code>, <code>aria-*</code> and{' '}
        <code>data-*</code>.
      </p>

      <Showcase
        title="A trigger"
        code={basicTriggerSource}
        fileName="BasicTrigger.tsx"
        description={
          <>
            Renders a real <code>&lt;button type="button"&gt;</code> with{' '}
            <code>aria-haspopup="dialog"</code>, so Enter and Space work without extra
            handlers.
          </>
        }
      >
        <BasicTrigger />
      </Showcase>

      <Showcase
        title="Your own element"
        code={asChildTriggerSource}
        fileName="AsChildTrigger.tsx"
        description={
          <>
            <code>asChild</code> passes the behaviour to the child instead of wrapping
            it — which is how you avoid nesting a button inside a button.
          </>
        }
      >
        <AsChildTrigger />
      </Showcase>

      <Showcase
        title="Your onClick still runs"
        code={composedOnClickSource}
        fileName="ComposedOnClick.tsx"
        description="Handlers compose rather than replace. Call preventDefault() to stop the modal opening."
      >
        <ComposedOnClick />
      </Showcase>

      <Showcase
        title="Disabled"
        code={disabledTriggerSource}
        fileName="DisabledTrigger.tsx"
        description="Neither of these opens anything."
      >
        <DisabledTrigger />
      </Showcase>
    </Page>
  )
}
