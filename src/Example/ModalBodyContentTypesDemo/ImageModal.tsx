import { Modal } from '@/Modal';

export function ImageModal() {
  const handleClose = () => {
    console.log('Image modal closed');
  };

  return (
    <Modal id="image-modal">
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>🖼️ Image Content Test</Modal.Title>
          <Modal.Description>
            Testing responsive image behavior and large media
          </Modal.Description>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-content-types-demo__modal-content">
            <div className="content-section">
              <h4>Responsive Image Handling</h4>
              <p>This tests how Modal.Body handles large images and responsive behavior.</p>
            </div>

            {/* Large placeholder image */}
            <div className="modal-body-content-types-demo__large-image">
              📷 Large Image Placeholder (400px height)
            </div>

            {/* Gallery of smaller images */}
            <div className="modal-body-content-types-demo__image-gallery">
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className="modal-body-content-types-demo__gallery-item"
                  style={{ background: `hsl(${i * 60}, 70%, 60%)` }}
                >
                  IMG {i + 1}
                </div>
              ))}
            </div>

            <div className="modal-body-content-types-demo__features-box modal-body-content-types-demo__features-box--info">
              <strong>✅ Image Handling Features:</strong>
              <ul>
                <li>Responsive images that scale with container</li>
                <li>Grid layouts that adapt to modal width</li>
                <li>Proper aspect ratio maintenance</li>
                <li>Scroll handling for image galleries</li>
              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="primary" onClick={handleClose} size="small">
            Close
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

// Compound component with trigger
ImageModal.Trigger = function ImageModalTrigger() {
  return (
    <Modal.Trigger target="image-modal" asChild>
      <button className="modal-body-content-types-demo__trigger-button modal-body-content-types-demo__trigger-button--images">
        <span className="modal-body-content-types-demo__trigger-title">🖼️ Images & Media</span>
        <small className="modal-body-content-types-demo__trigger-description">Large images, responsive behavior</small>
      </button>
    </Modal.Trigger>
  );
};