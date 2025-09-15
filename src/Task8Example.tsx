import React, { useState } from 'react';
import { Modal, ModalSystem } from './index';

/**
 * Example demonstrating Task 8 implementation:
 * Header/Title/Description/Close/Footer subcomponents with accessibility
 */
export const Task8Example: React.FC = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <ModalSystem>
      <div style={{ padding: '2rem' }}>
        <h1>Task 8: Modal Subcomponents</h1>
        
        <p>This example demonstrates the implemented subcomponents with accessibility features:</p>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button onClick={() => setShowConfirm(true)}>
            Show Confirmation Modal
          </button>
          
          <button onClick={() => setShowInfo(true)}>
            Show Info Modal
          </button>
        </div>

        {/* Confirmation Modal */}
        <Modal id="confirm-modal" open={showConfirm} onOpenChange={setShowConfirm}>
          <Modal.Content size="md">
            <Modal.Header>
              <Modal.Title>Delete Confirmation</Modal.Title>
              <Modal.Close />
            </Modal.Header>
            
            <Modal.Description>
              Are you sure you want to delete this item? This action cannot be undone.
            </Modal.Description>
            
            <div style={{ padding: '1rem' }}>
              <p>Additional content can go here between description and footer.</p>
            </div>
            
            <Modal.Footer>
              <button 
                onClick={() => setShowConfirm(false)}
                style={{ marginRight: '0.5rem' }}
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowConfirm(false);
                  alert('Item deleted!');
                }}
                style={{ backgroundColor: '#dc3545', color: 'white' }}
              >
                Delete
              </button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        {/* Info Modal */}
        <Modal id="info-modal" open={showInfo} onOpenChange={setShowInfo}>
          <Modal.Content size="md">
            <Modal.Header>
              <Modal.Title>Information</Modal.Title>
              <Modal.Close />
            </Modal.Header>
            
            <Modal.Description>
              This modal demonstrates the accessibility features implemented in Task 8.
            </Modal.Description>
            
            <div style={{ padding: '1rem' }}>
              <h3>Features demonstrated:</h3>
              <ul>
                <li>✅ Modal.Title automatically generates ID and links to dialog via aria-labelledby</li>
                <li>✅ Modal.Description automatically generates ID and links to dialog via aria-describedby</li>
                <li>✅ Modal.Close triggers proper close behavior for both controlled and uncontrolled modes</li>
                <li>✅ Modal.Header and Modal.Footer provide layout slots</li>
                <li>✅ All components support asChild pattern for customization</li>
                <li>✅ Comprehensive test coverage with accessibility integration tests</li>
              </ul>
              
              <p>
                <strong>Inspect the DOM:</strong> The dialog element should have 
                aria-labelledby pointing to the title ID and aria-describedby pointing 
                to the description ID.
              </p>
            </div>
            
            <Modal.Footer>
              <button onClick={() => setShowInfo(false)}>
                Got it!
              </button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </div>
    </ModalSystem>
  );
};