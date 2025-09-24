import { Modal } from '@/Modal';

export function EdgeCasesModal() {
  return (
    <Modal id="empty-content">
      <Modal.Content size="auto">
        <Modal.Header>
          <Modal.Title>🗂️ Edge Cases</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-content-types-demo__minimal-content">
            This modal demonstrates handling of minimal content.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="secondary" size="small">
            Close Empty Modal
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

EdgeCasesModal.Trigger = function EdgeCasesModalTrigger() {
  return (
    <Modal.Trigger target="empty-content" asChild>
      <button className="modal-body-content-types-demo__trigger-button modal-body-content-types-demo__trigger-button--edge">
        <span className="modal-body-content-types-demo__trigger-title">🗂️ Edge Cases</span>
        <small className="modal-body-content-types-demo__trigger-description">Empty content, minimal content</small>
      </button>
    </Modal.Trigger>
  );
};