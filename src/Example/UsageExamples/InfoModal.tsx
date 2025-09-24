import { Demo } from "../Demo";
import { MockModal } from "../MockModal";
import { MockModalTrigger } from "../MockModalTrigger";

export function InfoModal({
  demoData,
  stack,
}: {
  demoData: { userCount: number; lastAction: string };
  stack: string[];
}) {
  return (
    <Demo
      title="📋 Use Case 2: Information Display"
      description="Simple content display with automatic sizing."
      defaultExpanded={false}
    >
      <MockModalTrigger target="user-info">
        <button
          style={{
            background: "#007bff",
            color: "white",
            border: "none",
            padding: "0.75rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          View System Info
        </button>
      </MockModalTrigger>

      <MockModal id="user-info">
        <h3 style={{ margin: "0 0 1rem 0" }}>ℹ️ System Information</h3>
        <div style={{ fontSize: "0.9em" }}>
          <div>
            <strong>Total Users:</strong> {demoData.userCount}
          </div>
          <div>
            <strong>Last Action:</strong> {demoData.lastAction}
          </div>
          <div>
            <strong>Modal Stack:</strong> {stack.length} modals
          </div>
          <div>
            <strong>Server Status:</strong> ✅ Online
          </div>
        </div>
      </MockModal>
    </Demo>
  );
}
