import { Modal } from "@/Modal";

export function MediumSizeModal() {
  const handleClose = () => {
    console.log("Medium size modal: Perfect!");
  };

  const generateContentBlocks = () => {
    return Array.from({ length: 8 }, (_, i) => (
      <div
        key={i}
        className={`mobile-responsive-test__content-block mobile-responsive-test__content-block--${
          i % 2 === 0 ? "even" : "odd"
        }`}
      >
        <strong>Content Block {i + 1}</strong>
        <p>
          Sample content to test scrolling behavior on both desktop and mobile.
          The Modal.Body should handle overflow gracefully in both modes.
        </p>
      </div>
    ));
  };

  return (
    <Modal id="responsive-md">
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>📱 Medium Size (Responsive)</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <div className="mobile-responsive-test__modal-content">
            <p>
              This modal uses <code>size="md"</code> which is 520px wide on
              desktop, but becomes fullscreen on mobile devices.
            </p>
          </div>

          {/* Add content to test scrolling */}
          {generateContentBlocks()}

          <div className="mobile-responsive-test__features">
            <strong>✅ Mobile fullscreen features:</strong>
            <ul>
              <li>No border radius (sharp corners)</li>
              <li>Full viewport coverage</li>
              <li>Proper flex layout for header/body/footer</li>
              <li>Body scrolling when content overflows</li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="secondary" size="small">
            Cancel
          </Modal.Button>
          <Modal.Button variant="success" onClick={handleClose} size="small">
            Perfect!
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

// Compound component with trigger
MediumSizeModal.Trigger = function MediumSizeModalTrigger() {
  return (
    <Modal.Trigger target="responsive-md" asChild>
      <Modal.Button variant="success" size="small">
        Medium Size Modal
      </Modal.Button>
    </Modal.Trigger>
  );
};
