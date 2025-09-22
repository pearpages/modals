import { useState } from 'react';
import { ModalSystem } from '../ModalSystem';
import { Modal } from '../Modal';

/**
 * Demo component to showcase optimized footer positioning and behavior on mobile
 */
export function FooterMobileDemo() {
  const [singleButtonOpen, setSingleButtonOpen] = useState(false);
  const [multiButtonOpen, setMultiButtonOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  return (
    <ModalSystem>
      <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
        <h2>📱 Footer Mobile Optimization Demo</h2>
        <p>Testing optimized footer positioning and button behavior on mobile devices.</p>

        <div style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          marginTop: '2rem'
        }}>
          <button
            onClick={() => setSingleButtonOpen(true)}
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
            <strong>Single Button</strong>
            <br />
            <small>Standard footer layout</small>
          </button>

          <button
            onClick={() => setMultiButtonOpen(true)}
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
            <strong>Multiple Buttons</strong>
            <br />
            <small>Stacked on mobile</small>
          </button>

          <button
            onClick={() => setFormModalOpen(true)}
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
            <strong>Form with Actions</strong>
            <br />
            <small>Full-width buttons</small>
          </button>

          <button
            onClick={() => setFullscreenOpen(true)}
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
            <strong>Fullscreen Modal</strong>
            <br />
            <small>Safe area support</small>
          </button>
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h4>📱 Mobile Optimizations Applied:</h4>
          <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
            <li>✅ <strong>Compact spacing:</strong> Reduced padding and min-height on mobile</li>
            <li>✅ <strong>Safe area support:</strong> Automatic padding for iOS devices (env(safe-area-inset-bottom))</li>
            <li>✅ <strong>Button stacking:</strong> Multiple buttons stack vertically on mobile</li>
            <li>✅ <strong>Full-width buttons:</strong> Easier touch targets on mobile (44px min-height)</li>
            <li>✅ <strong>Responsive sizing:</strong> Different optimizations for ≤768px and ≤480px</li>
            <li>✅ <strong>Smart layout:</strong> Primary action button appears at bottom when stacked</li>
          </ul>
        </div>

        {/* Single Button Modal */}
        <Modal id="single-button" open={singleButtonOpen} onOpenChange={setSingleButtonOpen}>
          <Modal.Content size="auto">
            <Modal.Header>
              <Modal.Title>Single Action</Modal.Title>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <p>This modal has a single button in the footer.</p>
              <p><strong>Mobile behavior:</strong> Standard layout with compact spacing.</p>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => setSingleButtonOpen(false)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#007bff',
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

        {/* Multiple Buttons Modal */}
        <Modal id="multi-button" open={multiButtonOpen} onOpenChange={setMultiButtonOpen}>
          <Modal.Content size="md">
            <Modal.Header>
              <Modal.Title>Multiple Actions</Modal.Title>
              <Modal.Description>
                Demo of mobile button stacking behavior
              </Modal.Description>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <p>This modal demonstrates mobile optimization when multiple buttons are present.</p>
              <div style={{
                padding: '1rem',
                background: '#e7f3ff',
                borderRadius: '6px',
                border: '1px solid #b3d7ff',
                marginTop: '1rem'
              }}>
                <strong>📱 On Mobile (≤768px):</strong>
                <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
                  <li>Buttons stack vertically (column-reverse)</li>
                  <li>Primary action appears at bottom</li>
                  <li>Full-width buttons (100% width)</li>
                  <li>44px min-height for touch accessibility</li>
                </ul>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => setMultiButtonOpen(false)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => setMultiButtonOpen(false)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Confirm Action
              </button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        {/* Form Modal */}
        <Modal id="form-modal" open={formModalOpen} onOpenChange={setFormModalOpen}>
          <Modal.Content size="md">
            <Modal.Header>
              <Modal.Title>Contact Form</Modal.Title>
              <Modal.Description>
                Full-width button optimization for forms
              </Modal.Description>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Name:
                  </label>
                  <input
                    type="text"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '1rem'
                    }}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Email:
                  </label>
                  <input
                    type="email"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '1rem'
                    }}
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Message:
                  </label>
                  <textarea
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                    placeholder="Enter your message"
                  />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => setFormModalOpen(false)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => setFormModalOpen(false)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Send Message
              </button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        {/* Fullscreen Modal */}
        <Modal id="fullscreen-mobile" open={fullscreenOpen} onOpenChange={setFullscreenOpen}>
          <Modal.Content size="full">
            <Modal.Header>
              <Modal.Title>Fullscreen with Safe Area</Modal.Title>
              <Modal.Description>
                Testing safe area inset support for iOS devices
              </Modal.Description>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body style={{ padding: '2rem' }}>
              <h3>Safe Area Support</h3>
              <p>This fullscreen modal includes automatic safe area support for iOS devices.</p>

              <div style={{
                padding: '1rem',
                background: '#fff3cd',
                border: '1px solid #ffeaa7',
                borderRadius: '6px',
                marginTop: '1.5rem'
              }}>
                <strong>🍎 iOS Safe Area Features:</strong>
                <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
                  <li><code>env(safe-area-inset-bottom)</code> automatically adds bottom padding</li>
                  <li>Prevents footer from being hidden by home indicator</li>
                  <li>Works on iPhone X, 11, 12, 13, 14 series and newer</li>
                  <li>Gracefully degrades on devices without safe areas</li>
                </ul>
              </div>

              <div style={{
                marginTop: '2rem',
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '6px',
                border: '1px solid #e9ecef'
              }}>
                <h4>Test Instructions:</h4>
                <ol style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
                  <li>Open this page on an iPhone (iOS Safari)</li>
                  <li>Tap this "Fullscreen Modal" button</li>
                  <li>Notice how the footer has proper spacing above the home indicator</li>
                  <li>Try rotating to landscape to see how it adapts</li>
                </ol>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => setFullscreenOpen(false)}
                style={{
                  padding: '0.75rem 2rem',
                  background: '#6f42c1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Close Fullscreen
              </button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </div>
    </ModalSystem>
  );
}