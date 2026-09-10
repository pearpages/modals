import { useState } from 'react'
import { Modal } from '@pearpages/modals'

export default function ControlledModal() {
  const [open, setOpen] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  return (
    <>
      <Modal.Button variant="primary" onClick={() => setOpen(true)}>
        Open (controlled)
      </Modal.Button>
      <span>{open ? 'state: open' : 'state: closed'}</span>
      {confirmed && <span>confirmed</span>}

      {/* You own the state. Escape, backdrop clicks and Modal.Close call
          onOpenChange and nothing else — until you flip `open`, the modal
          stays put. That is what lets you refuse: here, closing is declined
          while the checkbox is unticked. */}
      <Modal
        id="controlled"
        open={open}
        onOpenChange={(next) => {
          if (next || confirmed) setOpen(next)
        }}
      >
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Controlled modal</Modal.Title>
            <Modal.Close />
          </Modal.Header>

          <Modal.Body>
            <label>
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />{' '}
              I understand
            </label>
            <p>The footer button only closes once this is ticked.</p>
          </Modal.Body>

          <Modal.Footer>
            <Modal.Button
              variant="primary"
              disabled={!confirmed}
              onClick={() => setOpen(false)}
            >
              Continue
            </Modal.Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}
