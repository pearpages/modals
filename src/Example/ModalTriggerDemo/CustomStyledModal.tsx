import "./CustomStyledModal.scss";
import { Modal } from "@/Modal";
import { Box } from "../Box";
import { useModalStack } from "@/ModalProvider";
import { Content } from "./Content";

export function CustomStyledModal() {
  const modals = useModalStack();

  const handleClose = () => {
    modals.close(CustomStyledModal.ID);
  };

  return (
    <Modal id={CustomStyledModal.ID}>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Custom Styled Modal</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <Content>
            <p>
              This modal was opened with the <code>asChild</code> pattern!
            </p>
            <p>
              The trigger preserved its original custom styling while gaining
              Modal.Trigger functionality.
            </p>

            <Box variant="warning" title="💡 asChild Pattern: ">
              When using asChild, Modal.Trigger passes all its functionality to
              your custom element while preserving the original styling and
              behavior.
            </Box>

            <Box variant="success" title="Benefits of asChild: ">
              <ul>
                <li>✅ Preserves custom button styling</li>
                <li>✅ Maintains existing CSS classes</li>
                <li>✅ Works with any clickable element</li>
                <li>✅ Adds Modal.Trigger functionality seamlessly</li>
              </ul>
            </Box>
          </Content>
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

CustomStyledModal.ID = "custom-modal" as const;

CustomStyledModal.Trigger = function CustomStyledModalTrigger() {
  return (
    <Modal.Trigger target={CustomStyledModal.ID} asChild>
      <button className="custom-trigger">Custom Styled Button</button>
    </Modal.Trigger>
  );
};

CustomStyledModal.IconTrigger = function CustomStyledModalIconTrigger() {
  return (
    <Modal.Trigger target={CustomStyledModal.ID} asChild>
      <button
        className="icon-trigger"
        title="Open Custom Modal"
        aria-label="Open Custom Modal"
      >
        🎨
      </button>
    </Modal.Trigger>
  );
};
