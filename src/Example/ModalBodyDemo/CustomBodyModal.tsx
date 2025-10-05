import React from "react";
import { Modal } from "@/Modal";
import { useModalStack } from "@/ModalProvider";
import "./CustomBodyModal.scss";

export const CustomBodyModal = () => {
  const modal = useModalStack();
  return (
    <Modal id={CustomBodyModal.id}>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>🎨 Custom Styled Modal.Body</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body className="custom-modal__body">
          <h3 className="custom-modal__title">Beautiful Custom Styling</h3>
          <p className="custom-modal__description">
            Modal.Body supports custom className and style props, allowing you
            to create stunning designs while maintaining the overflow handling
            and semantic structure.
          </p>

          <div className="custom-modal__features-box">
            <div className="custom-modal__features-title">
              <strong>Features maintained:</strong>
            </div>
            <ul className="custom-modal__features-list">
              <li>Overflow scrolling (if needed)</li>
              <li>Flexible layout integration</li>
              <li>Custom scrollbar styling</li>
              <li>Mobile responsive behavior</li>
            </ul>
          </div>

          <p className="custom-modal__final-note">
            The asChild prop is also supported if you need to use a different
            HTML element while keeping all the Modal.Body functionality.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => modal.close(CustomBodyModal.id)}
            className="custom-modal__footer-button"
          >
            Awesome!
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

CustomBodyModal.id = "custom-body-modal";

CustomBodyModal.Trigger = ({
  children,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
} & React.ComponentProps<"div">) => {
  const handleClick = () => {
    console.log("Opening custom styled Modal.Body example...");
    onClick?.();
  };

  return (
    <Modal.Trigger target={CustomBodyModal.id} {...props} asChild>
      <Modal.Button variant="secondary" onClick={handleClick}>
        {children}
      </Modal.Button>
    </Modal.Trigger>
  );
};
