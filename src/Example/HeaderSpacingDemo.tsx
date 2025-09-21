import { useState } from 'react';
import { ModalSystem } from '../ModalSystem';
import { Modal } from '../Modal';

/**
 * Demo component to showcase optimized header spacing
 */
export function HeaderSpacingDemo() {
  const [titleOnlyOpen, setTitleOnlyOpen] = useState(false);
  const [titleDescOpen, setTitleDescOpen] = useState(false);
  const [longTitleOpen, setLongTitleOpen] = useState(false);
  const [multiLineDescOpen, setMultiLineDescOpen] = useState(false);

  return (
    <ModalSystem>
      <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
        <h2>📐 Header Spacing Optimization Demo</h2>
        <p>Testing optimized header spacing for different content combinations.</p>

        <div style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          marginTop: '2rem'
        }}>
          <button
            onClick={() => setTitleOnlyOpen(true)}
            style={{
              padding: '1rem',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <strong>Title Only</strong>
            <br />
            <small>Optimized centering</small>
          </button>

          <button
            onClick={() => setTitleDescOpen(true)}
            style={{
              padding: '1rem',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <strong>Title + Description</strong>
            <br />
            <small>Balanced spacing</small>
          </button>

          <button
            onClick={() => setLongTitleOpen(true)}
            style={{
              padding: '1rem',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <strong>Long Title</strong>
            <br />
            <small>Text wrapping</small>
          </button>

          <button
            onClick={() => setMultiLineDescOpen(true)}
            style={{
              padding: '1rem',
              background: '#6f42c1',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <strong>Multi-line Description</strong>
            <br />
            <small>Complex layout</small>
          </button>
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h4>🎯 Optimizations Applied:</h4>
          <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
            <li>✅ <strong>Smart alignment:</strong> Center-aligned when title only, flex-start when with description</li>
            <li>✅ <strong>Responsive spacing:</strong> Reduced padding and gaps on mobile devices</li>
            <li>✅ <strong>Optical alignment:</strong> Close button positioned for better visual balance</li>
            <li>✅ <strong>Consistent sizing:</strong> Min-height adjustments for different content types</li>
            <li>✅ <strong>Mobile typography:</strong> Smaller font sizes for better mobile experience</li>
            <li>✅ <strong>Gap optimization:</strong> Reduced from 1.5rem to 1rem for better balance</li>
          </ul>
        </div>

        {/* Title Only Modal */}
        <Modal id="title-only" open={titleOnlyOpen} onOpenChange={setTitleOnlyOpen}>
          <Modal.Content size="auto">
            <Modal.Header>
              <Modal.Title>Simple Title</Modal.Title>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <p>This modal demonstrates header spacing when only a title is present.</p>
              <p><strong>Notice:</strong> The title and close button are center-aligned for better visual balance.</p>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => setTitleOnlyOpen(false)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        {/* Title + Description Modal */}
        <Modal id="title-desc" open={titleDescOpen} onOpenChange={setTitleDescOpen}>
          <Modal.Content size="md">
            <Modal.Header>
              <Modal.Title>Title with Description</Modal.Title>
              <Modal.Description>
                This description provides additional context about the modal's purpose
              </Modal.Description>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <p>This modal demonstrates optimized spacing between title and description.</p>
              <ul>
                <li>Title and description have proper margin relationships</li>
                <li>Close button is optically aligned with the title baseline</li>
                <li>Description max-width accounts for close button space</li>
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => setTitleDescOpen(false)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Got it!
              </button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        {/* Long Title Modal */}
        <Modal id="long-title" open={longTitleOpen} onOpenChange={setLongTitleOpen}>
          <Modal.Content size="md">
            <Modal.Header>
              <Modal.Title>
                This is a Very Long Title That Demonstrates How the Header Handles Text Wrapping and Close Button Positioning
              </Modal.Title>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <p>This modal tests how the header handles long titles that may wrap to multiple lines.</p>
              <p><strong>Key behaviors:</strong></p>
              <ul>
                <li>Title wraps gracefully without interfering with close button</li>
                <li>Close button stays aligned to the top of the title area</li>
                <li>Spacing remains consistent even with wrapped text</li>
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => setLongTitleOpen(false)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Close Long Title
              </button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        {/* Multi-line Description Modal */}
        <Modal id="multiline-desc" open={multiLineDescOpen} onOpenChange={setMultiLineDescOpen}>
          <Modal.Content size="md">
            <Modal.Header>
              <Modal.Title>Complex Header Layout</Modal.Title>
              <Modal.Description>
                This is a longer description that spans multiple lines to demonstrate how the header
                spacing optimization handles more complex layouts. The description should wrap gracefully
                while maintaining proper spacing relationships with both the title above and the close button.
              </Modal.Description>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <p>This modal tests complex header layouts with multi-line descriptions.</p>
              <div style={{
                padding: '1rem',
                background: '#e7f3ff',
                borderRadius: '6px',
                border: '1px solid #b3d7ff'
              }}>
                <strong>📋 Layout Features:</strong>
                <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
                  <li>Multi-line description wrapping</li>
                  <li>Proper max-width calculation</li>
                  <li>Close button top alignment</li>
                  <li>Consistent vertical rhythm</li>
                </ul>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => setMultiLineDescOpen(false)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#6f42c1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Perfect!
              </button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </div>
    </ModalSystem>
  );
}