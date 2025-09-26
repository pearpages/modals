import React from "react";
import { Modal } from "@/Modal";
import { useModalStack } from "@/index";

export const CustomStyledModal = () => {
  const modals = useModalStack();
  const features = [
    "Custom gradient background",
    "Custom typography and colors",
    "Backdrop blur effects",
    "Maintained accessibility",
    "Full animation support",
  ];

  const handleClose = () => modals.close(CustomStyledModal.ID);

  return (
    <Modal id={CustomStyledModal.ID}>
      <Modal.Content size="md" className="custom-modal__content">
        <Modal.Header className="custom-modal__header">
          <Modal.Title>Custom Styled Modal</Modal.Title>
          <Modal.Description className="custom-modal__description">
            Demonstrates custom styling capabilities
          </Modal.Description>
          <Modal.Close className="custom-modal__close" />
        </Modal.Header>

        <Modal.Body>
          <h3 className="custom-modal__title">Beautiful Custom Design</h3>
          <p className="custom-modal__intro">
            Modal.Content accepts custom className and style props, allowing you
            to create stunning designs while maintaining all the accessibility
            and behavior features.
          </p>

          <div className="custom-modal__features-box">
            <div className="custom-modal__features-title">
              <strong>Features demonstrated:</strong>
            </div>
            <ul className="custom-modal__features-list">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </Modal.Body>

        <Modal.Footer className="custom-modal__footer">
          <button className="custom-modal__footer-button" onClick={handleClose}>
            Amazing! Close Modal
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

CustomStyledModal.ID = "custom-modal-99" as const;

CustomStyledModal.Trigger = ({
  children,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
} & React.ComponentProps<"div">) => {
  const handleClick = () => {
    console.log("Opening custom styled modal...");
    onClick?.();
  };

  return (
    <Modal.Trigger target={CustomStyledModal.ID} {...props} asChild>
      <Modal.Button variant="secondary" onClick={handleClick}>
        {children}
      </Modal.Button>
    </Modal.Trigger>
  );
};
