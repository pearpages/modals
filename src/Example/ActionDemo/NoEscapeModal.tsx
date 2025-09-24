import { Modal } from "@/Modal";

function NoEscapeModal() {
  return (
    <Modal id="no-escape-close">
      <Modal.Content closeOnEscape={false}>
        <Modal.Header>
          <Modal.Title>⌨️ No Escape Close</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <p>This modal won't close when you press Escape. Try it!</p>
          <p className="action-demo__code-hint">closeOnEscape={false}</p>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

function NoEscapeModalTrigger() {
  return (
    <Modal.Trigger target="no-escape-close" asChild>
      <Modal.Button variant="danger" size="small">
        No Escape Close
      </Modal.Button>
    </Modal.Trigger>
  );
}

// Compound component pattern
NoEscapeModal.Trigger = NoEscapeModalTrigger;

export { NoEscapeModal };
