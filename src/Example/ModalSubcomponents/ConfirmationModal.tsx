import React from "react";
import { Modal } from "@/Modal";
import { useModalStack } from "@/ModalProvider";

const ConfirmationModal = () => {
  const modals = useModalStack();
  const close = () => modals.close(ConfirmationModal.id);

  const handleDelete = () => {
    alert("Item deleted!");
    close();
  };

  const handleCancel = () => {
    close();
  };

  return (
    <Modal id={ConfirmationModal.id}>
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>Delete Confirmation</Modal.Title>
          <Modal.Description>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </Modal.Description>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body>
          <p>Additional content can go here between description and footer.</p>
        </Modal.Body>

        <Modal.Footer>
          <Modal.Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Modal.Button>
          <Modal.Button variant="danger" onClick={handleDelete}>
            Delete
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

ConfirmationModal.id = "confirm-modal";
ConfirmationModal.Trigger = ({
  onClick,
  ...props
}: {
  onClick?: () => void;
} & React.ComponentProps<"div">) => {
  const handleClick = () => {
    console.log("Opening delete confirmation modal...");
    onClick?.();
  };

  return (
    <Modal.Trigger target={ConfirmationModal.id} {...props} asChild>
      <Modal.Button variant="primary" onClick={handleClick}>
        Show Confirmation Modal
      </Modal.Button>
    </Modal.Trigger>
  );
};

export { ConfirmationModal };
