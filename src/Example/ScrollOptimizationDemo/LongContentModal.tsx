import { Modal } from "@/Modal";
import { Box } from "../Box";
import "./index.scss";

const generateLongContent = (paragraphs: number) => {
  return Array.from({ length: paragraphs }, (_, i) => (
    <p key={i}>
      This is paragraph {i + 1} of the long content test. Lorem ipsum dolor sit
      amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
      aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
      fugiat nulla pariatur.
    </p>
  ));
};

interface LongContentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LongContentModal({
  open,
  onOpenChange,
}: LongContentModalProps) {
  const handleSubmit = () => {
    console.log("Long content modal: marked as read");
    onOpenChange(false);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Modal id={LongContentModal.id} open={open} onOpenChange={onOpenChange}>
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>Long Content Test</Modal.Title>
          <Modal.Description>
            Testing scroll behavior with extensive content
          </Modal.Description>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <Box variant="success" title="🎯 Test Features: ">
            <ul>
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
          </Box>
          <div className="long-text">{generateLongContent(15)}</div>
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

LongContentModal.id = "long-content";
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
