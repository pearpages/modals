import React from 'react';
import { Modal } from '../Modal';
import { ModalContent } from '../ModalContent';
import { ModalHeader } from '../ModalHeader';
import { ModalTitle } from '../ModalTitle';
import { ModalClose } from '../ModalClose';
import { ModalBody } from '../ModalBody';
import { ModalFooter } from '../ModalFooter';
import { ModalTrigger } from '../ModalTrigger';

export function ModalBodyDemo() {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}>
      <h4>📄 Modal.Body Component Demo</h4>
      <p style={{ fontSize: "0.9em", color: "#666" }}>
        Demonstrates the new Modal.Body component with overflow handling and semantic structure.
      </p>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        <ModalTrigger target="simple-body-modal">
          <button
            style={{
              background: "#007bff",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Simple Modal.Body
          </button>
        </ModalTrigger>

        <ModalTrigger target="scrollable-body-modal">
          <button
            style={{
              background: "#28a745",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Scrollable Content
          </button>
        </ModalTrigger>

        <ModalTrigger target="custom-body-modal">
          <button
            style={{
              background: "#6f42c1",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Custom Styled Body
          </button>
        </ModalTrigger>
      </div>

      <div style={{
        background: "#e7f3ff",
        padding: "1rem",
        borderRadius: "4px",
        fontSize: "0.9em"
      }}>
        <strong>✨ Modal.Body Benefits:</strong>
        <ul style={{ margin: "0.5rem 0", paddingLeft: "1rem" }}>
          <li><strong>Semantic structure</strong> - Clear content organization</li>
          <li><strong>Automatic overflow</strong> - Scrolling when content is too tall</li>
          <li><strong>Consistent spacing</strong> - Proper padding and margins</li>
          <li><strong>asChild support</strong> - Use custom elements while keeping functionality</li>
        </ul>
      </div>

      {/* Simple Modal.Body Example */}
      <Modal id="simple-body-modal">
        <ModalContent>
          <ModalHeader>
            <ModalTitle>📄 Simple Modal.Body</ModalTitle>
            <ModalClose />
          </ModalHeader>
          <Modal.Body>
            <p>
              This content is inside a <code>Modal.Body</code> component,
              providing semantic structure and consistent styling.
            </p>
            <p>
              Notice how the content has proper spacing and is clearly separated
              from the header and footer areas.
            </p>
            <div style={{
              background: "#f8f9fa",
              padding: "1rem",
              borderRadius: "4px",
              marginTop: "1rem"
            }}>
              <strong>Code structure:</strong>
              <pre style={{ fontSize: "0.8em", margin: "0.5rem 0 0 0", overflow: "auto" }}>
{`<Modal.Content>
  <Modal.Header>...</Modal.Header>
  <Modal.Body>
    <p>Content goes here</p>
  </Modal.Body>
  <Modal.Footer>...</Modal.Footer>
</Modal.Content>`}
              </pre>
            </div>
          </Modal.Body>
          <ModalFooter>
            <button
              style={{
                background: "#6c757d",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Got it!
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Scrollable Content Example */}
      <Modal id="scrollable-body-modal">
        <ModalContent size="md">
          <ModalHeader>
            <ModalTitle>📜 Scrollable Modal.Body</ModalTitle>
            <ModalClose />
          </ModalHeader>
          <Modal.Body>
            <p><strong>This Modal.Body automatically handles overflow with scrolling!</strong></p>

            {/* Generate lots of content to demonstrate scrolling */}
            {Array.from({ length: 15 }, (_, i) => (
              <div
                key={i}
                style={{
                  padding: "1rem",
                  margin: "0.5rem 0",
                  background: i % 2 === 0 ? "#f8f9fa" : "#e9ecef",
                  borderRadius: "4px",
                }}
              >
                <h6 style={{ margin: "0 0 0.5rem 0" }}>Content Block {i + 1}</h6>
                <p style={{ margin: 0, fontSize: "0.9em" }}>
                  This is example content to demonstrate the scrolling behavior.
                  The Modal.Body component automatically adds overflow: auto and
                  includes beautiful custom scrollbars. The header and footer
                  remain fixed while this content area scrolls.
                </p>
              </div>
            ))}

            <div style={{
              background: "#d4edda",
              padding: "1rem",
              borderRadius: "4px",
              marginTop: "1rem"
            }}>
              <strong>🎯 End of scrollable content!</strong>
              <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9em" }}>
                Notice how the header stayed at the top and the footer stays at the bottom,
                while this middle content area scrolled independently.
              </p>
            </div>
          </Modal.Body>
          <ModalFooter>
            <button
              style={{
                background: "#28a745",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Perfect!
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Custom Styled Body Example */}
      <Modal id="custom-body-modal">
        <ModalContent>
          <ModalHeader>
            <ModalTitle>🎨 Custom Styled Modal.Body</ModalTitle>
            <ModalClose />
          </ModalHeader>
          <Modal.Body
            className="custom-gradient-body"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              borderRadius: "8px",
              padding: "2rem",
            }}
          >
            <h3 style={{ color: "#fff", marginTop: 0 }}>Beautiful Custom Styling</h3>
            <p>
              Modal.Body supports custom className and style props, allowing you to
              create stunning designs while maintaining the overflow handling and
              semantic structure.
            </p>

            <div style={{
              background: "rgba(255, 255, 255, 0.1)",
              padding: "1rem",
              borderRadius: "6px",
              marginTop: "1rem",
              backdropFilter: "blur(10px)"
            }}>
              <strong>Features maintained:</strong>
              <ul style={{ margin: "0.5rem 0", paddingLeft: "1rem" }}>
                <li>Overflow scrolling (if needed)</li>
                <li>Flexible layout integration</li>
                <li>Custom scrollbar styling</li>
                <li>Mobile responsive behavior</li>
              </ul>
            </div>

            <p style={{ marginBottom: 0, opacity: 0.9 }}>
              The asChild prop is also supported if you need to use a different
              HTML element while keeping all the Modal.Body functionality.
            </p>
          </Modal.Body>
          <ModalFooter>
            <button
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
                backdropFilter: "blur(10px)"
              }}
            >
              Awesome!
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}