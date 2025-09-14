import { MockModal } from "./MockModal";
import { MockModalTrigger } from "./MockModalTrigger";

export function InteractiveActions({ setDemoData }:{ setDemoData: any }) {
  return (
    <div
      style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}
    >
      <h4>⚡ Use Case 5: Interactive Actions</h4>
      <p style={{ fontSize: "0.9em", color: "#666" }}>
        Modal with actions that update parent state.
      </p>

      <MockModalTrigger target="action-modal">
        <button
          style={{
            background: "#6f42c1",
            color: "white",
            border: "none",
            padding: "0.75rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Perform Actions
        </button>
      </MockModalTrigger>

      <MockModal id="action-modal">
        <h3 style={{ margin: "0 0 1rem 0" }}>🎯 Action Center</h3>
        <p>Choose an action to perform:</p>

        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginTop: "1rem",
          }}
        >
          <button
            onClick={() => {
              setDemoData((prev: { userCount: number; }) => ({
                ...prev,
                userCount: prev.userCount + 1,
                lastAction: "Added user",
              }));
            }}
            style={{
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #28a745",
              background: "#f8f9fa",
            }}
          >
            Add User (+1)
          </button>
          <button
            onClick={() => {
              setDemoData((prev: { userCount: number; }) => ({
                ...prev,
                userCount: Math.max(0, prev.userCount - 1),
                lastAction: "Removed user",
              }));
            }}
            style={{
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #dc3545",
              background: "#f8f9fa",
            }}
          >
            Remove User (-1)
          </button>
          <button
            onClick={() => {
              setDemoData((prev: any) => ({
                ...prev,
                userCount: 0,
                lastAction: "Reset all",
              }));
            }}
            style={{
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #6c757d",
              background: "#f8f9fa",
            }}
          >
            Reset All
          </button>
        </div>
      </MockModal>
    </div>
  );
}
