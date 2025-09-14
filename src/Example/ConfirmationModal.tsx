import { MockModal } from "./MockModal";
import { MockModalTrigger } from "./MockModalTrigger";

export function ConfirmationModal({
  demoData,
}: {
  demoData: { userCount: number; lastAction: string };
}) {
  return (
    <div
      style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}
    >
      <h4>💡 Use Case 1: Confirmation Dialog</h4>
      <p style={{ fontSize: "0.9em", color: "#666" }}>
        Classic confirmation pattern for destructive actions.
      </p>

      <MockModalTrigger target="confirm-delete">
        <button
          style={{
            background: "#dc3545",
            color: "white",
            border: "none",
            padding: "0.75rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Delete User Account
        </button>
      </MockModalTrigger>

      <MockModal id="confirm-delete">
        <h3 style={{ margin: "0 0 1rem 0", color: "#dc3545" }}>
          ⚠️ Confirm Deletion
        </h3>
        <p>
          Are you sure you want to delete this user account? This action cannot
          be undone.
        </p>
        <div style={{ marginTop: "1rem" }}>
          <strong>Current Users:</strong> {demoData.userCount}
        </div>
      </MockModal>
    </div>
  );
}
