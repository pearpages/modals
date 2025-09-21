import React from 'react';
import { Modal } from '../Modal';
import { ModalContent } from '../ModalContent';
import { ModalHeader } from '../ModalHeader';
import { ModalTitle } from '../ModalTitle';
import { ModalClose } from '../ModalClose';
import { ModalBody } from '../ModalBody';
import { ModalFooter } from '../ModalFooter';
import { ModalTrigger } from '../ModalTrigger';

export function MobileResponsiveTest() {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}>
      <h4>📱 Mobile Responsive Test</h4>
      <p style={{ fontSize: "0.9em", color: "#666" }}>
        Test modal behavior on mobile vs desktop. Resize your browser window or use dev tools device emulation.
      </p>

      <div style={{
        background: "#e7f3ff",
        padding: "1rem",
        borderRadius: "4px",
        marginBottom: "1rem",
        fontSize: "0.9em"
      }}>
        <strong>📋 Test Instructions:</strong>
        <ol style={{ margin: "0.5rem 0", paddingLeft: "1rem" }}>
          <li><strong>Desktop</strong> (&gt;768px): Modal should be centered, sized normally</li>
          <li><strong>Mobile</strong> (≤768px): Modal should be fullscreen (100vw × 100vh)</li>
          <li>Try both auto and md size variants</li>
          <li>Test with content that requires scrolling</li>
        </ol>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <ModalTrigger target="responsive-auto">
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
            Auto Size Modal
          </button>
        </ModalTrigger>

        <ModalTrigger target="responsive-md">
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
            Medium Size Modal
          </button>
        </ModalTrigger>

        <ModalTrigger target="responsive-full">
          <button
            style={{
              background: "#dc3545",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Always Fullscreen
          </button>
        </ModalTrigger>
      </div>

      {/* Auto Size Modal - Responsive */}
      <Modal id="responsive-auto">
        <ModalContent size="auto">
          <ModalHeader>
            <ModalTitle>📱 Auto Size (Responsive)</ModalTitle>
            <ModalClose />
          </ModalHeader>
          <Modal.Body>
            <div style={{
              background: "#f8f9fa",
              padding: "1rem",
              borderRadius: "4px",
              marginBottom: "1rem"
            }}>
              <strong>Current behavior:</strong>
              <ul style={{ margin: "0.5rem 0", paddingLeft: "1rem", fontSize: "0.9em" }}>
                <li><strong>Desktop:</strong> Auto-sizes to content, centered</li>
                <li><strong>Mobile:</strong> Fullscreen (100vw × 100vh)</li>
              </ul>
            </div>

            <p>
              This modal uses <code>size="auto"</code> which normally sizes to content,
              but on mobile (≤768px) it becomes fullscreen for better UX.
            </p>

            <p>
              Resize your browser window or use Chrome DevTools device emulation
              to see the responsive behavior in action.
            </p>

            <div style={{
              background: "#d1ecf1",
              padding: "1rem",
              borderRadius: "4px",
              fontSize: "0.9em"
            }}>
              <strong>🔍 How to test:</strong>
              <br />
              Open Chrome DevTools → Toggle device toolbar → Select a mobile device
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
              Close
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Medium Size Modal - Responsive */}
      <Modal id="responsive-md">
        <ModalContent size="md">
          <ModalHeader>
            <ModalTitle>📱 Medium Size (Responsive)</ModalTitle>
            <ModalClose />
          </ModalHeader>
          <Modal.Body>
            <p>
              This modal uses <code>size="md"</code> which is 520px wide on desktop,
              but becomes fullscreen on mobile devices.
            </p>

            {/* Add some content to test scrolling */}
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                style={{
                  padding: "0.75rem",
                  margin: "0.5rem 0",
                  background: i % 2 === 0 ? "#f8f9fa" : "#e9ecef",
                  borderRadius: "4px",
                }}
              >
                <strong>Content Block {i + 1}</strong>
                <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.9em" }}>
                  Sample content to test scrolling behavior on both desktop and mobile.
                  The Modal.Body should handle overflow gracefully in both modes.
                </p>
              </div>
            ))}

            <div style={{
              background: "#d4edda",
              padding: "1rem",
              borderRadius: "4px",
              marginTop: "1rem"
            }}>
              <strong>✅ Mobile fullscreen features:</strong>
              <ul style={{ margin: "0.5rem 0", paddingLeft: "1rem", fontSize: "0.9em" }}>
                <li>No border radius (sharp corners)</li>
                <li>Full viewport coverage</li>
                <li>Proper flex layout for header/body/footer</li>
                <li>Body scrolling when content overflows</li>
              </ul>
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

      {/* Always Fullscreen Modal */}
      <Modal id="responsive-full">
        <ModalContent size="full">
          <ModalHeader>
            <ModalTitle>📱 Always Fullscreen</ModalTitle>
            <ModalClose />
          </ModalHeader>
          <Modal.Body>
            <p>
              This modal uses <code>size="full"</code> so it's always fullscreen
              on both desktop and mobile.
            </p>

            <div style={{
              background: "#fff3cd",
              padding: "1rem",
              borderRadius: "4px",
              marginTop: "1rem"
            }}>
              <strong>💡 Note:</strong> This is different from the responsive behavior.
              The <code>size="full"</code> is always fullscreen, while <code>size="auto"</code>
              and <code>size="md"</code> are only fullscreen on mobile.
            </div>
          </Modal.Body>
          <ModalFooter>
            <button
              style={{
                background: "#dc3545",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Exit Fullscreen
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}