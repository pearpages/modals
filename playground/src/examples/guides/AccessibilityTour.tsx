import { Modal } from '@pearpages/modals'

export default function AccessibilityTour() {
  return (
    <>
      <Modal.Trigger target="a11y-tour" asChild>
        <Modal.Button variant="primary">Open, then press Tab</Modal.Button>
      </Modal.Trigger>

      <Modal id="a11y-tour">
        <Modal.Content>
          <Modal.Header>
            {/* Title and description are wired to the dialog automatically. */}
            <Modal.Title>Accessible by construction</Modal.Title>
            <Modal.Description>
              This text is the dialog&apos;s accessible description.
            </Modal.Description>
            <Modal.Close />
          </Modal.Header>

          <Modal.Body>
            <p>Tab through these and watch focus wrap instead of escaping:</p>
            <Modal.Button>First</Modal.Button>
            <Modal.Button>Second</Modal.Button>
            <a href="#third">A link</a>
            <p>
              Focus moved here when the modal opened, and returns to the button you
              came from when it closes.
            </p>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}
