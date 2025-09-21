import { useState } from 'react';
import { ModalSystem } from '../ModalSystem';
import { Modal } from '../Modal';

/**
 * Demo component to test and showcase optimized modal content overflow/scrolling behavior
 */
export function ScrollOptimizationDemo() {
  const [longContentOpen, setLongContentOpen] = useState(false);
  const [mixedContentOpen, setMixedContentOpen] = useState(false);
  const [tableContentOpen, setTableContentOpen] = useState(false);

  const generateLongContent = (paragraphs: number) => {
    return Array.from({ length: paragraphs }, (_, i) => (
      <p key={i} style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
        This is paragraph {i + 1} of the long content test. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
    ));
  };

  return (
    <ModalSystem>
      <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
        <h2>📜 Scroll Optimization Demo</h2>
        <p>Testing optimized modal content overflow and scrolling behavior.</p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
          <button
            onClick={() => setLongContentOpen(true)}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Test Long Content
          </button>

          <button
            onClick={() => setMixedContentOpen(true)}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Test Mixed Content
          </button>

          <button
            onClick={() => setTableContentOpen(true)}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#6f42c1',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Test Table Content
          </button>
        </div>

        {/* Long Content Modal */}
        <Modal id="long-content" open={longContentOpen} onOpenChange={setLongContentOpen}>
          <Modal.Content size="md">
            <Modal.Header>
              <Modal.Title>Long Content Test</Modal.Title>
              <Modal.Description>
                Testing scroll behavior with extensive content
              </Modal.Description>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <div style={{
                padding: '0 0 1rem 0',
                borderBottom: '1px solid #eee',
                marginBottom: '1rem'
              }}>
                <strong>🎯 Test Features:</strong>
                <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                  <li>✅ Enhanced scrollbar styling (8px width, better hover states)</li>
                  <li>✅ Firefox scrollbar support</li>
                  <li>✅ iOS smooth scrolling (-webkit-overflow-scrolling: touch)</li>
                  <li>✅ Overscroll containment (prevents body scroll)</li>
                  <li>✅ Smart height calculation (90vh - 200px for header/footer)</li>
                  <li>✅ Proper flexbox layout with min-height: 0</li>
                </ul>
              </div>
              {generateLongContent(15)}
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => setLongContentOpen(false)}
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

        {/* Mixed Content Modal */}
        <Modal id="mixed-content" open={mixedContentOpen} onOpenChange={setMixedContentOpen}>
          <Modal.Content size="md">
            <Modal.Header>
              <Modal.Title>Mixed Content Test</Modal.Title>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <div style={{ marginBottom: '2rem' }}>
                <h3>Form Section</h3>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Name"
                    style={{
                      padding: '0.5rem',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      width: '100%'
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    style={{
                      padding: '0.5rem',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      width: '100%'
                    }}
                  />
                  <textarea
                    placeholder="Message"
                    rows={4}
                    style={{
                      padding: '0.5rem',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      width: '100%',
                      resize: 'vertical'
                    }}
                  />
                </form>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3>Image Section</h3>
                <div style={{
                  width: '100%',
                  height: '200px',
                  background: 'linear-gradient(45deg, #f0f0f0, #e0e0e0)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#666'
                }}>
                  Placeholder Image (200px height)
                </div>
              </div>

              {generateLongContent(8)}
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => setMixedContentOpen(false)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Submit & Close
              </button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        {/* Table Content Modal */}
        <Modal id="table-content" open={tableContentOpen} onOpenChange={setTableContentOpen}>
          <Modal.Content size="md">
            <Modal.Header>
              <Modal.Title>Table Content Test</Modal.Title>
              <Modal.Description>
                Testing horizontal overflow prevention and table scrolling
              </Modal.Description>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <div style={{ marginBottom: '1rem' }}>
                <strong>📊 Testing horizontal overflow:</strong>
                <p>The table below should never cause horizontal scrolling in the modal.</p>
              </div>

              <div style={{
                overflowX: 'auto',
                border: '1px solid #ddd',
                borderRadius: '6px'
              }}>
                <table style={{
                  width: '100%',
                  minWidth: '600px',
                  borderCollapse: 'collapse'
                }}>
                  <thead>
                    <tr style={{ background: '#f8f9fa' }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Name</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Email</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Role</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Department</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Start Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 20 }, (_, i) => (
                      <tr key={i}>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>User {i + 1}</td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>user{i + 1}@example.com</td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Developer</td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Engineering</td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>2024-01-{String(i + 1).padStart(2, '0')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <h4>Summary</h4>
                <p>This table demonstrates proper horizontal overflow handling within the modal body.</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => setTableContentOpen(false)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#6f42c1',
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
      </div>
    </ModalSystem>
  );
}