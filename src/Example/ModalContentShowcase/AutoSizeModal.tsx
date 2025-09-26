import React from "react";
import { Modal } from "@/Modal";
import { useModalStack } from "@/index";
import { Box } from "../Box";

export const AutoSizeModal = () => {
  const modals = useModalStack();
  return (
    <Modal id={AutoSizeModal.ID}>
      <Modal.Content size="auto">
        <Modal.Header>
          <Modal.Title>Auto Size Modal</Modal.Title>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body>
          <p>
            This modal automatically sizes to fit its content. Perfect for
            alerts, confirmations, or small forms.
          </p>
          <p>The modal will never be larger than necessary.</p>
          <Box variant="success" title="&lt;Modal.Body&gt;: ">
            Remember to use &lt;Modal.Body&gt; for the main content, if you want
            it to be scrollable when the content overflows. Also so the footer
            renders at the bottom.
          </Box>
        </Modal.Body>

        <Modal.Footer>
          <Modal.Button
            variant="secondary"
            onClick={() => modals.close(AutoSizeModal.ID)}
          >
            Close
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

AutoSizeModal.ID = "auto-modal" as const;

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
    <Modal.Trigger target={AutoSizeModal.ID} {...props} asChild>
      <Modal.Button variant="primary" onClick={handleClick}>
        {children}
      </Modal.Button>
    </Modal.Trigger>
  );
};
