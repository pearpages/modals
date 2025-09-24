import { Modal } from "@/Modal";

interface LongContentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LongContentModal({
  open,
  onOpenChange,
}: LongContentModalProps) {
  const generateLongContent = (paragraphs: number) => {
    return Array.from({ length: paragraphs }, (_, i) => (
      <p key={i} className="scroll-optimization-demo__paragraph">
        This is paragraph {i + 1} of the long content test. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur.
      </p>
    ));
  };

  const handleSubmit = () => {
    console.log("Long content modal: marked as read");
    onOpenChange(false);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Modal id="long-content" open={open} onOpenChange={onOpenChange}>
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>Long Content Test</Modal.Title>
          <Modal.Description>
            Testing scroll behavior with extensive content
          </Modal.Description>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <div className="scroll-optimization-demo__test-features">
            <strong className="scroll-optimization-demo__features-title">
              🎯 Test Features:
            </strong>
            <ul className="scroll-optimization-demo__features-list">
              <li>
                ✅ Enhanced scrollbar styling (8px width, better hover states)
              </li>
              <li>✅ Firefox scrollbar support</li>
              <li>
                ✅ iOS smooth scrolling (-webkit-overflow-scrolling: touch)
              </li>
              <li>✅ Overscroll containment (prevents body scroll)</li>
              <li>
                ✅ Smart height calculation (90vh - 200px for header/footer)
              </li>
              <li>✅ Proper flexbox layout with min-height: 0</li>
            </ul>
          </div>
          {generateLongContent(15)}
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="secondary" onClick={handleClose} size="small">
            Close
          </Modal.Button>
          <Modal.Button size="small" onClick={handleSubmit} variant="primary">
            Mark as Read
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

// Compound component with trigger
LongContentModal.Trigger = function LongContentModalTrigger({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Modal.Button variant="primary" onClick={() => onOpenChange(true)}>
      Test Long Content
    </Modal.Button>
  );
};
