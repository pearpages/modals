import { useState } from "react";
import { Modal } from "@/Modal";
import { Box } from "../Box";

function FullscreenModal() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal id={FullscreenModal.id} open={open} onOpenChange={setOpen}>
      <Modal.Content size="full">
        <Modal.Header>
          <Modal.Title>Fullscreen with Safe Area</Modal.Title>
          <Modal.Description>
            Testing safe area inset support for iOS devices
          </Modal.Description>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body style={{ padding: "2rem" }}>
          <h3>Safe Area Support</h3>
          <p>
            This fullscreen modal includes automatic safe area support for iOS
            devices.
          </p>

          <Box variant="success" title="🍎 iOS Safe Area Features:">
            <ul>
              <li>
                <code>env(safe-area-inset-bottom)</code> automatically adds
                bottom padding
              </li>
              <li>Prevents footer from being hidden by home indicator</li>
              <li>Works on iPhone X, 11, 12, 13, 14 series and newer</li>
              <li>Gracefully degrades on devices without safe areas</li>
            </ul>
          </Box>

          <Box variant="warning" title="Test Instructions:">
            <ol>
              <li>Open this page on an iPhone (iOS Safari)</li>
              <li>Tap this "Fullscreen Modal" button</li>
              <li>
                Notice how the footer has proper spacing above the home
                indicator
              </li>
              <li>Try rotating to landscape to see how it adapts</li>
            </ol>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="secondary" onClick={handleClose}>
            Close Fullscreen
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

function FullscreenModalTrigger() {
  return (
    <Modal.Trigger target={FullscreenModal.id} asChild>
      <Modal.Button variant="secondary" size="large">
        Safe area support
      </Modal.Button>
    </Modal.Trigger>
  );
}

FullscreenModal.id = "fullscreen-mobile";
FullscreenModal.Trigger = FullscreenModalTrigger;

export { FullscreenModal };
