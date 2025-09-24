import { Modal } from "@/Modal";

export function FullscreenModal() {
  const handleClose = () => {
    console.log("Fullscreen modal: Exit fullscreen");
  };

  return (
    <Modal id="responsive-full">
      <Modal.Content size="full">
        <Modal.Header>
          <Modal.Title>📱 Always Fullscreen</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <div className="mobile-responsive-test__modal-content">
            <p>
              This modal uses <code>size="full"</code> so it's always fullscreen
              on both desktop and mobile.
            </p>
          </div>

          <div className="mobile-responsive-test__note">
            <strong>💡 Note:</strong> This is different from the responsive
            behavior. The <code>size="full"</code> is always fullscreen, while{" "}
            <code>size="auto"</code>
            and <code>size="md"</code> are only fullscreen on mobile.
          </div>

          <div className="mobile-responsive-test__test-info">
            <strong>🔍 Testing tip:</strong>
            <br />
            Notice how this modal fills the entire viewport regardless of screen
            size. Compare this with the auto and medium size modals which only
            go fullscreen on mobile.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="secondary" size="small">
            Minimize
          </Modal.Button>
          <Modal.Button variant="danger" onClick={handleClose} size="small">
            Exit Fullscreen
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

// Compound component with trigger
FullscreenModal.Trigger = function FullscreenModalTrigger() {
  return (
    <Modal.Trigger target="responsive-full" asChild>
      <Modal.Button variant="danger" size="small">
        Always Fullscreen
      </Modal.Button>
    </Modal.Trigger>
  );
};
