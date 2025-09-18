import React, { useState } from 'react';
import { useModalStack } from '../ModalProvider';
import { Modal } from '../Modal';
import { ModalContent } from '../ModalContent';
import { ModalHeader } from '../ModalHeader';
import { ModalTitle } from '../ModalTitle';
import { ModalClose } from '../ModalClose';
import { ModalFooter } from '../ModalFooter';

export function ProgrammaticModalExample() {
  const modalStack = useModalStack();
  const [message, setMessage] = useState('');

  const handleOpenInfo = () => {
    modalStack.open('info-modal');
    setMessage('Info modal opened programmatically!');
  };

  const handleOpenConfirm = () => {
    modalStack.open('confirm-modal');
    setMessage('Confirm modal opened programmatically!');
  };

  const handleConfirmAction = () => {
    setMessage('Action confirmed!');
    modalStack.close('confirm-modal');
  };

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}>
      <h4>🎯 Programmatic Modal Control</h4>
      <p style={{ fontSize: "0.9em", color: "#666" }}>
        Using useModalStack() hook to control modals programmatically.
      </p>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <button
          onClick={handleOpenInfo}
          style={{
            background: "#007bff",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Open Info Modal
        </button>

        <button
          onClick={handleOpenConfirm}
          style={{
            background: "#28a745",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Open Confirm Modal
        </button>

        <button
          onClick={() => {
            modalStack.close('info-modal');
            modalStack.close('confirm-modal');
            setMessage('All modals closed programmatically!');
          }}
          style={{
            background: "#6c757d",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Close All
        </button>
      </div>

      {message && (
        <div style={{
          padding: "0.5rem",
          background: "#e7f3ff",
          border: "1px solid #b3d9ff",
          borderRadius: "4px",
          fontSize: "0.9em"
        }}>
          {message}
        </div>
      )}

      <div style={{ marginTop: "1rem", fontSize: "0.8em", color: "#666" }}>
        <strong>Modal States:</strong>
        <ul style={{ margin: "0.5rem 0", paddingLeft: "1rem" }}>
          <li>Info Modal: {modalStack.isOpen('info-modal') ? '🟢 Open' : '🔴 Closed'}</li>
          <li>Confirm Modal: {modalStack.isOpen('confirm-modal') ? '🟢 Open' : '🔴 Closed'}</li>
        </ul>
      </div>

      {/* Info Modal */}
      <Modal id="info-modal">
        <ModalContent>
          <ModalHeader>
            <ModalTitle>📋 Information</ModalTitle>
            <ModalClose />
          </ModalHeader>
          <div style={{ padding: "1rem" }}>
            <p>This modal was opened using the useModalStack() hook!</p>
            <p style={{ fontSize: "0.9em", color: "#666" }}>
              You can close it with the X button, Escape key, or clicking the backdrop.
            </p>
          </div>
        </ModalContent>
      </Modal>

      {/* Confirm Modal */}
      <Modal id="confirm-modal">
        <ModalContent>
          <ModalHeader>
            <ModalTitle>❓ Confirm Action</ModalTitle>
            <ModalClose />
          </ModalHeader>
          <div style={{ padding: "1rem" }}>
            <p>Are you sure you want to perform this action?</p>
          </div>
          <ModalFooter>
            <button
              onClick={() => modalStack.close('confirm-modal')}
              style={{
                background: "#6c757d",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "0.5rem"
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmAction}
              style={{
                background: "#28a745",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Confirm
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}