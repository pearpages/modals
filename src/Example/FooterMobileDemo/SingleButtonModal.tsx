import { useState } from "react";
import { Modal } from "@/Modal";

function SingleButtonModal() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal id={SingleButtonModal.id} open={open} onOpenChange={setOpen}>
      <Modal.Content size="auto">
        <Modal.Header>
          <Modal.Title>Single Action</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <p>This modal has a single button in the footer.</p>
          <p>
            <strong>Mobile behavior:</strong> Standard layout with compact
            spacing.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="primary" onClick={handleClose}>
            Close
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

function SingleButtonModalTrigger() {
  return (
    <Modal.Trigger target={SingleButtonModal.id} asChild>
      <Modal.Button variant="primary" size="large">
        Standard footer layout
      </Modal.Button>
    </Modal.Trigger>
  );
}

SingleButtonModal.id = "single-button";
SingleButtonModal.Trigger = SingleButtonModalTrigger;

export { SingleButtonModal };
