import { useState } from "react";
import { Modal } from "@/Modal";

function FormModal() {
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // Simulate form submission
    alert("Form submitted successfully!");
    setOpen(false);
  };

  return (
    <Modal id={FormModal.id} open={open} onOpenChange={setOpen}>
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>Contact Form</Modal.Title>
          <Modal.Description>
            Full-width button optimization for forms
          </Modal.Description>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <form className="footer-mobile-demo__form">
            <div className="footer-mobile-demo__form-field">
              <label>Name:</label>
              <input type="text" placeholder="Enter your name" />
            </div>
            <div className="footer-mobile-demo__form-field">
              <label>Email:</label>
              <input type="email" placeholder="Enter your email" />
            </div>
            <div className="footer-mobile-demo__form-field">
              <label>Message:</label>
              <textarea rows={4} placeholder="Enter your message" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Modal.Button>
          <Modal.Button variant="danger" onClick={handleSubmit}>
            Send Message
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

function FormModalTrigger() {
  return (
    <Modal.Trigger target={FormModal.id} asChild>
      <Modal.Button variant="danger" size="large">
        Full-width buttons
      </Modal.Button>
    </Modal.Trigger>
  );
}

FormModal.id = "form-modal";
FormModal.Trigger = FormModalTrigger;

export { FormModal };
