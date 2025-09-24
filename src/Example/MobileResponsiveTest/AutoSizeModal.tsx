import { Modal } from "@/Modal";

export function AutoSizeModal() {
  const handleClose = () => {
    console.log("Auto size modal closed");
  };

  return (
    <Modal id="responsive-auto">
      <Modal.Content size="auto">
        <Modal.Header>
          <Modal.Title>📱 Auto Size (Responsive)</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <div className="mobile-responsive-test__behavior-info">
            <strong>Current behavior:</strong>
            <ul>
              <li>
                <strong>Desktop:</strong> Auto-sizes to content, centered
              </li>
              <li>
                <strong>Mobile:</strong> Fullscreen (100vw × 100vh)
              </li>
            </ul>
          </div>

          <div className="mobile-responsive-test__modal-content">
            <p>
              This modal uses <code>size="auto"</code> which normally sizes to
              content, but on mobile (≤768px) it becomes fullscreen for better
              UX.
            </p>

            <p>
              Resize your browser window or use Chrome DevTools device emulation
              to see the responsive behavior in action.
            </p>
          </div>

          <div className="mobile-responsive-test__test-info">
            <strong>🔍 How to test:</strong>
            <br />
            Open Chrome DevTools → Toggle device toolbar → Select a mobile
            device
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="secondary" onClick={handleClose}>
            Close
          </Modal.Button>
          <Modal.Button variant="primary" onClick={handleClose}>
            Test Complete
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

// Compound component with trigger
AutoSizeModal.Trigger = function AutoSizeModalTrigger() {
  return (
    <Modal.Trigger target="responsive-auto" asChild>
      <Modal.Button variant="primary" size="small">
        Auto Size Modal
      </Modal.Button>
    </Modal.Trigger>
  );
};
