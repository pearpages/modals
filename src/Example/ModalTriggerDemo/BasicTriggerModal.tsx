import { Modal } from '@/Modal';

export function BasicTriggerModal() {
  const handleClose = () => {
    console.log('Basic modal closed');
  };

  return (
    <Modal id="basic-modal">
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Basic Modal</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <div className="modal-trigger-demo__modal-content">
            <p>This modal was opened with <code>Modal.Trigger</code>!</p>
            <p><strong>Features demonstrated:</strong></p>
            <ul>
              <li>✅ Click to open</li>
              <li>✅ Keyboard accessibility (Enter/Space)</li>
              <li>✅ Target modal resolution</li>
              <li>✅ Default trigger button styling</li>
            </ul>

            <div className="modal-trigger-demo__info-box modal-trigger-demo__info-box--success">
              <strong>💡 Default Trigger:</strong> Modal.Trigger renders as a standard button
              when no custom element is provided via the asChild prop.
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="secondary" onClick={handleClose} size="small">
            Close
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

// Compound component with multiple triggers
BasicTriggerModal.Trigger = function BasicTriggerModalTrigger() {
  return (
    <Modal.Trigger target="basic-modal">
      <button className="modal-trigger-demo__trigger">
        Open Basic Modal
      </button>
    </Modal.Trigger>
  );
};

BasicTriggerModal.AlternateTrigger = function BasicTriggerModalAlternateTrigger() {
  return (
    <Modal.Trigger target="basic-modal">
      <button className="modal-trigger-demo__alternate-trigger">
        Alternative Basic Trigger
      </button>
    </Modal.Trigger>
  );
};