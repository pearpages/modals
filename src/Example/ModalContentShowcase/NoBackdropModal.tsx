import React from "react";
import { Modal } from "@/Modal";

export const NoBackdropModal = () => {
  const features = [
    { icon: "✅", text: "Close button still works" },
    { icon: "✅", text: "Escape key still works (unless disabled)" },
    { icon: "❌", text: "Backdrop clicks are ignored" },
  ];

  const handleClose = () => {
    console.log("Closing no backdrop modal (button works!)...");
  };

  return (
    <Modal id="no-backdrop-modal">
      <Modal.Content size="md" closeOnBackdrop={false}>
        <Modal.Header>
          <Modal.Title>🚫 No Backdrop Close</Modal.Title>
          <Modal.Description>
            This modal won't close when you click the backdrop
          </Modal.Description>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body>
          <div className="no-backdrop-modal__warning-box">
            <strong>🎯 Try this:</strong> Click outside this modal (on the
            backdrop) - it won't close!
          </div>

          <p className="no-backdrop-modal__description">
            This demonstrates the <code>closeOnBackdrop={false}</code>{" "}
            configuration.
          </p>

          <ul className="no-backdrop-modal__features-list">
            {features.map((feature, index) => (
              <li key={index}>
                {feature.icon} {feature.text}
              </li>
            ))}
          </ul>

          <div className="no-backdrop-modal__code-example">
            {"<Modal.Content closeOnBackdrop={false}>"}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Modal.Button variant="warning" onClick={handleClose}>
            Close Modal (Button Works!)
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

// Create compound component with Trigger
NoBackdropModal.Trigger = ({
  children,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
} & React.ComponentProps<"div">) => {
  const handleClick = () => {
    console.log("Opening no backdrop modal...");
    onClick?.();
  };

  return (
    <Modal.Trigger target="no-backdrop-modal" {...props} asChild>
      <Modal.Button variant="warning" onClick={handleClick}>
        {children}
      </Modal.Button>
    </Modal.Trigger>
  );
};
