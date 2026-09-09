import { Modal, useModalStack } from '@pearpages/modals'

export default function StackInspector() {
  const modals = useModalStack()
  const entry = modals.getModal('inspected')

  return (
    <>
      <Modal.Button variant="primary" onClick={() => modals.open('inspected')}>
        Open
      </Modal.Button>

      {/* getModal returns the full stack entry, or undefined when the id is not
          registered — handy for debugging z-index and stacking questions. */}
      <pre>
        {JSON.stringify(
          {
            isOpen: modals.isOpen('inspected'),
            stackIndex: entry?.stackIndex ?? null,
            isTop: entry?.isTop ?? null,
          },
          null,
          2,
        )}
      </pre>

      <Modal id="inspected">
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Inspected modal</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>The readout behind this modal updated when it opened.</Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}
