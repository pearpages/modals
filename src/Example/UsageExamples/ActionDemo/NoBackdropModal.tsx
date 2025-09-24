import { Modal } from "@/Modal";

function NoBackdropModal() {
  return (
    <Modal id="no-backdrop-close">
      <Modal.Content closeOnBackdrop={false}>
        <Modal.Header>
          <Modal.Title>🚫 No Backdrop Close</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <p>This modal won't close when you click the backdrop. Try it!</p>
          <p className="action-demo__code-hint">closeOnBackdrop={false}</p>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

function NoBackdropModalTrigger() {
  return (
    <Modal.Trigger target="no-backdrop-close" asChild>
      <Modal.Button variant="primary" size="small">
        No Backdrop Close
      </Modal.Button>
    </Modal.Trigger>
  );
}

// Compound component pattern
NoBackdropModal.Trigger = NoBackdropModalTrigger;

export { NoBackdropModal };
