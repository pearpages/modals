import { Modal } from '@/Modal';

export function CustomStyledModal() {
  const handleClose = () => {
    console.log('Custom styled modal closed');
  };

  return (
    <Modal id="custom-modal">
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Custom Styled Modal</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <div className="modal-trigger-demo__modal-content">
            <p>This modal was opened with the <code>asChild</code> pattern!</p>
            <p>The trigger preserved its original custom styling while gaining Modal.Trigger functionality.</p>

            <div className="modal-trigger-demo__info-box modal-trigger-demo__info-box--info">
              <strong>🎨 asChild Pattern:</strong> When using asChild, Modal.Trigger
              passes all its functionality to your custom element while preserving
              the original styling and behavior.
            </div>

            <p><strong>Benefits of asChild:</strong></p>
            <ul>
              <li>✅ Preserves custom button styling</li>
              <li>✅ Maintains existing CSS classes</li>
              <li>✅ Works with any clickable element</li>
              <li>✅ Adds Modal.Trigger functionality seamlessly</li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="primary" onClick={handleClose} size="small">
            Close
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

// Compound component with custom styled trigger
CustomStyledModal.Trigger = function CustomStyledModalTrigger() {
  return (
    <Modal.Trigger target="custom-modal" asChild>
      <button className="modal-trigger-demo__custom-trigger">
        Custom Styled Button
      </button>
    </Modal.Trigger>
  );
};

CustomStyledModal.IconTrigger = function CustomStyledModalIconTrigger() {
  return (
    <Modal.Trigger target="custom-modal" asChild>
      <button
        className="modal-trigger-demo__icon-trigger"
        title="Open Custom Modal"
        aria-label="Open Custom Modal"
      >
        🎨
      </button>
    </Modal.Trigger>
  );
};