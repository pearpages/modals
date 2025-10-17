import { useModalStack } from "@/index";
import { Modal } from "@/Modal";
import { Box } from "../Box";

export function FullscreenModal() {
  const modals = useModalStack();
  const handleClose = () => {
    modals.close(FullscreenModal.id);
  };

  return (
    <Modal id={FullscreenModal.id}>
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

          <Box variant="warning" title="💡 Note: ">
            This is different from the responsive behavior. The{" "}
            <code>size="full"</code> is always fullscreen, while{" "}
            <code>size="auto"</code>
            and <code>size="md"</code> are only fullscreen on mobile.
          </Box>

          <Box variant="warning" title="🔍 Testing tip:">
            <br />
            Notice how this modal fills the entire viewport regardless of screen
            size. Compare this with the auto and medium size modals which only
            go fullscreen on mobile.
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="danger" onClick={handleClose} size="small">
            Exit Fullscreen
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

FullscreenModal.id = "responsive-full";
FullscreenModal.Trigger = function FullscreenModalTrigger() {
  return (
    <Modal.Trigger target={FullscreenModal.id} asChild>
      <Modal.Button variant="danger" size="small">
        Always Fullscreen
      </Modal.Button>
    </Modal.Trigger>
  );
};
