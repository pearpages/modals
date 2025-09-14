import { MockModal } from "./MockModal";
import { MockModalTrigger } from "./MockModalTrigger";

export function ActionDemo() {
  return (
    <div
      style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}
    >
      <h4>⚡ Use Case 4: Dismiss Behavior</h4>
      <p style={{ fontSize: "0.9em", color: "#666" }}>
        Test different dismiss configurations.
      </p>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <MockModalTrigger target="no-backdrop-close">
          <button
            style={{
              background: "#6f42c1",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.8em",
            }}
          >
            No Backdrop Close
          </button>
        </MockModalTrigger>

        <MockModalTrigger target="no-escape-close">
          <button
            style={{
              background: "#dc3545",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.8em",
            }}
          >
            No Escape Close
          </button>
        </MockModalTrigger>

        <MockModalTrigger target="custom-dismiss">
          <button
            style={{
              background: "#28a745",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.8em",
            }}
          >
            Custom Dismiss
          </button>
        </MockModalTrigger>
      </div>

      <MockModal id="no-backdrop-close" closeOnBackdrop={false}>
        <h3 style={{ margin: "0 0 1rem 0" }}>🚫 No Backdrop Close</h3>
        <p>This modal won't close when you click the backdrop. Try it!</p>
        <p style={{ fontSize: "0.9em", color: "#666" }}>
          closeOnBackdrop={false}
        </p>
      </MockModal>

      <MockModal id="no-escape-close" closeOnEscape={false}>
        <h3 style={{ margin: "0 0 1rem 0" }}>⌨️ No Escape Close</h3>
        <p>This modal won't close when you press Escape. Try it!</p>
        <p style={{ fontSize: "0.9em", color: "#666" }}>
          closeOnEscape={false}
        </p>
      </MockModal>

      <MockModal
        id="custom-dismiss"
        onInteractOutside={(e) => {
          const shouldPrevent = confirm(
            "Are you sure you want to close this modal?"
          );
          if (!shouldPrevent) {
            e.preventDefault();
          }
        }}
      >
        <h3 style={{ margin: "0 0 1rem 0" }}>❓ Custom Dismiss</h3>
        <p>
          This modal asks for confirmation before closing via backdrop or
          escape.
        </p>
        <p style={{ fontSize: "0.9em", color: "#666" }}>
          onInteractOutside with confirmation
        </p>
      </MockModal>
    </div>
  );
}
