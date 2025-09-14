import React from 'react';
import { ModalSystem } from './ModalSystem';
import { useModalContext } from './ModalProvider';

// Example component that demonstrates ModalSystem usage
const ModalSystemExample: React.FC = () => {
  return (
    <ModalSystem baseZIndex={1000}>
      <div style={{ padding: '20px' }}>
        <h1>Modal System Example</h1>
        <p>This demonstrates the basic ModalSystem setup.</p>
        <ContextConsumer />
      </div>
    </ModalSystem>
  );
};

// Component that consumes the modal context
const ContextConsumer: React.FC = () => {
  const modalContext = useModalContext();
  
  return (
    <div style={{ 
      padding: '16px', 
      border: '1px solid #ccc', 
      borderRadius: '8px',
      marginTop: '16px'
    }}>
      <h3>Modal Context Status</h3>
      <p>Base Z-Index: {modalContext.baseZIndex}</p>
      <p>Open Modals: {modalContext.stack.length}</p>
      <p>Registered Modals: {Object.keys(modalContext.registry).length}</p>
    </div>
  );
};

export { ModalSystemExample };