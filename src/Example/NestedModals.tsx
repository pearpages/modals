import { MockModal } from "./MockModal";
import { MockModalTrigger } from "./MockModalTrigger";

export function NestedModals({ registry }: { registry: Record<string, { stackIndex: number }> }) {
  return (
    <div
      style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}
    >
      <h4>📚 Use Case 3: Modal Stacking</h4>
      <p style={{ fontSize: "0.9em", color: "#666" }}>
        Demonstrates modal stacking and z-index management.
      </p>

      <MockModalTrigger target="parent-modal">
        <button
          style={{
            background: "#28a745",
            color: "white",
            border: "none",
            padding: "0.75rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Open Parent Modal
        </button>
      </MockModalTrigger>

      <MockModal id="parent-modal">
        <h3 style={{ margin: "0 0 1rem 0" }}>🔗 Parent Modal</h3>
        <p>This modal can open another modal on top of it.</p>

        <MockModalTrigger target="child-modal">
          <button
            style={{
              background: "#ffc107",
              color: "#212529",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "1rem",
            }}
          >
            Open Child Modal
          </button>
        </MockModalTrigger>
      </MockModal>

      <MockModal id="child-modal">
        <h3 style={{ margin: "0 0 1rem 0" }}>👶 Child Modal</h3>
        <p>This modal is stacked on top of the parent modal.</p>
        <div style={{ fontSize: "0.9em", color: "#666" }}>
          <strong>Stack Position:</strong>{" "}
          {registry["child-modal"]?.stackIndex + 1 || 0}
        </div>
      </MockModal>
    </div>
  );
}
