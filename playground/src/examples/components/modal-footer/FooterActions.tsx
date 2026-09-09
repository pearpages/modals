import { Modal } from '@pearpages/modals'

export default function FooterActions() {
  return (
    <>
      <Modal.Trigger target="footer-single" asChild>
        <Modal.Button>One action</Modal.Button>
      </Modal.Trigger>
      <Modal.Trigger target="footer-multi" asChild>
        <Modal.Button>Three actions</Modal.Button>
      </Modal.Trigger>

      <Modal id="footer-single">
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Saved</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>Your changes are live.</Modal.Body>
          <Modal.Footer>
            <Modal.Close asChild>
              <Modal.Button variant="primary">Done</Modal.Button>
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal id="footer-multi">
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Unsaved changes</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>You have edits that have not been saved yet.</Modal.Body>
          {/* Buttons sit in a row on desktop and stack on narrow screens, with
              the primary action ending up nearest the thumb. */}
          <Modal.Footer>
            <Modal.Close asChild>
              <Modal.Button variant="danger">Discard</Modal.Button>
            </Modal.Close>
            <Modal.Close asChild>
              <Modal.Button>Keep editing</Modal.Button>
            </Modal.Close>
            <Modal.Close asChild>
              <Modal.Button variant="primary">Save</Modal.Button>
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}
