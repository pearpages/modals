import React, { useMemo } from "react";
import { Modal } from "@/Modal";
import { ContentBlock } from "../ContentBlock";
import { Box } from "../Box";
import { useModalStack } from "@/ModalProvider";

export const ScrollableBodyModal = () => {
  const modals = useModalStack();
  const contentBlocks = useMemo(
    () =>
      Array.from(
        { length: 15 },
        (_, i) => ({
          id: i,
          title: `Content Block ${i + 1}`,
          text: `This is example content to demonstrate the scrolling behavior.
             The Modal.Body component automatically adds overflow: auto and
             includes beautiful custom scrollbars. The header and footer
             remain fixed while this content area scrolls.`,
        }),
        []
      ).map((block) => (
        <ContentBlock
          key={block.id}
          title={block.title}
          text={block.text}
          className={block.id % 2 === 0 ? "even" : "odd"}
        />
      )),
    []
  );

  return (
    <Modal id={ScrollableBodyModal.id}>
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>📜 Scrollable Modal.Body</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <p className="scrollable-modal__intro">
            <strong>
              This Modal.Body automatically handles overflow with scrolling!
            </strong>
          </p>
          {contentBlocks}
          <Box variant="success" title="🎯 End of scrollable content!">
            <p>
              Notice how the header stayed at the top and the footer stays at
              the bottom, while this middle content area scrolled independently.
            </p>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button
            onClick={() => modals.close(ScrollableBodyModal.id)}
            variant="success"
          >
            Perfect!
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

ScrollableBodyModal.id = "scrollable-body-modal" as const;
ScrollableBodyModal.Trigger = ({
  children,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
} & React.ComponentProps<"div">) => {
  const handleClick = () => {
    console.log("Opening scrollable Modal.Body example...");
    onClick?.();
  };

  return (
    <Modal.Trigger target={ScrollableBodyModal.id} {...props} asChild>
      <Modal.Button variant="success" onClick={handleClick}>
        {children}
      </Modal.Button>
    </Modal.Trigger>
  );
};
