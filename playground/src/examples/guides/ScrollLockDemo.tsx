import { Modal } from '@pearpages/modals'

export default function ScrollLockDemo() {
  return (
    <>
      <Modal.Trigger target="scroll-lock" asChild>
        <Modal.Button variant="primary">Open and try to scroll</Modal.Button>
      </Modal.Trigger>

      <Modal id="scroll-lock">
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>The page behind is locked</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>
            <p>
              Scrolling with the wheel, a trackpad or a touch drag moves nothing behind
              this modal, and the page does not jump sideways when the scrollbar is
              removed — its width is measured and compensated for.
            </p>
            <p>
              The body stays locked until the last modal in the stack closes, so nesting
              does not unlock it early.
            </p>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}
