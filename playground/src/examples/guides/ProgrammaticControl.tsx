import { Modal, useModalStack } from '@pearpages/modals'

export default function ProgrammaticControl() {
  const modals = useModalStack()

  return (
    <>
      {/* No state of your own: the provider holds it, and you address modals
          by id. Do not combine this with the `open` prop on the same modal. */}
      <Modal.Button variant="primary" onClick={() => modals.open('programmatic')}>
        Open from code
      </Modal.Button>
      <Modal.Button onClick={() => modals.close('programmatic')}>Close from code</Modal.Button>
      <span>{modals.isOpen('programmatic') ? 'open' : 'closed'}</span>

      <Modal id="programmatic">
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Opened programmatically</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>
            <p>
              Useful when the thing that opens a modal is not a button — a failed
              request, a timer, a route change.
            </p>
            <Modal.Button onClick={() => modals.close('programmatic')}>
              Close myself
            </Modal.Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}
