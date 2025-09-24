import { Modal } from "@/Modal";
import { useModalStack } from "@/ModalProvider";

interface Props {
  demoData: { userCount: number; lastAction: string };
}

function DeleteUserModal({ demoData }: Props) {
  const modals = useModalStack();

  const handleCancel = () => {
    modals.close("confirm-delete");
  };

  const handleDelete = () => {
    // Simulate delete action
    console.log("Deleting user account...");
    alert(`User account deleted! Remaining users: ${demoData.userCount - 1}`);
    modals.close("confirm-delete");
  };

  return (
    <Modal id="confirm-delete">
      <Modal.Content>
        <Modal.Header>
          <Modal.Title className="confirmation-modal__title">
            ⚠️ Confirm Deletion
          </Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <p className="confirmation-modal__description">
            Are you sure you want to delete this user account? This action
            cannot be undone.
          </p>
          <div className="confirmation-modal__data-display">
            <strong>Current Users:</strong> {demoData.userCount}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Modal.Button>
          <Modal.Button variant="danger" onClick={handleDelete}>
            Delete Account
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

function DeleteUserModalTrigger() {
  return (
    <Modal.Trigger target="confirm-delete" asChild>
      <Modal.Button variant="danger" size="small">
        Delete User Account
      </Modal.Button>
    </Modal.Trigger>
  );
}

// Compound component pattern
DeleteUserModal.Trigger = DeleteUserModalTrigger;

export { DeleteUserModal };
