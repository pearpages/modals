import React from "react";
import { Modal } from "@/Modal";
import { useModalStack } from "@/ModalProvider";
import { Box } from "../Box";

const features = [
  "✅ Modal.Title automatically generates ID and links to dialog via aria-labelledby",
  "✅ Modal.Description automatically generates ID and links to dialog via aria-describedby",
  "✅ Modal.Close triggers proper close behavior for both controlled and uncontrolled modes",
  "✅ Modal.Header and Modal.Footer provide layout slots",
  "✅ All components support asChild pattern for customization",
  "✅ Comprehensive test coverage with accessibility integration tests",
];

const InfoModal = () => {
  const modals = useModalStack();

  const handleClose = () => {
    modals.close(InfoModal.id);
  };

  return (
    <Modal id={InfoModal.id}>
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>Information</Modal.Title>
          <Modal.Description>
            This modal demonstrates the accessibility features implemented.
          </Modal.Description>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <Box variant="warning" title="Features demonstrated: ">
            <ul className="info-modal__features-list">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </Box>
          <p>
            <strong>Inspect the DOM:</strong> The dialog element should have
            aria-labelledby pointing to the title ID and aria-describedby
            pointing to the description ID.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="primary" onClick={handleClose}>
            Got it!
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

InfoModal.id = "info-modal";
InfoModal.Trigger = ({
  onClick,
  ...props
}: {
  onClick?: () => void;
} & React.ComponentProps<"div">) => {
  const handleClick = () => {
    console.log("Opening accessibility info modal...");
    onClick?.();
  };

  return (
    <Modal.Trigger target={InfoModal.id} {...props} asChild>
      <Modal.Button variant="secondary" onClick={handleClick}>
        Show Info Modal
      </Modal.Button>
    </Modal.Trigger>
  );
};

export { InfoModal };
