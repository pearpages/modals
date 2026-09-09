import { Modal, useModalAria, useModalId } from '@pearpages/modals'

// A subcomponent of your own that participates in the modal's ARIA wiring the
// same way Modal.Title does.
function ModalSubtitle({ children }: { children: string }) {
  const modalId = useModalId()
  const { titleId } = useModalAria()

  return (
    <p aria-describedby={titleId}>
      {children} <small>(modal id: {modalId})</small>
    </p>
  )
}

export default function CustomSubcomponent() {
  return (
    <>
      <Modal.Trigger target="custom-subcomponent" asChild>
        <Modal.Button variant="primary">Open</Modal.Button>
      </Modal.Trigger>

      <Modal id="custom-subcomponent">
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Built from context</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>
            <ModalSubtitle>This line came from a component you wrote.</ModalSubtitle>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}
