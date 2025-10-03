import React from "react";
import { Modal } from "@/Modal";
import { Box } from "../Box";

const ScrollLockTestModal = () => {
  return (
    <Modal id={ScrollLockTestModal.id}>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>🔒 Scroll Lock Active</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <p className="scroll-lock-modal__main-text">
            <strong>Background scroll is now locked!</strong>
          </p>
          <p className="scroll-lock-modal__description">
            Try scrolling the page behind this modal - it should be prevented.
            This demonstrates the body scroll lock functionality.
          </p>

          <Box variant="success" title="🛠 Technical Details">
            <ul className="scroll-lock-modal__technical-list">
              <li>
                Desktop: Uses <code>overflow: hidden</code> on body
              </li>
              <li>
                iOS: Uses <code>position: fixed</code> approach
              </li>
              <li>Scrollbar width compensation prevents layout shifts</li>
              <li>Scroll position restored when modal closes</li>
            </ul>
          </Box>

          <p className="scroll-lock-modal__closing-note">
            Close this modal with the X button, Escape key, or by clicking the
            backdrop to restore scrolling.
          </p>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

ScrollLockTestModal.id = "scroll-lock-modal" as const;

ScrollLockTestModal.Trigger = ({
  children,
  ...props
}: { children: React.ReactNode } & React.ComponentProps<"div">) => {
  return (
    <Modal.Trigger target={ScrollLockTestModal.id} {...props} asChild>
      {children}
    </Modal.Trigger>
  );
};

export { ScrollLockTestModal };
