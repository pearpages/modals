import React from 'react';
import { Modal } from '../Modal';
import { ModalSystem } from '../ModalSystem';

/**
 * Simple demonstration of Modal.Trigger functionality
 * This shows the new Modal.Trigger component working with the modal system
 */
export function ModalTriggerDemo() {
  return (
    <ModalSystem>
      <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        <h2>✨ Modal.Trigger Demo</h2>
        <p>Task 6 implementation: <code>&lt;Modal.Trigger /&gt;</code> sugar component</p>
        
        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', maxWidth: '400px' }}>
          
          {/* Basic trigger */}
          <div>
            <h3>Basic Trigger</h3>
            <Modal.Trigger target="basic-modal">
              Open Basic Modal
            </Modal.Trigger>
          </div>
          
          {/* asChild trigger */}
          <div>
            <h3>asChild Pattern</h3>
            <Modal.Trigger target="custom-modal" asChild>
              <button style={{ 
                background: '#007bff', 
                color: 'white', 
                border: 'none', 
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Custom Styled Button
              </button>
            </Modal.Trigger>
          </div>

          {/* Disabled trigger */}
          <div>
            <h3>Disabled Trigger</h3>
            <Modal.Trigger target="disabled-modal" disabled>
              Disabled Button (Won't Open)
            </Modal.Trigger>
          </div>
        </div>

        {/* Modal definitions */}
        <Modal id="basic-modal">
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            maxWidth: '400px',
            margin: '2rem auto'
          }}>
            <h3>Basic Modal</h3>
            <p>This modal was opened with <code>Modal.Trigger</code>!</p>
            <p>Features demonstrated:</p>
            <ul>
              <li>✅ Click to open</li>
              <li>✅ Keyboard accessibility (Enter/Space)</li>
              <li>✅ Target modal resolution</li>
            </ul>
            <button onClick={() => console.log('Close clicked')} style={{
              background: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Close
            </button>
          </div>
        </Modal>

        <Modal id="custom-modal">
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            maxWidth: '400px',
            margin: '2rem auto'
          }}>
            <h3>Custom Modal</h3>
            <p>This modal was opened with the <code>asChild</code> pattern!</p>
            <p>The trigger was a custom styled button that preserved its original styles.</p>
          </div>
        </Modal>

        <Modal id="disabled-modal">
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            maxWidth: '400px',
            margin: '2rem auto'
          }}>
            <h3>This shouldn't be visible</h3>
            <p>The disabled trigger should prevent this modal from opening.</p>
          </div>
        </Modal>
      </div>
    </ModalSystem>
  );
}