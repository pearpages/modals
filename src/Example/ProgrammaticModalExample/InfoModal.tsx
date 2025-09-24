import { Modal } from '@/Modal';

export function InfoModal() {
  return (
    <Modal id="info-modal">
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>📋 Information</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <div className="programmatic-modal-example__modal-content">
            <p>
              <strong>🚀 This modal was opened using the useModalStack() hook!</strong>
            </p>
            <p className="programmatic-modal-example__modal-description">
              You can close it with the X button, Escape key, clicking the backdrop,
              or by using the "Close All Modals" button in the demo.
            </p>
            <p>
              The <span className="highlight">useModalStack()</span> hook provides programmatic
              control over modal state, allowing you to open, close, and check the status
              of modals from anywhere in your component tree.
            </p>
            <div style={{
              background: '#e7f3ff',
              padding: '0.75rem',
              borderRadius: '4px',
              marginTop: '1rem'
            }}>
              <strong>💡 Pro Tip:</strong> You can also use <code>modalStack.toggle('modal-id')</code>
              to toggle a modal's open/closed state!
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="primary" size="small">
            Got it!
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}