import { useState } from 'react';
import { useModalContext } from '@/ModalProvider';
import { ConfirmationModal } from './ConfirmationModal';
import { InfoModal } from './InfoModal';
import { NestedModals } from './NestedModals';
import { ActionDemo } from './ActionDemo';
import { InteractiveActions } from './InteractiveActions';

const ModalExamples: React.FC = () => {
  const { registry, stack } = useModalContext();
  const [demoData, setDemoData] = useState({ userCount: 42, lastAction: 'None' });

  return (
    <div style={{ padding: '1rem' }}>
      <h2>🚀 Modal Library Usage Examples</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>📊 Modal System State</h3>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '1rem', 
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '0.9em'
        }}>
          <div><strong>Active Stack:</strong> [{stack.join(', ') || 'empty'}]</div>
          <div><strong>Registered Modals:</strong> {Object.keys(registry).length}</div>
          <div><strong>Open Modals:</strong> {Object.values(registry).filter(m => m.open).length}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <ConfirmationModal demoData={demoData} />
        <InfoModal demoData={demoData} stack={stack} />
        <NestedModals registry={registry} />
        <ActionDemo />
        <InteractiveActions setDemoData={setDemoData} />
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#e7f3ff', borderRadius: '6px' }}>
        <h4>🔧 Implementation Status</h4>
        <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
          <li>✅ <strong>ModalSystem:</strong> Functional provider + portal setup</li>
          <li>✅ <strong>Context API:</strong> State management and modal registry</li>
          <li>✅ <strong>Modal Stacking:</strong> Z-index calculation and stack management</li>
          <li>✅ <strong>SSR Safety:</strong> Client-side only rendering</li>
          <li>🚧 <strong>Coming Next:</strong> Real Modal, ModalTrigger, and Modal.Content components</li>
        </ul>
      </div>
    </div>
  );
};

export { ModalExamples };
