import { MockModal } from "./MockModal";
import { MockModalTrigger } from "./MockModalTrigger";

export function InfoModal({ demoData, stack }: { demoData: { userCount: number; lastAction: string }; stack: string[] }) {
    return (       
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem' }}>
          <h4>📋 Use Case 2: Information Display</h4>
          <p style={{ fontSize: '0.9em', color: '#666' }}>
            Simple content display with automatic sizing.
          </p>
          
          <MockModalTrigger target="user-info">
            <button style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              View System Info
            </button>
          </MockModalTrigger>

          <MockModal id="user-info">
            <h3 style={{ margin: '0 0 1rem 0' }}>ℹ️ System Information</h3>
            <div style={{ fontSize: '0.9em' }}>
              <div><strong>Total Users:</strong> {demoData.userCount}</div>
              <div><strong>Last Action:</strong> {demoData.lastAction}</div>
              <div><strong>Modal Stack:</strong> {stack.length} modals</div>
              <div><strong>Server Status:</strong> ✅ Online</div>
            </div>
          </MockModal>
        </div>)
}