import { Modal } from "@/Modal";
import { ContentBlock } from "../ContentBlock";
import { Box } from "../Box";
import { useModalStack } from "@/ModalProvider";

export function MediumSizeModal() {
  const modals = useModalStack();
  const handleClose = () => {
    modals.close(MediumSizeModal.id);
  };

  const generateContentBlocks = () => {
    return Array.from({ length: 8 }, (_, i) => (
      <ContentBlock
        key={i}
        className={i % 2 === 0 ? "even" : "odd"}
        title={`Content Block ${i + 1}`}
        text="Sample content to test scrolling behavior on both desktop and mobile.
          The Modal.Body should handle overflow gracefully in both modes."
      />
    ));
  };

  return (
    <Modal id={MediumSizeModal.id}>
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

          <Box variant="success" title="✅ Mobile fullscreen features:">
            <ul>
              <li>No border radius (sharp corners)</li>
              <li>Full viewport coverage</li>
              <li>Proper flex layout for header/body/footer</li>
              <li>Body scrolling when content overflows</li>
            </ul>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="success" onClick={handleClose} size="small">
            Perfect!
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

MediumSizeModal.id = "responsive-md";
MediumSizeModal.Trigger = function MediumSizeModalTrigger() {
  return (
    <Modal.Trigger target={MediumSizeModal.id} asChild>
      <Modal.Button variant="success" size="small">
        Medium Size Modal
      </Modal.Button>
    </Modal.Trigger>
  );
};
