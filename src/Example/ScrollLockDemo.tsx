import React from 'react';
import { Modal } from '../Modal';
import { ModalContent } from '../ModalContent';
import { ModalHeader } from '../ModalHeader';
import { ModalTitle } from '../ModalTitle';
import { ModalClose } from '../ModalClose';
import { ModalTrigger } from '../ModalTrigger';

export function ScrollLockDemo() {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}>
      <h4>🔒 Body Scroll Lock Demo</h4>
      <p style={{ fontSize: "0.9em", color: "#666" }}>
        When a modal is open, the background page scroll is locked to prevent unwanted scrolling.
      </p>

      {/* Create a lot of content to make the page scrollable */}
      <div style={{ marginBottom: "2rem" }}>
        <h5>🧪 Test Instructions:</h5>
        <ol style={{ fontSize: "0.9em", paddingLeft: "1rem" }}>
          <li>Scroll this page down to see more content</li>
          <li>Open a modal using the button below</li>
          <li>Try to scroll the background page - it should be locked</li>
          <li>Close the modal - scrolling should be restored</li>
          <li>Test on mobile devices for iOS-specific behavior</li>
        </ol>
      </div>

      <ModalTrigger target="scroll-lock-modal">
        <button
          style={{
            background: "#007bff",
            color: "white",
            border: "none",
            padding: "0.75rem 1.5rem",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Open Modal (Test Scroll Lock)
        </button>
      </ModalTrigger>

      {/* Generate lots of content to make page scrollable */}
      <div style={{ marginTop: "2rem" }}>
        <h5>📄 Sample Content (Scroll to Test)</h5>
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            style={{
              padding: "1rem",
              margin: "0.5rem 0",
              background: i % 2 === 0 ? "#f8f9fa" : "#e9ecef",
              borderRadius: "4px",
            }}
          >
            <h6>Content Block {i + 1}</h6>
            <p style={{ margin: "0.5rem 0", fontSize: "0.9em" }}>
              This is sample content to make the page scrollable. When you open the modal above,
              this content should become unscrollable, demonstrating the body scroll lock feature.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        ))}
      </div>

      <Modal id="scroll-lock-modal">
        <ModalContent>
          <ModalHeader>
            <ModalTitle>🔒 Scroll Lock Active</ModalTitle>
            <ModalClose />
          </ModalHeader>
          <div style={{ padding: "1rem" }}>
            <p>
              <strong>Background scroll is now locked!</strong>
            </p>
            <p>
              Try scrolling the page behind this modal - it should be prevented.
              This demonstrates the body scroll lock functionality.
            </p>

            <div style={{
              background: "#e7f3ff",
              padding: "1rem",
              borderRadius: "4px",
              marginTop: "1rem"
            }}>
              <h6 style={{ margin: "0 0 0.5rem 0" }}>🛠 Technical Details:</h6>
              <ul style={{ fontSize: "0.9em", paddingLeft: "1rem", margin: 0 }}>
                <li>Desktop: Uses <code>overflow: hidden</code> on body</li>
                <li>iOS: Uses <code>position: fixed</code> approach</li>
                <li>Scrollbar width compensation prevents layout shifts</li>
                <li>Scroll position restored when modal closes</li>
              </ul>
            </div>

            <p style={{ fontSize: "0.9em", color: "#666", marginTop: "1rem" }}>
              Close this modal with the X button, Escape key, or by clicking the backdrop
              to restore scrolling.
            </p>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}