import { Modal } from "@/Modal";
import { useModalStack } from "@/ModalProvider";
import { Box } from "../Box";

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

      <Box variant="warning" title="🔍 Check the attributes:">
        <ul>
          <li>
            <code>aria-labelledby</code> will point to Modal.Title
          </li>
          <li>
            <code>aria-describedby</code> will be undefined (no description)
          </li>
          <li>This is perfectly valid - description is optional</li>
        </ul>
      </Box>
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

function TitleOnlyModalTrigger() {
  return (
    <Modal.Trigger target="accessibility-title-only" asChild>
      <Modal.Button variant="primary" size="small">
        Title Only (No Description)
      </Modal.Button>
    </Modal.Trigger>
  );
}

// Compound component pattern
TitleOnlyModal.Trigger = TitleOnlyModalTrigger;

export { TitleOnlyModal };
