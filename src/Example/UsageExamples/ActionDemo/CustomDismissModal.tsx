import { Modal } from "@/Modal";

function CustomDismissModal() {
  const handleInteractOutside = (e: {
    target: EventTarget;
    preventDefault(): void;
  }) => {
    const shouldPrevent = confirm("Are you sure you want to close this modal?");
    if (!shouldPrevent) {
      e.preventDefault();
    }
  };

  return (
    <Modal id="custom-dismiss">
      <Modal.Content onInteractOutside={handleInteractOutside}>
        <Modal.Header>
          <Modal.Title>❓ Custom Dismiss</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <p>
            This modal asks for confirmation before closing via backdrop or
            escape.
          </p>
          <p className="action-demo__code-hint">
            onInteractOutside with confirmation
          </p>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

function CustomDismissModalTrigger() {
  return (
    <Modal.Trigger target="custom-dismiss" asChild>
      <Modal.Button variant="success" size="small">
        Custom Dismiss
      </Modal.Button>
    </Modal.Trigger>
  );
}

// Compound component pattern
CustomDismissModal.Trigger = CustomDismissModalTrigger;

export { CustomDismissModal };
