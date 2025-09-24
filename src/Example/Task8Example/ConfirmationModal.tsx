import React from 'react';
import { Modal } from '@/Modal';

const ConfirmationModal = () => {
  const handleDelete = () => {
    console.log('Delete action confirmed!');
    alert('Item deleted!');
  };

  const handleCancel = () => {
    console.log('Delete action cancelled');
  };

  return (
    <Modal id="confirm-modal">
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>Delete Confirmation</Modal.Title>
          <Modal.Close />
        </Modal.Header>

        <Modal.Description>
          Are you sure you want to delete this item? This action cannot be
          undone.
        </Modal.Description>

        <div className="confirmation-modal__content">
          <p className="confirmation-modal__additional-text">
            Additional content can go here between description and footer.
          </p>
        </div>

        <Modal.Footer>
          <button
            className="confirmation-modal__footer-button confirmation-modal__footer-button--cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="confirmation-modal__footer-button confirmation-modal__footer-button--delete"
            onClick={handleDelete}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

// Create compound component with Trigger
ConfirmationModal.Trigger = ({ children, onClick, ...props }: {
  children: React.ReactNode;
  onClick?: () => void;
} & React.ComponentProps<'div'>) => {
  const handleClick = () => {
    console.log('Opening delete confirmation modal...');
    onClick?.();
  };

  return (
    <Modal.Trigger target="confirm-modal" {...props}>
      <button
        className="task8-example__trigger-button task8-example__trigger-button--primary"
        onClick={handleClick}
      >
        {children}
      </button>
    </Modal.Trigger>
  );
};

export default ConfirmationModal;