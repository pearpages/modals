import { Modal } from '@pearpages/modals'

export default function CloseVariants() {
  return (
    <>
      <Modal.Trigger target="close-variants" asChild>
        <Modal.Button>Open</Modal.Button>
      </Modal.Trigger>

      <Modal id="close-variants">
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Ways to close</Modal.Title>
            {/* With no children, Modal.Close renders a × button labelled
                "Close modal" for screen readers. */}
            <Modal.Close />
          </Modal.Header>

          <Modal.Body>Escape and a backdrop click also close this modal.</Modal.Body>

          <Modal.Footer>
            {/* Your own text. */}
            <Modal.Close>Not now</Modal.Close>

            {/* Or your own element entirely — your onClick runs first, and the
                modal still closes unless you call preventDefault(). */}
            <Modal.Close asChild>
              <Modal.Button variant="primary" onClick={() => console.log('confirmed')}>
                Confirm
              </Modal.Button>
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}
