import { Modal } from "@/Modal";
import "./TableContentModal.scss";

interface TableContentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TableContentModal({
  open,
  onOpenChange,
}: TableContentModalProps) {
  const handleTableAction = (userId: number, action: string) => {
    console.log(`Table action "${action}" for user ${userId}`);
    alert(`Action "${action}" performed for User ${userId}`);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Modal id={TableContentModal.id} open={open} onOpenChange={onOpenChange}>
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>Table Content Test</Modal.Title>
          <Modal.Description>
            Testing horizontal overflow prevention and table scrolling
          </Modal.Description>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <div className="table-intro">
            <strong className="table-intro__title">
              📊 Testing horizontal overflow:
            </strong>
            <p className="table-intro__description">
              The table below should never cause horizontal scrolling in the
              modal. Try clicking the action buttons to test interactivity.
            </p>
          </div>

          <div className="table-container">
            <table className="table">
              <thead className="table-head">
                <tr>
                  <th className="table-header">Name</th>
                  <th className="table-header">Email</th>
                  <th className="table-header">Role</th>
                  <th className="table-header">Department</th>
                  <th className="table-header">Start Date</th>
                  <th className="table-header">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 20 }, (_, i) => (
                  <tr key={i} className="table-row">
                    <td className="table-cell">User {i + 1}</td>
                    <td className="table-cell">user{i + 1}@example.com</td>
                    <td className="table-cell">
                      {i % 3 === 0
                        ? "Manager"
                        : i % 3 === 1
                        ? "Developer"
                        : "Designer"}
                    </td>
                    <td className="table-cell">
                      {i % 4 === 0
                        ? "Engineering"
                        : i % 4 === 1
                        ? "Design"
                        : i % 4 === 2
                        ? "Marketing"
                        : "Operations"}
                    </td>
                    <td className="table-cell">
                      2024-{String(Math.floor(i / 2) + 1).padStart(2, "0")}-
                      {String((i % 28) + 1).padStart(2, "0")}
                    </td>
                    <td className="table-cell">
                      <div style={{ display: "flex", gap: "0.25rem" }}>
                        <button
                          onClick={() => handleTableAction(i + 1, "view")}
                          className="table-button"
                          title={`View User ${i + 1}`}
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleTableAction(i + 1, "edit")}
                          className="table-button"
                          title={`Edit User ${i + 1}`}
                          style={{ background: "#28a745" }}
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-summary">
            <h4 className="table-summary__title">Summary</h4>
            <p className="table-summary__text">
              This table demonstrates proper horizontal overflow handling within
              the modal body. The table scrolls horizontally when needed, but
              never breaks the modal layout. All buttons are fully interactive -
              try clicking "View" or "Edit" on any row.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button size="small" onClick={handleClose} variant="primary">
            Export Data
          </Modal.Button>
          <Modal.Button size="small" onClick={handleClose} variant="secondary">
            Close
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

TableContentModal.id = "table-content";
TableContentModal.Trigger = function TableContentModalTrigger({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Modal.Button onClick={() => onOpenChange(true)} variant="secondary">
      Test Table Content
    </Modal.Button>
  );
};
