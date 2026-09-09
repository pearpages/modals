import { Modal } from '@pearpages/modals'

// Assumes a <ModalSystem> ancestor — see /setup
export default function FirstModal() {
  return (
    <>
      <Modal.Trigger target="first-modal">Open modal</Modal.Trigger>

      <Modal id="first-modal">
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Publish this page?</Modal.Title>
            <Modal.Close />
          </Modal.Header>

          <Modal.Body>
            <Modal.Description>
              Anyone with the link will be able to read it. You can unpublish at any time.
            </Modal.Description>
          </Modal.Body>

          <Modal.Footer>
            <Modal.Close asChild>
              <Modal.Button variant="secondary">Cancel</Modal.Button>
            </Modal.Close>
            <Modal.Close asChild>
              <Modal.Button variant="primary">Publish</Modal.Button>
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}
