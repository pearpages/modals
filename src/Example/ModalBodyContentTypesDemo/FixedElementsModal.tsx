import { Modal } from '@/Modal';

export function FixedElementsModal() {
  const handleFloatingClick = () => {
    console.log('Floating button clicked');
  };

  return (
    <Modal id="fixed-elements">
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>📌 Fixed/Sticky Elements</Modal.Title>
          <Modal.Description>Testing positioning edge cases within modal</Modal.Description>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-content-types-demo__modal-content">
            <div className="content-section">
              <h4>Positioning Within Modal Context</h4>
              <p>Testing how elements with special positioning behave inside Modal.Body.</p>
            </div>

            <div className="modal-body-content-types-demo__sticky-header">
              📌 Sticky Section Header (scrolls with content)
            </div>

            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className={`modal-body-content-types-demo__content-block modal-body-content-types-demo__content-block--${i % 2 === 0 ? 'even' : 'odd'}`}
              >
                <strong>Content Block {i + 1}</strong>
                <p>
                  This content tests how the sticky header behaves during scrolling.
                  The sticky element should remain at the top of the scrollable area.
                </p>
              </div>
            ))}

            <div className="modal-body-content-types-demo__positioning-container">
              <h5>Relative Positioning Container</h5>
              <p>This container demonstrates how absolutely positioned elements work within modal content.</p>
              <button className="modal-body-content-types-demo__floating-button" onClick={handleFloatingClick}>
                ➕
              </button>
            </div>

            <div className="modal-body-content-types-demo__features-box modal-body-content-types-demo__features-box--warning">
              <strong>📍 Positioning Features:</strong>
              <ul>
                <li>Sticky elements work within modal scroll context</li>
                <li>Absolute positioning relative to modal content</li>
                <li>Z-index stacking respects modal context</li>
                <li>Fixed elements position correctly within modal bounds</li>
                <li>No interference with modal backdrop or chrome</li>
              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="secondary" size="small">Close</Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

FixedElementsModal.Trigger = function FixedElementsModalTrigger() {
  return (
    <Modal.Trigger target="fixed-elements" asChild>
      <button className="modal-body-content-types-demo__trigger-button modal-body-content-types-demo__trigger-button--fixed">
        <span className="modal-body-content-types-demo__trigger-title">📌 Fixed/Sticky Elements</span>
        <small className="modal-body-content-types-demo__trigger-description">Positioning edge cases</small>
      </button>
    </Modal.Trigger>
  );
};