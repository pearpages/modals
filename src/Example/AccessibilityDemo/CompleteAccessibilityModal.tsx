import React, { useState } from "react";
import { Modal } from "@/Modal";
import { useModalStack } from "@/index";
import { Box } from "../Box";

export function CompleteAccessibilityModal() {
  const modals = useModalStack();
  const [deleteText, setDeleteText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCancel = () => {
    modals.close("accessibility-complete");
    setDeleteText("");
  };

  const handleDelete = async () => {
    if (deleteText !== "DELETE") {
      alert("Please type DELETE to confirm");
      return;
    }

    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

    alert("Account deleted successfully! (This is just a demo)");
    modals.close("accessibility-complete");
    setDeleteText("");
    setIsDeleting(false);
  };

  const body = (
    <>
      <Box variant="danger" title="⚠️ Warning: ">
        This will permanently delete your account and all associated data. This
        action cannot be reversed.
      </Box>

      <p>
        To confirm deletion, type <strong>"DELETE"</strong> in the field below:
      </p>

      <input
        type="text"
        placeholder="Type DELETE to confirm"
        className="accessibility-demo__input"
        value={deleteText}
        onChange={(e) => setDeleteText(e.target.value)}
        disabled={isDeleting}
      />

      <br />
      <br />

      <Box variant="success" title="🔍 Inspect this modal:">
        <ul>
          <li>
            Modal.Content has <code>aria-labelledby</code> pointing to title
          </li>
          <li>
            Modal.Content has <code>aria-describedby</code> pointing to
            description
          </li>
          <li>Screen readers will announce both title and description</li>
        </ul>
      </Box>
    </>
  );

  return (
    <Modal id="accessibility-complete">
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Delete Account</Modal.Title>
          <Modal.Description>
            This action cannot be undone. All your data will be permanently
            deleted.
          </Modal.Description>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Modal.Button
            variant="secondary"
            onClick={handleCancel}
            disabled={isDeleting}
          >
            Cancel
          </Modal.Button>
          <Modal.Button
            variant="danger"
            onClick={handleDelete}
            disabled={isDeleting || deleteText !== "DELETE"}
            loading={isDeleting}
          >
            Delete Account
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

const Trigger = () => (
  <Modal.Trigger target="accessibility-complete" asChild>
    <Modal.Button variant="success" size="small">
      Complete Accessibility
    </Modal.Button>
  </Modal.Trigger>
);

CompleteAccessibilityModal.Trigger = Trigger;
