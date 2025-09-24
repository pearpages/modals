import { Modal } from '@/Modal';

interface ConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({ onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <Modal id="confirm-modal">
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>❓ Confirm Action</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <div className="programmatic-modal-example__modal-content">
            <p>
              <strong>Are you sure you want to perform this action?</strong>
            </p>
            <p className="programmatic-modal-example__modal-description">
              This is a demonstration of programmatic modal control with custom actions.
              Your choice will be reflected in the status message above.
            </p>
            <div style={{
              background: '#fff3cd',
              padding: '0.75rem',
              borderRadius: '4px',
              marginTop: '1rem',
              border: '1px solid #ffeaa7'
            }}>
              <strong>⚠️ Note:</strong> This is just a demo - no actual action will be performed.
              The confirmation will simply update the status message to show your choice.
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button
            variant="secondary"
            onClick={onCancel}
            size="small"
          >
            Cancel
          </Modal.Button>
          <Modal.Button
            variant="success"
            onClick={onConfirm}
            size="small"
          >
            Confirm Action
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}