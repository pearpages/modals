import { Modal } from '@/Modal';

export function DisabledTriggerModal() {
  const handleClose = () => {
    console.log('Disabled modal closed (this should not be reachable)');
  };

  return (
    <Modal id="disabled-modal">
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>⚠️ Disabled Trigger Test</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <div className="modal-trigger-demo__modal-content">
            <div className="modal-trigger-demo__info-box modal-trigger-demo__info-box--warning">
              <strong>🚨 Important:</strong> If you can see this modal, there's a bug!
              The disabled trigger should prevent this modal from opening.
            </div>

            <p>This modal should <strong>NOT</strong> be accessible when the trigger is disabled.</p>

            <p><strong>Disabled trigger behavior:</strong></p>
            <ul>
              <li>🚫 Cannot be clicked</li>
              <li>🚫 Does not respond to keyboard events</li>
              <li>🚫 Shows disabled visual state</li>
              <li>🚫 Has proper ARIA attributes</li>
            </ul>

            <div className="modal-trigger-demo__info-box modal-trigger-demo__info-box--info">
              <strong>💡 Accessibility:</strong> Disabled triggers automatically get
              the proper ARIA attributes and cannot receive focus, ensuring they're
              properly announced to screen readers.
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="warning" onClick={handleClose} size="small">
            Close (Bug Report)
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

// Compound component with disabled trigger
DisabledTriggerModal.Trigger = function DisabledTriggerModalTrigger() {
  return (
    <Modal.Trigger target="disabled-modal" disabled>
      <button className="modal-trigger-demo__disabled-trigger">
        Disabled Button (Won't Open)
      </button>
    </Modal.Trigger>
  );
};