import { useState } from "react";
import { Modal } from "@/Modal";
import { ModalTrigger } from "@/ModalTrigger";
import { useModalStack } from "@/ModalProvider";
import "./index.scss";
import { Demo } from "@/Example/Demo";

function CompleteAccessibilityModal() {
  const modals = useModalStack();
  const [deleteText, setDeleteText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCancel = () => {
    modals.close("accessibility-complete");
    setDeleteText(""); // Reset form when canceling
  };

  const handleDelete = async () => {
    if (deleteText !== "DELETE") {
      alert("Please type DELETE to confirm");
      return;
    }

    setIsDeleting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    alert("Account deleted successfully! (This is just a demo)");
    modals.close("accessibility-complete");
    setDeleteText("");
    setIsDeleting(false);
  };

  const body = (
    <>
      <div className="accessibility-demo__warning-box">
        <strong>⚠️ Warning:</strong> This will permanently delete your account
        and all associated data. This action cannot be reversed.
      </div>

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

      <div className="accessibility-demo__info-box">
        <strong>🔍 Inspect this modal:</strong>
        <ul className="accessibility-demo__list">
          <li>
            Modal.Content has <code>aria-labelledby</code> pointing to title
          </li>
          <li>
            Modal.Content has <code>aria-describedby</code> pointing to
            description
          </li>
          <li>Screen readers will announce both title and description</li>
        </ul>
      </div>
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

function TitleOnlyModal() {
  const modals = useModalStack();

  const handleGotIt = () => {
    modals.close("accessibility-title-only");
  };

  const body = (
    <>
      <p>
        This modal only has a title, no description. The Modal.Content will have{" "}
        <code>aria-labelledby</code> but no <code>aria-describedby</code>.
      </p>
      <div className="accessibility-demo__info-box">
        <strong>🔍 Check the attributes:</strong>
        <ul className="accessibility-demo__list">
          <li>
            <code>aria-labelledby</code> will point to Modal.Title
          </li>
          <li>
            <code>aria-describedby</code> will be undefined (no description)
          </li>
          <li>This is perfectly valid - description is optional</li>
        </ul>
      </div>
    </>
  );
  return (
    <Modal id="accessibility-title-only">
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Simple Notification</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="primary" onClick={handleGotIt}>
            Got it!
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

function CustomIdsModal() {
  const modals = useModalStack();

  const handlePerfect = () => {
    modals.close("accessibility-custom-ids");
  };

  const body = (
    <>
      <p>
        You can provide custom IDs to Modal.Title and Modal.Description if
        needed. The aria linking will work with your custom IDs.
      </p>

      <div className="accessibility-demo__info-box">
        <strong>🔍 Custom IDs in use:</strong>
        <ul className="accessibility-demo__list">
          <li>
            Modal.Title: <code>id="custom-title-id"</code>
          </li>
          <li>
            Modal.Description: <code>id="custom-desc-id"</code>
          </li>
          <li>
            Modal.Content: <code>aria-labelledby="custom-title-id"</code>
          </li>
          <li>
            Modal.Content: <code>aria-describedby="custom-desc-id"</code>
          </li>
        </ul>
      </div>
    </>
  );
  return (
    <Modal id="accessibility-custom-ids">
      <Modal.Content>
        <Modal.Header>
          <Modal.Title id="custom-title-id">Custom ID Example</Modal.Title>
          <Modal.Description id="custom-desc-id">
            This modal uses custom IDs for title and description elements.
          </Modal.Description>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="success" onClick={handlePerfect}>
            Perfect!
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

const FeatureBox = () => (
  <div className="accessibility-demo__feature-box">
    <strong>✅ Accessibility Features Implemented:</strong>
    <ul className="accessibility-demo__list">
      <li>
        <code>role="dialog"</code> on Modal.Content
      </li>
      <li>
        <code>aria-modal="true"</code>
      </li>
      <li>
        <code>aria-labelledby</code> automatically linked to Modal.Title
      </li>
      <li>
        <code>aria-describedby</code> automatically linked to Modal.Description
      </li>
      <li>Focus trap and focus restoration</li>
      <li>Keyboard navigation (Escape key)</li>
    </ul>
  </div>
);

const AccessibiltyTestBox = () => (
  <div className="accessibility-demo__test-box">
    <strong>🔍 How to test accessibility:</strong>
    <ol className="accessibility-demo__list">
      <li>Use screen reader (VoiceOver on Mac, NVDA on Windows)</li>
      <li>Open modal and listen to announcements</li>
      <li>Inspect element to see ARIA attributes</li>
      <li>Tab through elements to test focus trap</li>
      <li>Press Escape to test keyboard navigation</li>
    </ol>
  </div>
);

const ButtonGroup = () => (
  <div className="accessibility-demo__button-group">
    <Modal.Trigger target="accessibility-complete" asChild>
      <Modal.Button variant="success" size="small">
        Complete Accessibility
      </Modal.Button>
    </Modal.Trigger>

    <Modal.Trigger target="accessibility-title-only" asChild>
      <Modal.Button variant="primary" size="small">
        Title Only (No Description)
      </Modal.Button>
    </Modal.Trigger>

    <Modal.Trigger target="accessibility-custom-ids" asChild>
      <Modal.Button variant="info" size="small">
        Custom IDs
      </Modal.Button>
    </Modal.Trigger>
  </div>
);

export function AccessibilityDemo() {
  return (
    <Demo
      title="♿ Accessibility Demo"
      description="Demonstrates proper ARIA linking and accessibility features."
    >
      <FeatureBox />
      <AccessibiltyTestBox />

      <ButtonGroup />

      <CompleteAccessibilityModal />
      <TitleOnlyModal />
      <CustomIdsModal />
    </Demo>
  );
}
