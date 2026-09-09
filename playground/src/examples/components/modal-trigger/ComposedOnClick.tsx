import { useState } from 'react'
import { Modal } from '@pearpages/modals'

export default function ComposedOnClick() {
  const [clicks, setClicks] = useState(0)

  return (
    <>
      {/* Your onClick runs first and the modal still opens. Call
          event.preventDefault() in it to stop the modal from opening. */}
      <Modal.Trigger target="trigger-composed" onClick={() => setClicks((n) => n + 1)}>
        Track and open
      </Modal.Trigger>

      <span>clicked {clicks} times</span>

      <Modal id="trigger-composed">
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Both handlers ran</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>The counter incremented and the modal opened.</Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}
