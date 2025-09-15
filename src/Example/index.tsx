import React from 'react';
import { ModalSystem } from '../ModalSystem';
import { ModalExamples } from './ModalExamples';
import { ModalTriggerDemo } from './ModalTriggerDemo';
import { Modal } from '../Modal';
import './index.scss';

/**
 * Example component showcasing the Modal Library in action
 * 
 * Demonstrates practical usage of:
 * ✅ Task 1: API contracts & IDs - Complete type definitions
 * ✅ Task 2: ModalSystem wrapper - Functional state management
 * ✅ Task 7: Modal.Content with sizes - Full implementation
 * 
 * Real usage examples:
 * - ModalSystem setup and configuration
 * - Modal state management through context
 * - Multiple modal instances and stacking
 * - Modal.Content with different sizes and animations
 * - SSR-safe behavior demonstration
 */

export const Example: React.FC = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>🧩 Modal Library - Live Examples</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ 
          background: '#d4edda', 
          padding: '1rem', 
          borderRadius: '6px',
          border: '1px solid #c3e6cb'
        }}>
          <strong>✅ Tasks 1-7 Complete:</strong> Full Modal.Content implementation with sizes, animations, and subcomponents
        </div>
      </div>

      {/* Modal.Content Showcase */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>🎨 Modal.Content Examples</h2>
        <ModalContentShowcase />
      </div>

      {/* Separate ModalTrigger demo */}
      <div style={{ marginBottom: '2rem' }}>
        <ModalTriggerDemo />
      </div>

      <ModalSystem>
        <ModalExamples />
      </ModalSystem>
    </div>
  );
};

/**
 * Showcase component demonstrating Modal.Content with different sizes
 */
