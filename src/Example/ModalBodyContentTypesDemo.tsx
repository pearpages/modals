import { useState } from 'react';
import { ModalSystem } from '../ModalSystem';
import { Modal } from '../Modal';

/**
 * Demo component to test Modal.Body support for various content types and edge cases
 */
export function ModalBodyContentTypesDemo() {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [iframeModalOpen, setIframeModalOpen] = useState(false);
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [dataVisualizationOpen, setDataVisualizationOpen] = useState(false);
  const [wideContentOpen, setWideContentOpen] = useState(false);
  const [fixedElementsOpen, setFixedElementsOpen] = useState(false);
  const [emptyContentOpen, setEmptyContentOpen] = useState(false);

  return (
    <ModalSystem>
      <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
        <h2>🧪 Modal.Body Content Types Test</h2>
        <p>Testing Modal.Body support for various content types, media, and edge cases.</p>

        <div style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          marginTop: '2rem'
        }}>
          <button
            onClick={() => setImageModalOpen(true)}
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
            <strong>🖼️ Images & Media</strong>
            <br />
            <small>Large images, responsive behavior</small>
          </button>

          <button
            onClick={() => setVideoModalOpen(true)}
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
            <strong>🎥 Video Content</strong>
            <br />
            <small>Embedded video, aspect ratios</small>
          </button>

          <button
            onClick={() => setIframeModalOpen(true)}
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
            <strong>🌐 Iframe & Embeds</strong>
            <br />
            <small>External content, sizing issues</small>
          </button>

          <button
            onClick={() => setCodeModalOpen(true)}
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
            <strong>💻 Code & Preformatted</strong>
            <br />
            <small>Code blocks, horizontal scroll</small>
          </button>

          <button
            onClick={() => setDataVisualizationOpen(true)}
            style={{
              padding: '1rem',
              background: '#fd7e14',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <strong>📊 Data Visualization</strong>
            <br />
            <small>SVG, Canvas, Charts</small>
          </button>

          <button
            onClick={() => setWideContentOpen(true)}
            style={{
              padding: '1rem',
              background: '#20c997',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <strong>📏 Wide Content</strong>
            <br />
            <small>Horizontal overflow handling</small>
          </button>

          <button
            onClick={() => setFixedElementsOpen(true)}
            style={{
              padding: '1rem',
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <strong>📌 Fixed/Sticky Elements</strong>
            <br />
            <small>Positioning edge cases</small>
          </button>

          <button
            onClick={() => setEmptyContentOpen(true)}
            style={{
              padding: '1rem',
              background: '#343a40',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <strong>🗂️ Edge Cases</strong>
            <br />
            <small>Empty content, minimal content</small>
          </button>
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h4>🎯 Content Type Testing Goals:</h4>
          <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
            <li>✅ <strong>Media handling:</strong> Images, videos maintain aspect ratios</li>
            <li>✅ <strong>Horizontal overflow:</strong> Wide content doesn't break modal layout</li>
            <li>✅ <strong>Responsive behavior:</strong> Content adapts properly on mobile</li>
            <li>✅ <strong>Scroll behavior:</strong> Proper scrolling for different content types</li>
            <li>✅ <strong>Fixed positioning:</strong> Elements position correctly within modal</li>
            <li>✅ <strong>Edge cases:</strong> Empty content, minimal content handled gracefully</li>
          </ul>
        </div>

        {/* Image Modal */}
        <Modal id="image-modal" open={imageModalOpen} onOpenChange={setImageModalOpen}>
          <Modal.Content size="md">
            <Modal.Header>
              <Modal.Title>🖼️ Image Content Test</Modal.Title>
              <Modal.Description>
                Testing responsive image behavior and large media
              </Modal.Description>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <div style={{ marginBottom: '1rem' }}>
                <h4>Responsive Image Handling</h4>
                <p>This tests how Modal.Body handles large images and responsive behavior.</p>
              </div>

              {/* Large placeholder image */}
              <div
                style={{
                  width: '100%',
                  height: '400px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
              >
                📷 Large Image Placeholder (400px height)
              </div>

              {/* Gallery of smaller images */}
              <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
                {Array.from({ length: 6 }, (_, i) => (
                  <div
                    key={i}
                    style={{
                      aspectRatio: '1',
                      background: `hsl(${i * 60}, 70%, 60%)`,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  >
                    IMG {i + 1}
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: '#e7f3ff',
                borderRadius: '6px',
                border: '1px solid #b3d7ff'
              }}>
                <strong>✅ Image Handling Features:</strong>
                <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
                  <li>Responsive images that scale with container</li>
                  <li>Grid layouts that adapt to modal width</li>
                  <li>Proper aspect ratio maintenance</li>
                  <li>Scroll handling for image galleries</li>
                </ul>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => setImageModalOpen(false)}
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

        {/* Video Modal */}
        <Modal id="video-modal" open={videoModalOpen} onOpenChange={setVideoModalOpen}>
          <Modal.Content size="md">
            <Modal.Header>
              <Modal.Title>🎥 Video Content Test</Modal.Title>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <div style={{ marginBottom: '1.5rem' }}>
                <h4>Video Aspect Ratio Handling</h4>
                <p>Testing how Modal.Body handles video content and maintains aspect ratios.</p>
              </div>

              {/* 16:9 Video placeholder */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/9',
                  background: '#000',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.1rem',
                  marginBottom: '1rem'
                }}
              >
                ▶️ Video Player (16:9 Aspect Ratio)
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    right: '10px',
                    height: '4px',
                    background: 'rgba(255,255,255,0.3)',
                    borderRadius: '2px'
                  }}
                >
                  <div
                    style={{
                      width: '40%',
                      height: '100%',
                      background: '#ff4757',
                      borderRadius: '2px'
                    }}
                  />
                </div>
              </div>

              {/* Video controls and info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}>
                <button style={{
                  padding: '0.5rem 1rem',
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  ▶️ Play
                </button>
                <span style={{ fontSize: '0.9rem', color: '#666' }}>
                  Duration: 5:23 | Resolution: 1920x1080
                </span>
              </div>

              <div style={{
                padding: '1rem',
                background: '#fff3cd',
                border: '1px solid #ffeaa7',
                borderRadius: '6px'
              }}>
                <strong>🎬 Video Handling Features:</strong>
                <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
                  <li>Maintains video aspect ratios (16:9, 4:3, etc.)</li>
                  <li>Responsive video players</li>
                  <li>Prevents horizontal overflow on mobile</li>
                  <li>Supports custom video controls</li>
                </ul>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => setVideoModalOpen(false)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#28a745',
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

        {/* Code Modal */}
        <Modal id="code-modal" open={codeModalOpen} onOpenChange={setCodeModalOpen}>
          <Modal.Content size="md">
            <Modal.Header>
              <Modal.Title>💻 Code & Preformatted Content</Modal.Title>
              <Modal.Description>
                Testing code blocks and horizontal scrolling
              </Modal.Description>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <div style={{ marginBottom: '1rem' }}>
                <h4>Code Block Handling</h4>
                <p>Testing how Modal.Body handles code blocks with horizontal overflow.</p>
              </div>

              <pre
                style={{
                  background: '#2d3748',
                  color: '#e2e8f0',
                  padding: '1rem',
                  borderRadius: '8px',
                  overflowX: 'auto',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  marginBottom: '1rem'
                }}
              >
{`// This is a very long line of code that should trigger horizontal scrolling within the code block
function createVeryLongFunctionNameThatExceedsTheModalWidth(parameterOne, parameterTwo, parameterThree) {
  const veryLongVariableName = "This is a string that is intentionally very long to test horizontal scrolling";

  return {
    result: processComplexDataStructureWithManyProperties(parameterOne, parameterTwo, parameterThree),
    metadata: {
      timestamp: new Date().toISOString(),
      processingTime: performance.now() - startTime,
      configuration: { enableOptimization: true, cacheResults: false, debugMode: true }
    }
  };
}`}
              </pre>

              <div style={{
                background: '#f8f9fa',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #e9ecef',
                marginBottom: '1rem'
              }}>
                <h5>JSON Data Example:</h5>
                <pre style={{
                  background: '#fff',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  overflowX: 'auto',
                  fontSize: '0.8rem',
                  margin: '0.5rem 0 0 0'
                }}>
{`{
  "user": {
    "id": 12345,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "preferences": {
      "notifications": { "email": true, "push": false, "sms": true },
      "privacy": { "profileVisible": true, "dataSharing": false },
      "theme": "dark",
      "language": "en-US"
    },
    "metadata": {
      "createdAt": "2024-01-15T10:30:00Z",
      "lastLogin": "2024-01-22T14:45:22Z",
      "loginCount": 142,
      "ipAddress": "192.168.1.100"
    }
  }
}`}
                </pre>
              </div>

              <div style={{
                padding: '1rem',
                background: '#e7f3ff',
                borderRadius: '6px',
                border: '1px solid #b3d7ff'
              }}>
                <strong>💾 Code Content Features:</strong>
                <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
                  <li>Horizontal scrolling within code blocks</li>
                  <li>Preserved formatting and indentation</li>
                  <li>Syntax highlighting support ready</li>
                  <li>Responsive font sizing</li>
                  <li>No horizontal overflow outside modal bounds</li>
                </ul>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => setCodeModalOpen(false)}
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

        {/* Wide Content Modal */}
        <Modal id="wide-content" open={wideContentOpen} onOpenChange={setWideContentOpen}>
          <Modal.Content size="md">
            <Modal.Header>
              <Modal.Title>📏 Wide Content Handling</Modal.Title>
              <Modal.Description>
                Testing horizontal overflow prevention
              </Modal.Description>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <div style={{ marginBottom: '1rem' }}>
                <h4>Horizontal Overflow Prevention</h4>
                <p>Testing how Modal.Body handles content wider than the modal.</p>
              </div>

              {/* Wide table that should scroll horizontally */}
              <div style={{
                overflowX: 'auto',
                border: '1px solid #ddd',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}>
                <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f8f9fa' }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd', minWidth: '150px' }}>Column 1</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd', minWidth: '150px' }}>Column 2</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd', minWidth: '150px' }}>Column 3</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd', minWidth: '150px' }}>Column 4</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd', minWidth: '150px' }}>Column 5</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd', minWidth: '150px' }}>Column 6</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 5 }, (_, i) => (
                      <tr key={i}>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Row {i + 1} Data 1</td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Row {i + 1} Data 2</td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Row {i + 1} Data 3</td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Row {i + 1} Data 4</td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Row {i + 1} Data 5</td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Row {i + 1} Data 6</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Really wide element test */}
              <div style={{
                background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7)',
                height: '60px',
                borderRadius: '8px',
                marginBottom: '1rem',
                width: '1200px', // Intentionally wider than modal
                maxWidth: '100%', // Should be constrained
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}>
                🌈 Wide Gradient Element (1200px → constrained)
              </div>

              <div style={{
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '6px',
                border: '1px solid #e9ecef'
              }}>
                <strong>📐 Wide Content Features:</strong>
                <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
                  <li>Tables with horizontal scroll containers</li>
                  <li>max-width constraints prevent modal overflow</li>
                  <li>CSS overflow-x: hidden on modal body</li>
                  <li>Proper scrollbar styling for horizontal scroll</li>
                  <li>Content adapts to modal bounds</li>
                </ul>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => setWideContentOpen(false)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#20c997',
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

        {/* Empty Content Modal */}
        <Modal id="empty-content" open={emptyContentOpen} onOpenChange={setEmptyContentOpen}>
          <Modal.Content size="auto">
            <Modal.Header>
              <Modal.Title>🗂️ Edge Cases</Modal.Title>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <div style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>
                This modal demonstrates handling of minimal content.
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => setEmptyContentOpen(false)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Close Empty Modal
              </button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        {/* Data Visualization Modal */}
        <Modal id="data-viz" open={dataVisualizationOpen} onOpenChange={setDataVisualizationOpen}>
          <Modal.Content size="md">
            <Modal.Header>
              <Modal.Title>📊 Data Visualization</Modal.Title>
              <Modal.Description>
                Testing SVG, Canvas, and chart content
              </Modal.Description>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <div style={{ marginBottom: '1rem' }}>
                <h4>SVG and Canvas Content</h4>
                <p>Testing how Modal.Body handles vector graphics and data visualizations.</p>
              </div>

              {/* SVG Chart */}
              <svg width="100%" height="200" style={{ border: '1px solid #ddd', borderRadius: '8px', marginBottom: '1rem' }}>
                <rect width="100%" height="100%" fill="#f8f9fa" />
                {/* Bar chart bars */}
                {[30, 80, 45, 90, 65, 75, 55].map((height, i) => (
                  <rect
                    key={i}
                    x={40 + i * 60}
                    y={180 - height}
                    width="40"
                    height={height}
                    fill={`hsl(${i * 50}, 70%, 60%)`}
                  />
                ))}
                {/* Chart title */}
                <text x="50%" y="25" textAnchor="middle" fill="#333" fontSize="16" fontWeight="bold">
                  📈 Sample Bar Chart
                </text>
                {/* Y-axis labels */}
                <text x="30" y="60" textAnchor="end" fill="#666" fontSize="12">100</text>
                <text x="30" y="120" textAnchor="end" fill="#666" fontSize="12">50</text>
                <text x="30" y="180" textAnchor="end" fill="#666" fontSize="12">0</text>
              </svg>

              {/* Canvas-like visualization */}
              <div style={{
                width: '100%',
                height: '150px',
                background: '#000',
                borderRadius: '8px',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '1rem'
              }}>
                {/* Simulated particles/data points */}
                {Array.from({ length: 50 }, (_, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      width: `${4 + Math.random() * 6}px`,
                      height: `${4 + Math.random() * 6}px`,
                      borderRadius: '50%',
                      background: `hsl(${Math.random() * 360}, 70%, 60%)`,
                      animation: `pulse ${1 + Math.random() * 2}s infinite alternate`
                    }}
                  />
                ))}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  color: 'white',
                  fontSize: '0.9rem'
                }}>
                  ✨ Simulated Data Visualization
                </div>
              </div>

              <div style={{
                padding: '1rem',
                background: '#e7f3ff',
                borderRadius: '6px',
                border: '1px solid #b3d7ff'
              }}>
                <strong>📊 Visualization Features:</strong>
                <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
                  <li>Responsive SVG graphics that scale with modal</li>
                  <li>Canvas-like visualizations with proper containment</li>
                  <li>Chart libraries integration ready</li>
                  <li>Performance optimized for complex graphics</li>
                  <li>Animation support without affecting modal animations</li>
                </ul>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => setDataVisualizationOpen(false)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#fd7e14',
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

        {/* Fixed Elements Modal */}
        <Modal id="fixed-elements" open={fixedElementsOpen} onOpenChange={setFixedElementsOpen}>
          <Modal.Content size="md">
            <Modal.Header>
              <Modal.Title>📌 Fixed/Sticky Elements</Modal.Title>
              <Modal.Description>
                Testing positioning edge cases within modal
              </Modal.Description>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <div style={{ marginBottom: '1rem' }}>
                <h4>Positioning Within Modal Context</h4>
                <p>Testing how elements with special positioning behave inside Modal.Body.</p>
              </div>

              {/* Sticky header within content */}
              <div style={{
                position: 'sticky',
                top: '0',
                background: '#007bff',
                color: 'white',
                padding: '0.75rem 1rem',
                marginBottom: '1rem',
                borderRadius: '6px',
                zIndex: 1
              }}>
                📌 Sticky Section Header (scrolls with content)
              </div>

              {/* Long content to enable scrolling */}
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    padding: '1rem',
                    marginBottom: '1rem',
                    background: i % 2 === 0 ? '#f8f9fa' : '#e9ecef',
                    borderRadius: '6px'
                  }}
                >
                  <strong>Content Block {i + 1}</strong>
                  <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>
                    This content tests how the sticky header behaves during scrolling.
                    The sticky element should remain at the top of the scrollable area.
                  </p>
                </div>
              ))}

              {/* Floating action button simulation */}
              <div style={{
                position: 'relative',
                height: '200px',
                background: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef',
                padding: '1rem'
              }}>
                <h5>Relative Positioning Container</h5>
                <p>This container demonstrates how absolutely positioned elements work within modal content.</p>

                <div style={{
                  position: 'absolute',
                  bottom: '15px',
                  right: '15px',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#28a745',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}>
                  ➕
                </div>
              </div>

              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                background: '#fff3cd',
                border: '1px solid #ffeaa7',
                borderRadius: '6px'
              }}>
                <strong>📍 Positioning Features:</strong>
                <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
                  <li>Sticky elements work within modal scroll context</li>
                  <li>Absolute positioning relative to modal content</li>
                  <li>Z-index stacking respects modal context</li>
                  <li>Fixed elements position correctly within modal bounds</li>
                  <li>No interference with modal backdrop or chrome</li>
                </ul>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => setFixedElementsOpen(false)}
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

        {/* Iframe Modal */}
        <Modal id="iframe-modal" open={iframeModalOpen} onOpenChange={setIframeModalOpen}>
          <Modal.Content size="md">
            <Modal.Header>
              <Modal.Title>🌐 Iframe & Embedded Content</Modal.Title>
              <Modal.Description>
                Testing external content embedding
              </Modal.Description>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <div style={{ marginBottom: '1rem' }}>
                <h4>Embedded Content Handling</h4>
                <p>Testing how Modal.Body handles iframes and embedded external content.</p>
              </div>

              {/* Iframe placeholder */}
              <div style={{
                width: '100%',
                height: '300px',
                border: '2px dashed #ccc',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f8f9fa',
                marginBottom: '1rem'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌐</div>
                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Iframe Placeholder</div>
                <div style={{ fontSize: '0.9rem', color: '#666', textAlign: 'center', maxWidth: '300px' }}>
                  In a real implementation, this would be an embedded iframe or external widget
                </div>
              </div>

              {/* Embedded widget simulation */}
              <div style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                overflow: 'hidden',
                marginBottom: '1rem'
              }}>
                <div style={{
                  background: '#007bff',
                  color: 'white',
                  padding: '0.75rem 1rem',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  📊 Embedded Widget Header
                </div>
                <div style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold'
                    }}>
                      42%
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Performance Metric</div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>Current month progress</div>
                    </div>
                  </div>

                  <div style={{ height: '4px', background: '#e9ecef', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{
                      width: '42%',
                      height: '100%',
                      background: 'linear-gradient(90deg, #667eea, #764ba2)',
                      borderRadius: '2px'
                    }} />
                  </div>
                </div>
              </div>

              <div style={{
                padding: '1rem',
                background: '#e7f3ff',
                borderRadius: '6px',
                border: '1px solid #b3d7ff'
              }}>
                <strong>🔗 Embedded Content Features:</strong>
                <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
                  <li>Proper iframe sizing and aspect ratio maintenance</li>
                  <li>External widget integration without layout issues</li>
                  <li>Scroll isolation between modal and embedded content</li>
                  <li>Security considerations for external content</li>
                  <li>Responsive behavior for embedded elements</li>
                </ul>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => setIframeModalOpen(false)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#dc3545',
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

      {/* Add pulse animation for the data viz demo */}
      <style>{`
        @keyframes pulse {
          from { opacity: 0.4; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </ModalSystem>
  );
}