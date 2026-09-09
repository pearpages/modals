import { useState } from 'react'
import { Modal, useModalStack } from '@pearpages/modals'

export default function AsyncConfirmation() {
  const modals = useModalStack()
  const [deleting, setDeleting] = useState(false)
  const [deleted, setDeleted] = useState(false)

  const remove = async () => {
    setDeleting(true)
    await new Promise((resolve) => window.setTimeout(resolve, 1400))
    setDeleting(false)
    setDeleted(true)
    modals.close('async-delete')
  }

  return (
    <>
      <Modal.Trigger target="async-delete" asChild>
        <Modal.Button variant="danger">Delete project</Modal.Button>
      </Modal.Trigger>
      {deleted && <span>project deleted</span>}

      <Modal id="async-delete">
        {/* While the request is in flight there is no way out: the backdrop and
            Escape are disabled and the close button is not rendered. */}
        <Modal.Content closeOnBackdrop={!deleting} closeOnEscape={!deleting}>
          <Modal.Header>
            <Modal.Title>Delete project</Modal.Title>
            {!deleting && <Modal.Close />}
          </Modal.Header>

          <Modal.Body>
            <p>This cannot be undone.</p>
            <div aria-live="polite">{deleting ? 'Deleting…' : null}</div>
          </Modal.Body>

          <Modal.Footer>
            <Modal.Button disabled={deleting} onClick={() => modals.close('async-delete')}>
              Cancel
            </Modal.Button>
            <Modal.Button variant="danger" loading={deleting} onClick={remove}>
              Delete
            </Modal.Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}
