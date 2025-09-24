import { useState } from 'react';
import { Modal } from "@/Modal";

function MultiLineDescriptionModal() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal id="multiline-desc" open={open} onOpenChange={setOpen}>
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>Complex Header Layout</Modal.Title>
          <Modal.Description>
            This is a longer description that spans multiple lines to demonstrate how the header
            spacing optimization handles more complex layouts. The description should wrap gracefully
            while maintaining proper spacing relationships with both the title above and the close button.
          </Modal.Description>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <div className="header-spacing-demo__modal-content">
            <p>This modal tests complex header layouts with multi-line descriptions.</p>
            <div className="header-spacing-demo__layout-features">
              <strong>📋 Layout Features:</strong>
              <ul>
                <li>Multi-line description wrapping</li>
                <li>Proper max-width calculation</li>
                <li>Close button top alignment</li>
                <li>Consistent vertical rhythm</li>
              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="secondary" onClick={handleClose}>
            Perfect!
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

function MultiLineDescriptionModalTrigger() {
  return (
    <Modal.Trigger target="multiline-desc" asChild>
      <Modal.Button variant="secondary" size="large">
        <strong>Multi-line Description</strong>
        <small>Complex layout</small>
      </Modal.Button>
    </Modal.Trigger>
  );
}

// Compound component pattern
MultiLineDescriptionModal.Trigger = MultiLineDescriptionModalTrigger;

export { MultiLineDescriptionModal };