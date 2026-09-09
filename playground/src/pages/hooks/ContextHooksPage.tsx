import { Page } from '../../components/Page'
import { Showcase } from '../../components/Showcase'
import { PropsTable } from '../../components/PropsTable'
import { Callout } from '../../components/Callout'
import CustomSubcomponent from '../../examples/hooks/CustomSubcomponent'
import customSubcomponentSource from '../../examples/hooks/CustomSubcomponent.tsx?raw'

export function ContextHooksPage() {
  return (
    <Page
      title="Context hooks"
      lead="The hooks the library uses on itself, for when you build subcomponents of your own."
    >
      <Callout variant="warning" title="Lower level than the rest">
        <p>
          These expose internal state. They are stable and exported deliberately, but{' '}
          <code>useModalStack</code> is the hook you want for opening and closing
          modals.
        </p>
      </Callout>

      <PropsTable
        caption="Exported hooks"
        rows={[
          {
            name: 'useModalId',
            type: '() => string',
            description:
              'The id of the enclosing modal. Throws outside one, which makes it a useful guard.',
          },
          {
            name: 'useModalAria',
            type: '() => ModalAriaContextValue',
            description:
              'The generated titleId and descriptionId, plus the register/unregister functions the built-in Title and Description use.',
          },
          {
            name: 'useModalContext',
            type: '() => ModalContextValue',
            description:
              'The whole provider: registry, stack, baseZIndex and every action. Throws outside a provider.',
          },
          {
            name: 'useModalPortal',
            type: '(id: string) => HTMLElement | null',
            description:
              'The portal node for a modal. Null until the root has created it — it is found through a MutationObserver.',
          },
          {
            name: 'useModalDismissConfig',
            type: '(id, config) => void',
            description:
              'Registers closeOnBackdrop / closeOnEscape / onInteractOutside for a modal. Modal.Content calls this for you.',
          },
          {
            name: 'useFocusTrap',
            type: '(ref, isActive) => void',
            description:
              'Traps Tab within a container and focuses its first focusable element. Re-runs when isActive changes, so pass false until the element exists.',
          },
          {
            name: 'useBodyScrollLock',
            type: '(isLocked: boolean) => void',
            description:
              'Locks body scroll, compensating for the scrollbar width, with an iOS-specific path.',
          },
        ]}
      />

      <Showcase
        title="A subcomponent of your own"
        code={customSubcomponentSource}
        fileName="CustomSubcomponent.tsx"
        description="useModalId and useModalAria let your component take part in the modal's ARIA wiring the way the built-in ones do."
      >
        <CustomSubcomponent />
      </Showcase>
    </Page>
  )
}
