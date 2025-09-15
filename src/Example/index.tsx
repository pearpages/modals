import React from 'react';
import { ModalSystem } from '../ModalSystem';
import { ModalExamples } from './ModalExamples';
import { ModalTriggerDemo } from './ModalTriggerDemo';
import './index.scss';

/**
 * Example component showcasing the Modal Library in action
 * 
 * Demonstrates practical usage of:
 * ✅ Task 1: API contracts & IDs - Complete type definitions
 * ✅ Task 2: ModalSystem wrapper - Functional state management
 * 
 * Real usage examples:
 * - ModalSystem setup and configuration
 * - Modal state management through context
 * - Multiple modal instances and stacking
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
          <strong>✅ Tasks 1-6 Complete:</strong> API contracts, ModalSystem, ModalProvider, ModalRoot, Modal, and Modal.Trigger implemented
        </div>
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

// Export individual demos for direct usage
export { ModalTriggerDemo };
