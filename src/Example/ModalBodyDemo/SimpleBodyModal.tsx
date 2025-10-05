import React from "react";
import { Modal } from "@/Modal";
import { useModalStack } from "@/ModalProvider";
import { Box } from "../Box";

const SimpleBodyModal = () => {
  const modals = useModalStack();
  return (
    <Modal id={SimpleBodyModal.id}>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>📄 Simple Modal.Body</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <p>
            This content is inside a <code>Modal.Body</code> component,
            providing semantic structure and consistent styling.
          </p>
          <p>
            Notice how the content has proper spacing and is clearly separated
            from the header and footer areas.
          </p>
          <Box variant="success" title="Code structure: ">
            <pre>
              {`<Modal.Content>
  <Modal.Header>...</Modal.Header>
  <Modal.Body>
    <p>Content goes here</p>
  </Modal.Body>
  <Modal.Footer>...</Modal.Footer>
</Modal.Content>`}
            </pre>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button
            variant="secondary"
            size="small"
            onClick={() => modals.close(SimpleBodyModal.id)}
          >
            Got it!
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

SimpleBodyModal.id = "simple-body-modal" as const;

SimpleBodyModal.Trigger = ({
  children,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
} & React.ComponentProps<"div">) => {
  const handleClick = () => {
    console.log("Opening simple Modal.Body example...");
    onClick?.();
  };

  return (
    <Modal.Trigger target={SimpleBodyModal.id} {...props} asChild>
      <Modal.Button variant="primary" onClick={handleClick}>
        {children}
      </Modal.Button>
    </Modal.Trigger>
  );
};

export { SimpleBodyModal };
