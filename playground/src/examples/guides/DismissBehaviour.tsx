import { useState } from 'react'
import { Modal } from '@pearpages/modals'

export default function DismissBehaviour() {
  const [blocked, setBlocked] = useState(0)

  return (
    <>
      <Modal.Trigger target="dismiss-none" asChild>
        <Modal.Button variant="danger">No backdrop, no escape</Modal.Button>
      </Modal.Trigger>
      <Modal.Trigger target="dismiss-guard" asChild>
        <Modal.Button variant="warning">Guarded dismissal</Modal.Button>
      </Modal.Trigger>
      {blocked > 0 && <span>blocked {blocked} attempts</span>}

      {/* Both off: the only way out is a Modal.Close. Use it sparingly — for
          a destructive confirmation, or work that must not be lost. */}
      <Modal id="dismiss-none">
        <Modal.Content closeOnBackdrop={false} closeOnEscape={false}>
          <Modal.Header>
            <Modal.Title>Deliberate exit only</Modal.Title>
          </Modal.Header>
          <Modal.Body>Clicking outside and pressing Escape both do nothing.</Modal.Body>
          <Modal.Footer>
            <Modal.Close asChild>
              <Modal.Button variant="primary">Understood</Modal.Button>
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {/* onInteractOutside fires for backdrop clicks and Escape. Call
          preventDefault() to keep the modal open and decide for yourself. */}
      <Modal id="dismiss-guard">
        <Modal.Content
          onInteractOutside={(event) => {
            event.preventDefault()
            setBlocked((n) => n + 1)
          }}
        >
          <Modal.Header>
            <Modal.Title>Guarded</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>
            Click the backdrop or press Escape: the attempt is counted and refused.
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}
