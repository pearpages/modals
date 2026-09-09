import { Modal } from '@pearpages/modals'

export default function BodyScrolling() {
  return (
    <>
      <Modal.Trigger target="body-scrolling" asChild>
        <Modal.Button>Long content</Modal.Button>
      </Modal.Trigger>

      <Modal id="body-scrolling">
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Terms of service</Modal.Title>
            <Modal.Close />
          </Modal.Header>

          {/* Body is the only part that scrolls. Header and footer stay put,
              and the modal never grows past the viewport. */}
          <Modal.Body>
            {Array.from({ length: 30 }, (_, i) => (
              <p key={i}>
                Clause {i + 1}. This paragraph exists so the body overflows and you can
                watch it scroll independently of the header and footer.
              </p>
            ))}
          </Modal.Body>

          <Modal.Footer>
            <Modal.Close asChild>
              <Modal.Button variant="primary">I agree</Modal.Button>
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}