const ModalContentShowcase: React.FC = () => {
  const [autoModalOpen, setAutoModalOpen] = React.useState(false);
  const [mdModalOpen, setMdModalOpen] = React.useState(false);
  const [fullModalOpen, setFullModalOpen] = React.useState(false);
  const [customModalOpen, setCustomModalOpen] = React.useState(false);
  const [noBackdropModalOpen, setNoBackdropModalOpen] = React.useState(false);

  return (
    <ModalSystem>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setAutoModalOpen(true)}
          style={{ padding: '0.75rem 1rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Auto Size Modal
        </button>
        
        <button 
          onClick={() => setMdModalOpen(true)}
          style={{ padding: '0.75rem 1rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Medium Modal
        </button>
        
        <button 
          onClick={() => setFullModalOpen(true)}
          style={{ padding: '0.75rem 1rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Full Screen Modal
        </button>
        
        <button 
          onClick={() => setCustomModalOpen(true)}
          style={{ padding: '0.75rem 1rem', background: '#6f42c1', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Custom Styled Modal
        </button>
        
        <button 
          onClick={() => setNoBackdropModalOpen(true)}
          style={{ padding: '0.75rem 1rem', background: '#fd7e14', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          No Backdrop Close Modal
        </button>
      </div>

      {/* Auto Size Modal */}
      <Modal id="auto-modal" open={autoModalOpen} onOpenChange={setAutoModalOpen}>
        <Modal.Content size="auto">
          <Modal.Header>
            <Modal.Title>Auto Size Modal</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          
          <div style={{ padding: '1rem' }}>
            <p>This modal automatically sizes to fit its content. Perfect for alerts, confirmations, or small forms.</p>
            <p>The modal will never be larger than necessary.</p>
          </div>
          
          <Modal.Footer>
            <button 
              onClick={() => setAutoModalOpen(false)}
              style={{ padding: '0.5rem 1rem', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {/* Medium Modal */}
      <Modal id="md-modal" open={mdModalOpen} onOpenChange={setMdModalOpen}>
        <Modal.Content size="md">
          <Modal.Header>
            <Modal.Title>Medium Modal</Modal.Title>
            <Modal.Description>
              A standard-sized modal for most use cases
            </Modal.Description>
            <Modal.Close />
          </Modal.Header>
          
          <div style={{ padding: '1rem' }}>
            <p>This is the default medium size modal, perfect for:</p>
            <ul>
              <li>Forms with multiple fields</li>
              <li>Content that needs more space</li>
              <li>Tables or lists</li>
              <li>Settings panels</li>
            </ul>
            
            <form style={{ marginTop: '1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name:</label>
                <input 
                  type="text" 
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                  placeholder="Enter your name"
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email:</label>
                <input 
                  type="email" 
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                  placeholder="Enter your email"
                />
              </div>
            </form>
          </div>
          
          <Modal.Footer>
            <button 
              onClick={() => setMdModalOpen(false)}
              style={{ padding: '0.5rem 1rem', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '0.5rem' }}
            >
              Cancel
            </button>
            <button 
              onClick={() => setMdModalOpen(false)}
              style={{ padding: '0.5rem 1rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Save
            </button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {/* Full Screen Modal */}
      <Modal id="full-modal" open={fullModalOpen} onOpenChange={setFullModalOpen}>
        <Modal.Content size="full">
          <Modal.Header>
            <Modal.Title>Full Screen Modal</Modal.Title>
            <Modal.Description>
              Takes up the entire viewport for immersive experiences
            </Modal.Description>
            <Modal.Close />
          </Modal.Header>
          
          <div style={{ padding: '2rem', flex: 1, overflow: 'auto' }}>
            <h3>Dashboard Overview</h3>
            <p>Full screen modals are perfect for:</p>
            
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginTop: '2rem' }}>
              <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef' }}>
                <h4>Analytics</h4>
                <p>View detailed analytics and reports with plenty of space for charts and graphs.</p>
              </div>
              
              <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef' }}>
                <h4>Settings Panel</h4>
                <p>Complex configuration interfaces with multiple tabs and sections.</p>
              </div>
              
              <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef' }}>
                <h4>Data Tables</h4>
                <p>Large datasets that need maximum screen real estate for optimal viewing.</p>
              </div>
              
              <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef' }}>
                <h4>Media Viewers</h4>
                <p>Image galleries, video players, or document viewers benefit from full screen.</p>
              </div>
            </div>
          </div>
          
          <Modal.Footer>
            <button 
              onClick={() => setFullModalOpen(false)}
              style={{ padding: '0.75rem 2rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Exit Full Screen
            </button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {/* Custom Styled Modal */}
      <Modal id="custom-modal" open={customModalOpen} onOpenChange={setCustomModalOpen}>
        <Modal.Content 
          size="md" 
          className="custom-purple-modal"
          style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none'
          }}
        >
          <Modal.Header style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
            <Modal.Title>Custom Styled Modal</Modal.Title>
            <Modal.Description style={{ color: 'rgba(255,255,255,0.8)' }}>
              Demonstrates custom styling capabilities
            </Modal.Description>
            <Modal.Close style={{ color: 'white' }} />
          </Modal.Header>
          
          <div style={{ padding: '2rem' }}>
            <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Beautiful Custom Design</h3>
            <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.6' }}>
              Modal.Content accepts custom className and style props, allowing you to create 
              stunning custom designs while maintaining all the accessibility and behavior features.
            </p>
            
            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1rem', 
              background: 'rgba(255,255,255,0.1)', 
              borderRadius: '8px',
              backdropFilter: 'blur(10px)'
            }}>
              <strong>Features demonstrated:</strong>
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                <li>Custom gradient background</li>
                <li>Custom typography and colors</li>
                <li>Backdrop blur effects</li>
                <li>Maintained accessibility</li>
                <li>Full animation support</li>
              </ul>
            </div>
          </div>
          
          <Modal.Footer style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <button 
              onClick={() => setCustomModalOpen(false)}
              style={{ 
                padding: '0.75rem 1.5rem', 
                background: 'rgba(255,255,255,0.2)', 
                color: 'white', 
                border: '1px solid rgba(255,255,255,0.3)', 
                borderRadius: '6px', 
                cursor: 'pointer',
                backdropFilter: 'blur(10px)'
              }}
            >
              Amazing! Close Modal
            </button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {/* No Backdrop Close Modal */}
      <Modal id="no-backdrop-modal" open={noBackdropModalOpen} onOpenChange={setNoBackdropModalOpen}>
        <Modal.Content size="md" closeOnBackdrop={false}>
          <Modal.Header>
            <Modal.Title>🚫 No Backdrop Close</Modal.Title>
            <Modal.Description>
              This modal won't close when you click the backdrop
            </Modal.Description>
            <Modal.Close />
          </Modal.Header>
          
          <div style={{ padding: '2rem' }}>
            <div style={{ 
              padding: '1rem', 
              background: '#fff3cd', 
              border: '1px solid #ffeaa7', 
              borderRadius: '6px', 
              marginBottom: '1rem' 
            }}>
              <strong>🎯 Try this:</strong> Click outside this modal (on the backdrop) - it won't close!
            </div>
            
            <p>This demonstrates the <code>closeOnBackdrop={false}</code> configuration.</p>
            
            <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
              <li>✅ Close button still works</li>
              <li>✅ Escape key still works (unless disabled)</li>
              <li>❌ Backdrop clicks are ignored</li>
            </ul>
            
            <div style={{ 
              marginTop: '1.5rem',
              padding: '1rem',
              background: '#f8f9fa',
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '0.9em'
            }}>
              {'<Modal.Content closeOnBackdrop={false}>'}
            </div>
          </div>
          
          <Modal.Footer>
            <button 
              onClick={() => setNoBackdropModalOpen(false)}
              style={{ 
                padding: '0.75rem 1.5rem', 
                background: '#fd7e14', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }}
            >
              Close Modal (Button Works!)
            </button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </ModalSystem>
  );
};

// Export individual demos for direct usage
export { ModalTriggerDemo };
