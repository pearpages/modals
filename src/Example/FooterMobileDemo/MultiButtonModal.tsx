import { useState } from "react";
import { Modal } from "@/Modal";
import { Box } from "../Box";

function MultiButtonModal() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
  };

  return (
    <Modal id={MultiButtonModal.id} open={open} onOpenChange={setOpen}>
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>Multiple Actions</Modal.Title>
          <Modal.Description>
            Demo of mobile button stacking behavior
          </Modal.Description>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <p>
            This modal demonstrates mobile optimization when multiple buttons
            are present.
          </p>
          <Box variant="success" title="📱 On Mobile (≤768px):">
            <ul>
              <li>Buttons stack vertically (column-reverse)</li>
              <li>Primary action appears at bottom</li>
              <li>Full-width buttons (100% width)</li>
              <li>44px min-height for touch accessibility</li>
            </ul>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="secondary" onClick={handleClose}>
            Cancel
          </Modal.Button>
          <Modal.Button variant="success" onClick={handleConfirm}>
            Confirm Action
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

function MultiButtonModalTrigger() {
  return (
    <Modal.Trigger target={MultiButtonModal.id} asChild>
      <Modal.Button variant="success" size="large">
        Stacked on mobile
      </Modal.Button>
    </Modal.Trigger>
  );
}

MultiButtonModal.id = "multi-button";
MultiButtonModal.Trigger = MultiButtonModalTrigger;

export { MultiButtonModal };
