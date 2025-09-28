import "./BasicTriggerModal.scss";
import { Modal } from "@/Modal";
import { Content } from "./Content";
import { Box } from "../Box";
import { useModalStack } from "@/ModalProvider";

export function BasicTriggerModal() {
  const modals = useModalStack();
  const handleClose = () => {
    modals.close(BasicTriggerModal.ID);
  };

  return (
    <Modal id={BasicTriggerModal.ID}>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Basic Modal</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <Content>
            <p>
              This modal was opened with <code>Modal.Trigger</code>!
            </p>
            <Box variant="success" title="Features demonstrated: ">
              <ul>
                <li>✅ Click to open</li>
                <li>✅ Keyboard accessibility (Enter/Space)</li>
                <li>✅ Target modal resolution</li>
                <li>✅ Default trigger button styling</li>
              </ul>
            </Box>

            <Box variant="warning" title="💡 Default Trigger: ">
              Modal.Trigger renders as a standard button when no custom element
              is provided via the asChild prop.
            </Box>
          </Content>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="secondary" onClick={handleClose} size="small">
            Close
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

BasicTriggerModal.ID = "basic-modal" as const;

BasicTriggerModal.Trigger = function BasicTriggerModalTrigger() {
  return (
    <Modal.Trigger target={BasicTriggerModal.ID} asChild>
      <button className="trigger">Open Basic Modal</button>
    </Modal.Trigger>
  );
};

BasicTriggerModal.AlternateTrigger =
  function BasicTriggerModalAlternateTrigger() {
    return (
      <Modal.Trigger target={BasicTriggerModal.ID} asChild>
        <button className="alternate-trigger">Alternative Basic Trigger</button>
      </Modal.Trigger>
    );
  };
