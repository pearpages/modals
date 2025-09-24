import { Modal } from "@/Modal";
import { useModalStack } from "@/ModalProvider";
import { Box } from "../Box";

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

      <Box variant="success" title="🔍 Custom IDs in use:">
        <ul>
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
      </Box>
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

function CustomIdsModalTrigger() {
  return (
    <Modal.Trigger target="accessibility-custom-ids" asChild>
      <Modal.Button variant="secondary" size="small">
        Custom IDs
      </Modal.Button>
    </Modal.Trigger>
  );
}

// Compound component pattern
CustomIdsModal.Trigger = CustomIdsModalTrigger;

export { CustomIdsModal };
