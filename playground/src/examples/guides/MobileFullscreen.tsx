import { Modal } from '@pearpages/modals'

export default function MobileFullscreen() {
  return (
    <>
      <Modal.Trigger target="mobile-demo" asChild>
        <Modal.Button variant="primary">Open, then narrow the window</Modal.Button>
      </Modal.Trigger>

      <Modal id="mobile-demo">
        {/* auto and md both go fullscreen below 768px on their own — there is
            no separate mobile prop to set. */}
        <Modal.Content size="md">
          <Modal.Header>
            <Modal.Title>Responsive by default</Modal.Title>
            <Modal.Close />
          </Modal.Header>

          <Modal.Body>
            <p>
              Drag the window narrower than 768px: this modal fills the screen, the
              header and footer tighten up, and the footer respects the safe area on
              notched phones.
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Modal.Close asChild>
              <Modal.Button>Cancel</Modal.Button>
            </Modal.Close>
            <Modal.Close asChild>
              <Modal.Button variant="primary">Confirm</Modal.Button>
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}
