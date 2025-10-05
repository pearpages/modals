import React, { useMemo } from "react";
import "./index.scss";
import { ScrollLockTestModal } from "./ScrollLockTestModal";
import { Demo } from "@/Example/Demo";
import { Modal } from "@/Modal";
import { Box } from "../Box";
import { ContentBlock } from "../ContentBlock";

const ContentBlocks = ({ length = 20 }: { length?: number }) => {
  const data = Array.from({ length }, (_, i) => ({
    id: i,
    title: `Content Block ${i + 1}`,
    text: `This is sample content to make the page scrollable. When you open the modal above,
              this content should become unscrollable, demonstrating the body scroll lock feature.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  }));

  return data.map((block) => (
    <ContentBlock
      key={block.id}
      title={block.title}
      text={block.text}
      className={block.id % 2 === 0 ? "even" : "odd"}
    />
  ));
};

export function ScrollLockDemo() {
  const contentBlocks = useMemo(() => ContentBlocks({ length: 20 }), []);

  const handleOpenModal = () => {
    console.log("Opening scroll lock test modal...");
  };

  return (
    <Demo
      title="🔒 Body Scroll Lock"
      description="When a modal is open, the background page scroll is locked to prevent unwanted scrolling."
      defaultExpanded={false}
    >
      <Box variant="warning" title="🧪 Test Instructions">
        <ol className="scroll-lock-demo__test-instructions">
          <li>Scroll this page down to see more content</li>
          <li>Open a modal using the button below</li>
          <li>Try to scroll the background page - it should be locked</li>
          <li>Close the modal - scrolling should be restored</li>
          <li>Test on mobile devices for iOS-specific behavior</li>
        </ol>
      </Box>

      <ScrollLockTestModal.Trigger>
        <Modal.Button variant="primary" onClick={handleOpenModal}>
          Open Modal (Test Scroll Lock)
        </Modal.Button>
      </ScrollLockTestModal.Trigger>

      <div>
        <h3>📄 Sample Content (Scroll to Test)</h3>
        {contentBlocks}
      </div>

      <ScrollLockTestModal />
    </Demo>
  );
}
