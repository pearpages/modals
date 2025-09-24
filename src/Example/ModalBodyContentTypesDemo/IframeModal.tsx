import { Modal } from '@/Modal';

export function IframeModal() {
  const handleClose = () => {
    console.log('Iframe modal closed');
  };

  return (
    <Modal id="iframe-modal">
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>🌐 Iframe & Embedded Content</Modal.Title>
          <Modal.Description>Testing external content embedding</Modal.Description>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-content-types-demo__modal-content">
            <div className="content-section">
              <h4>Embedded Content Handling</h4>
              <p>Testing how Modal.Body handles iframes and embedded external content.</p>
            </div>

            <div className="modal-body-content-types-demo__iframe-placeholder">
              <div className="modal-body-content-types-demo__iframe-placeholder-icon">🌐</div>
              <div className="modal-body-content-types-demo__iframe-placeholder-title">Iframe Placeholder</div>
              <div className="modal-body-content-types-demo__iframe-placeholder-description">
                In a real implementation, this would be an embedded iframe or external widget
              </div>
            </div>

            <div className="modal-body-content-types-demo__embedded-widget">
              <div className="modal-body-content-types-demo__embedded-widget-header">
                📊 Embedded Widget Header
              </div>
              <div className="modal-body-content-types-demo__embedded-widget-content">
                <div className="modal-body-content-types-demo__embedded-widget-metric">
                  <div className="modal-body-content-types-demo__embedded-widget-circle">42%</div>
                  <div className="modal-body-content-types-demo__embedded-widget-info">
                    <h6>Performance Metric</h6>
                    <p>Current month progress</p>
                  </div>
                </div>
                <div className="modal-body-content-types-demo__embedded-widget-progress">
                  <div className="modal-body-content-types-demo__embedded-widget-progress-fill" />
                </div>
              </div>
            </div>

            <div className="modal-body-content-types-demo__features-box modal-body-content-types-demo__features-box--info">
              <strong>🔗 Embedded Content Features:</strong>
              <ul>
                <li>Proper iframe sizing and aspect ratio maintenance</li>
                <li>External widget integration without layout issues</li>
                <li>Scroll isolation between modal and embedded content</li>
                <li>Security considerations for external content</li>
                <li>Responsive behavior for embedded elements</li>
              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="danger" onClick={handleClose} size="small">Close</Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

IframeModal.Trigger = function IframeModalTrigger() {
  return (
    <Modal.Trigger target="iframe-modal" asChild>
      <button className="modal-body-content-types-demo__trigger-button modal-body-content-types-demo__trigger-button--iframe">
        <span className="modal-body-content-types-demo__trigger-title">🌐 Iframe & Embeds</span>
        <small className="modal-body-content-types-demo__trigger-description">External content, sizing issues</small>
      </button>
    </Modal.Trigger>
  );
};