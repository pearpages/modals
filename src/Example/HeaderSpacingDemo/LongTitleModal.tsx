import { useState } from 'react';
import { Modal } from "@/Modal";

function LongTitleModal() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal id="long-title" open={open} onOpenChange={setOpen}>
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>
            This is a Very Long Title That Demonstrates How the Header Handles Text Wrapping and Close Button Positioning
          </Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <div className="header-spacing-demo__modal-content">
            <p>This modal tests how the header handles long titles that may wrap to multiple lines.</p>
            <p><strong>Key behaviors:</strong></p>
            <ul>
              <li>Title wraps gracefully without interfering with close button</li>
              <li>Close button stays aligned to the top of the title area</li>
              <li>Spacing remains consistent even with wrapped text</li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="danger" onClick={handleClose}>
            Close Long Title
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

function LongTitleModalTrigger() {
  return (
    <Modal.Trigger target="long-title" asChild>
      <Modal.Button variant="danger" size="large">
        <strong>Long Title</strong>
        <small>Text wrapping</small>
      </Modal.Button>
    </Modal.Trigger>
  );
}

// Compound component pattern
LongTitleModal.Trigger = LongTitleModalTrigger;

export { LongTitleModal };