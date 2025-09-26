import React, { useState } from "react";
import { Modal } from "@/Modal";
import { useModalStack } from "@/index";
import { Box } from "../Box";

export const MediumModal = () => {
  const modals = useModalStack();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleInputChange =
    (field: "name" | "email") => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSave = () => {
    alert("Saving form data: " + JSON.stringify(formData));
    // Reset form
    setFormData({ name: "", email: "" });
    modals.close(MediumModal.ID);
  };

  const handleCancel = () => {
    console.log("Canceling form...");
    // Reset form
    setFormData({ name: "", email: "" });
    modals.close(MediumModal.ID);
  };

  return (
    <Modal id="md-modal">
      <Modal.Content size="md" closeOnBackdrop={false} closeOnEscape={false}>
        <Modal.Header>
          <Modal.Title>Medium Modal</Modal.Title>
          <Modal.Description>
            A standard-sized modal for most use cases
          </Modal.Description>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <p>This is the default medium size modal, perfect for:</p>
          <ul className="md-modal__use-cases">
            <li>Forms with multiple fields</li>
            <li>Content that needs more space</li>
            <li>Tables or lists</li>
            <li>Settings panels</li>
          </ul>

          <form className="md-modal__form">
            <div className="md-modal__form-field">
              <label className="md-modal__label">Name:</label>
              <input
                type="text"
                className="md-modal__input"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange("name")}
              />
            </div>
            <div className="md-modal__form-field">
              <label className="md-modal__label">Email:</label>
              <input
                type="email"
                className="md-modal__input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange("email")}
              />
            </div>
          </form>

          <Box
            variant="success"
            title="💡 Backdrop and escape close disabled: "
          >
            Additionally this modal is preventing the user from closing it by
            clicking on the backdrop or pressing the escape key.
          </Box>

          <Box variant="danger" title="Buttons behavior: ">
            When more than one button is present in the footer and in mobile
            view, they will stack vertically.
          </Box>
        </Modal.Body>

        <Modal.Footer>
          <Modal.Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Modal.Button>
          <Modal.Button variant="primary" onClick={handleSave}>
            Save
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

MediumModal.ID = "md-modal" as const;

// Create compound component with Trigger
MediumModal.Trigger = ({
  children,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
} & React.ComponentProps<"button">) => {
  const modals = useModalStack();

  const handleClick = () => {
    console.log("Opening medium modal with form...");
    modals.open(MediumModal.ID);
    onClick?.();
  };

  return (
    <Modal.Button variant="success" onClick={handleClick} {...props}>
      {children}
    </Modal.Button>
  );
};
