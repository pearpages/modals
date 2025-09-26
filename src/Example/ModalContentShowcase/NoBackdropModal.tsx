import React from "react";
import { Modal } from "@/Modal";
import { useModalStack } from "@/index";
import { Box } from "../Box";

const features = [
  { icon: "✅", text: "Close button still works" },
  { icon: "✅", text: "Escape key still works (unless disabled)" },
  { icon: "❌", text: "Backdrop clicks are ignored" },
];

export const NoBackdropModal = () => {
  const modals = useModalStack();

  const handleClose = () => modals.close(NoBackdropModal.ID);

  return (
    <Modal id={NoBackdropModal.ID}>
      <Modal.Content size="md" closeOnBackdrop={false}>
        <Modal.Header>
          <Modal.Title>🚫 No Backdrop Close</Modal.Title>
          <Modal.Description>
            This modal won't close when you click the backdrop
          </Modal.Description>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body>
          <Box variant="warning" title="🎯 Try this: ">
            Click outside this modal (on the backdrop) - it won't close!
          </Box>

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

          <Box variant="success">
            <code>{"<Modal.Content closeOnBackdrop={false}>"}</code>
          </Box>
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

NoBackdropModal.ID = "no-backdrop-modal" as const;

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
    <Modal.Trigger target={NoBackdropModal.ID} {...props} asChild>
      <Modal.Button variant="warning" onClick={handleClick}>
        {children}
      </Modal.Button>
    </Modal.Trigger>
  );
};
