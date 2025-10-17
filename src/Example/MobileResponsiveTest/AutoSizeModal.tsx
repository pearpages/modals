import { Modal } from "@/Modal";
import { Box } from "../Box";
import { useModalStack } from "@/ModalProvider";

export function AutoSizeModal() {
  const modals = useModalStack();
  const handleClose = () => {
    modals.close(AutoSizeModal.id);
  };

  return (
    <Modal id={AutoSizeModal.id}>
      <Modal.Content size="auto">
        <Modal.Header>
          <Modal.Title>📱 Auto Size (Responsive)</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <Box variant="danger" title="Current Behavior: ">
            <ul>
              <li>
                <strong>Desktop:</strong> Auto-sizes to content, centered
              </li>
              <li>
                <strong>Mobile:</strong> Fullscreen (100vw × 100vh)
              </li>
            </ul>
          </Box>

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

          <Box variant="success" title="🔍 How to test: ">
            Open Chrome DevTools → Toggle device toolbar → Select a mobile
            device
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="secondary" onClick={handleClose}>
            Close
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

AutoSizeModal.id = "responsive-auto";
AutoSizeModal.Trigger = function AutoSizeModalTrigger() {
  return (
    <Modal.Trigger target={AutoSizeModal.id} asChild>
      <Modal.Button variant="primary" size="small">
        Auto Size Modal
      </Modal.Button>
    </Modal.Trigger>
  );
};
