import React from 'react';
import { Modal } from '../Modal';
import { ModalContent } from '../ModalContent';
import { ModalHeader } from '../ModalHeader';
import { ModalTitle } from '../ModalTitle';
import { ModalDescription } from '../ModalDescription';
import { ModalClose } from '../ModalClose';
import { ModalBody } from '../ModalBody';
import { ModalFooter } from '../ModalFooter';
import { ModalTrigger } from '../ModalTrigger';

export function AccessibilityDemo() {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}>
      <h4>♿ Accessibility Demo</h4>
      <p style={{ fontSize: "0.9em", color: "#666" }}>
        Demonstrates proper ARIA linking and accessibility features.
      </p>

      <div style={{
        background: "#e8f5e8",
        padding: "1rem",
        borderRadius: "4px",
        marginBottom: "1rem",
        fontSize: "0.9em"
      }}>
        <strong>✅ Accessibility Features Implemented:</strong>
        <ul style={{ margin: "0.5rem 0", paddingLeft: "1rem" }}>
          <li><code>role="dialog"</code> on Modal.Content</li>
          <li><code>aria-modal="true"</code></li>
          <li><code>aria-labelledby</code> automatically linked to Modal.Title</li>
          <li><code>aria-describedby</code> automatically linked to Modal.Description</li>
          <li>Focus trap and focus restoration</li>
          <li>Keyboard navigation (Escape key)</li>
        </ul>
      </div>

      <div style={{
        background: "#fff3cd",
        padding: "1rem",
        borderRadius: "4px",
        marginBottom: "1rem",
        fontSize: "0.9em"
      }}>
        <strong>🔍 How to test accessibility:</strong>
        <ol style={{ margin: "0.5rem 0", paddingLeft: "1rem" }}>
          <li>Use screen reader (VoiceOver on Mac, NVDA on Windows)</li>
          <li>Open modal and listen to announcements</li>
          <li>Inspect element to see ARIA attributes</li>
          <li>Tab through elements to test focus trap</li>
          <li>Press Escape to test keyboard navigation</li>
        </ol>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <ModalTrigger target="accessibility-complete">
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
            Complete Accessibility
          </button>
        </ModalTrigger>

        <ModalTrigger target="accessibility-title-only">
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
            Title Only (No Description)
          </button>
        </ModalTrigger>

        <ModalTrigger target="accessibility-custom-ids">
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
            Custom IDs
          </button>
        </ModalTrigger>
      </div>

      {/* Complete Accessibility Modal */}
      <Modal id="accessibility-complete">
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Delete Account</ModalTitle>
            <ModalDescription>
              This action cannot be undone. All your data will be permanently deleted.
            </ModalDescription>
            <ModalClose />
          </ModalHeader>
          <Modal.Body>
            <div style={{
              background: "#f8d7da",
              padding: "1rem",
              borderRadius: "4px",
              border: "1px solid #f5c6cb",
              marginBottom: "1rem"
            }}>
              <strong>⚠️ Warning:</strong> This will permanently delete your account
              and all associated data. This action cannot be reversed.
            </div>

            <p>To confirm deletion, type <strong>"DELETE"</strong> in the field below:</p>
            <input
              type="text"
              placeholder="Type DELETE to confirm"
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginTop: "0.5rem"
              }}
            />

            <div style={{
              background: "#d1ecf1",
              padding: "1rem",
              borderRadius: "4px",
              marginTop: "1rem",
              fontSize: "0.9em"
            }}>
              <strong>🔍 Inspect this modal:</strong>
              <ul style={{ margin: "0.5rem 0", paddingLeft: "1rem" }}>
                <li>Modal.Content has <code>aria-labelledby</code> pointing to title</li>
                <li>Modal.Content has <code>aria-describedby</code> pointing to description</li>
                <li>Screen readers will announce both title and description</li>
              </ul>
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
                marginRight: "0.5rem"
              }}
            >
              Cancel
            </button>
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
              Delete Account
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Title Only Modal */}
      <Modal id="accessibility-title-only">
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Simple Notification</ModalTitle>
            <ModalClose />
          </ModalHeader>
          <Modal.Body>
            <p>
              This modal only has a title, no description. The Modal.Content
              will have <code>aria-labelledby</code> but no <code>aria-describedby</code>.
            </p>

            <div style={{
              background: "#d1ecf1",
              padding: "1rem",
              borderRadius: "4px",
              marginTop: "1rem",
              fontSize: "0.9em"
            }}>
              <strong>🔍 Check the attributes:</strong>
              <ul style={{ margin: "0.5rem 0", paddingLeft: "1rem" }}>
                <li><code>aria-labelledby</code> will point to Modal.Title</li>
                <li><code>aria-describedby</code> will be undefined (no description)</li>
                <li>This is perfectly valid - description is optional</li>
              </ul>
            </div>
          </Modal.Body>
          <ModalFooter>
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
              Got it!
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Custom IDs Modal */}
      <Modal id="accessibility-custom-ids">
        <ModalContent>
          <ModalHeader>
            <ModalTitle id="custom-title-id">Custom ID Example</ModalTitle>
            <ModalDescription id="custom-desc-id">
              This modal uses custom IDs for title and description elements.
            </ModalDescription>
            <ModalClose />
          </ModalHeader>
          <Modal.Body>
            <p>
              You can provide custom IDs to Modal.Title and Modal.Description
              if needed. The aria linking will work with your custom IDs.
            </p>

            <div style={{
              background: "#d1ecf1",
              padding: "1rem",
              borderRadius: "4px",
              marginTop: "1rem",
              fontSize: "0.9em"
            }}>
              <strong>🔍 Custom IDs in use:</strong>
              <ul style={{ margin: "0.5rem 0", paddingLeft: "1rem" }}>
                <li>Modal.Title: <code>id="custom-title-id"</code></li>
                <li>Modal.Description: <code>id="custom-desc-id"</code></li>
                <li>Modal.Content: <code>aria-labelledby="custom-title-id"</code></li>
                <li>Modal.Content: <code>aria-describedby="custom-desc-id"</code></li>
              </ul>
            </div>
          </Modal.Body>
          <ModalFooter>
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
              Perfect!
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}