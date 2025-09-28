import "./DisabledTriggerModal.scss";
import { Modal } from "@/Modal";
import { Box } from "../Box";
import { Content } from "./Content";
import { useState } from "react";
import { useModalStack } from "@/ModalProvider";

export function DisabledTriggerModal() {
  const modals = useModalStack();

  const handleClose = () => {
    modals.close(DisabledTriggerModal.ID);
  };

  return (
    <Modal id={DisabledTriggerModal.ID}>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>⚠️ Disabled Trigger Test</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <Content>
            <Box variant="warning" title="🚨 Important: ">
              If you can see this modal, there's a bug! The disabled trigger
              should prevent this modal from opening.
            </Box>

            <p>
              This modal should <strong>NOT</strong> be accessible when the
              trigger is disabled.
            </p>

            <Box variant="success" title="Disabled Trigger Behavior: ">
              <ul>
                <li>🚫 Cannot be clicked</li>
                <li>🚫 Does not respond to keyboard events</li>
                <li>🚫 Shows disabled visual state</li>
                <li>🚫 Has proper ARIA attributes</li>
              </ul>
            </Box>

            <Box variant="warning" title="💡 Accessibility: ">
              Disabled triggers automatically get the proper ARIA attributes and
              cannot receive focus, ensuring they're properly announced to
              screen readers.
            </Box>
          </Content>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="warning" onClick={handleClose} size="small">
            Close (Bug Report)
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

DisabledTriggerModal.ID = "disabled-modal";

DisabledTriggerModal.Trigger = function DisabledTriggerModalTrigger() {
  const [isDisabled, setIsDisabled] = useState(true);
  return (
    <>
      <div>
        <label>
          Disabled:
          <input
            type="checkbox"
            checked={isDisabled}
            onChange={() => setIsDisabled(!isDisabled)}
          />
        </label>
      </div>

      <Modal.Trigger target="disabled-modal" disabled={isDisabled} asChild>
        <button
          className={`disabled-trigger ${
            isDisabled ? "disabled-trigger--disabled" : ""
          }`}
        >
          {isDisabled ? "Disabled Button (Won't Open)" : "Enabled Trigger"}
        </button>
      </Modal.Trigger>
    </>
  );
};
