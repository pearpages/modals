import React, { useState } from "react";
import ScrollLockTestModal from "./ScrollLockTestModal";
import "./index.scss";
import { Demo } from "@/Example/Demo";

export function ScrollLockDemo() {
  const [contentBlocks] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      title: `Content Block ${i + 1}`,
      text: `This is sample content to make the page scrollable. When you open the modal above,
              this content should become unscrollable, demonstrating the body scroll lock feature.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    }))
  );

  const handleOpenModal = () => {
    console.log("Opening scroll lock test modal...");
  };

  return (
    <Demo
      title="🔒 Body Scroll Lock Demo"
      description="When a modal is open, the background page scroll is locked to prevent unwanted scrolling."
      defaultExpanded={false}
    >
      <div className="scroll-lock-demo__test-section">
        <h5 className="scroll-lock-demo__test-title">🧪 Test Instructions:</h5>
        <ol className="scroll-lock-demo__test-instructions">
          <li>Scroll this page down to see more content</li>
          <li>Open a modal using the button below</li>
          <li>Try to scroll the background page - it should be locked</li>
          <li>Close the modal - scrolling should be restored</li>
          <li>Test on mobile devices for iOS-specific behavior</li>
        </ol>
      </div>

      <ScrollLockTestModal.Trigger>
        <button
          className="scroll-lock-demo__trigger-button"
          onClick={handleOpenModal}
        >
          Open Modal (Test Scroll Lock)
        </button>
      </ScrollLockTestModal.Trigger>

      <div className="scroll-lock-demo__content-section">
        <h5 className="scroll-lock-demo__content-title">
          📄 Sample Content (Scroll to Test)
        </h5>
        {contentBlocks.map((block) => (
          <div
            key={block.id}
            className={`scroll-lock-demo__content-block scroll-lock-demo__content-block--${
              block.id % 2 === 0 ? "even" : "odd"
            }`}
          >
            <h6 className="scroll-lock-demo__block-title">{block.title}</h6>
            <p className="scroll-lock-demo__block-text">{block.text}</p>
          </div>
        ))}
      </div>

      <ScrollLockTestModal />
    </Demo>
  );
}
