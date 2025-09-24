import { useState } from 'react';
import { Modal } from "@/Modal";

function TitleDescriptionModal() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal id="title-desc" open={open} onOpenChange={setOpen}>
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>Title with Description</Modal.Title>
          <Modal.Description>
            This description provides additional context about the modal's purpose
          </Modal.Description>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <div className="header-spacing-demo__modal-content">
            <p>This modal demonstrates optimized spacing between title and description.</p>
            <ul>
              <li>Title and description have proper margin relationships</li>
              <li>Close button is optically aligned with the title baseline</li>
              <li>Description max-width accounts for close button space</li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="success" onClick={handleClose}>
            Got it!
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

function TitleDescriptionModalTrigger() {
  return (
    <Modal.Trigger target="title-desc" asChild>
      <Modal.Button variant="success" size="large">
        <strong>Title + Description</strong>
        <small>Balanced spacing</small>
      </Modal.Button>
    </Modal.Trigger>
  );
}

// Compound component pattern
TitleDescriptionModal.Trigger = TitleDescriptionModalTrigger;

export { TitleDescriptionModal };