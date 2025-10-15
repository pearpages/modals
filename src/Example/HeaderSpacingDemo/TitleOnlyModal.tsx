import { useState } from "react";
import { Modal } from "@/Modal";

function TitleOnlyModal() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal id="title-only" open={open} onOpenChange={setOpen}>
      <Modal.Content size="auto">
        <Modal.Header>
          <Modal.Title>Simple Title</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <div className="header-spacing-demo__modal-content">
            <p>
              This modal demonstrates header spacing when only a title is
              present.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="secondary" onClick={handleClose}>
            Close
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

function TitleOnlyModalTrigger() {
  return (
    <Modal.Trigger target="title-only" asChild>
      <Modal.Button variant="primary" size="large">
        Optimized centering
      </Modal.Button>
    </Modal.Trigger>
  );
}

// Compound component pattern
TitleOnlyModal.Trigger = TitleOnlyModalTrigger;

export { TitleOnlyModal };
