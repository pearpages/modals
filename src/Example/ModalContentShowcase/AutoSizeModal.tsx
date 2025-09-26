import React from "react";
import { Modal } from "@/Modal";

const AutoSizeModal = () => {
  return (
    <Modal id="auto-modal">
      <Modal.Content size="auto">
        <Modal.Header>
          <Modal.Title>Auto Size Modal</Modal.Title>
          <Modal.Close />
        </Modal.Header>

        <div className="auto-modal__content">
          <p>
            This modal automatically sizes to fit its content. Perfect for
            alerts, confirmations, or small forms.
          </p>
          <p>The modal will never be larger than necessary.</p>
        </div>

        <Modal.Footer>
          <Modal.Button
            variant="secondary"
            onClick={() => console.log("Auto modal closed")}
          >
            Close
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

// Create compound component with Trigger
AutoSizeModal.Trigger = ({
  children,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
} & React.ComponentProps<"div">) => {
  const handleClick = () => {
    console.log("Opening auto size modal...");
    onClick?.();
  };

  return (
    <Modal.Trigger target="auto-modal" {...props} asChild>
      <Modal.Button variant="primary" onClick={handleClick}>
        {children}
      </Modal.Button>
    </Modal.Trigger>
  );
};

export default AutoSizeModal;
