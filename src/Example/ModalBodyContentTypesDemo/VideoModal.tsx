import { Modal } from '@/Modal';

export function VideoModal() {
  const handlePlay = () => {
    console.log('Play video clicked');
  };

  const handleClose = () => {
    console.log('Video modal closed');
  };

  return (
    <Modal id="video-modal">
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>🎥 Video Content Test</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-content-types-demo__modal-content">
            <div className="content-section">
              <h4>Video Aspect Ratio Handling</h4>
              <p>Testing how Modal.Body handles video content and maintains aspect ratios.</p>
            </div>

            {/* 16:9 Video placeholder */}
            <div className="modal-body-content-types-demo__video-player">
              ▶️ Video Player (16:9 Aspect Ratio)
              <div className="modal-body-content-types-demo__video-progress">
                <div className="modal-body-content-types-demo__video-progress-fill" />
              </div>
            </div>

            {/* Video controls and info */}
            <div className="modal-body-content-types-demo__video-controls">
              <button onClick={handlePlay}>
                ▶️ Play
              </button>
              <span>Duration: 5:23 | Resolution: 1920x1080</span>
            </div>

            <div className="modal-body-content-types-demo__features-box modal-body-content-types-demo__features-box--warning">
              <strong>🎬 Video Handling Features:</strong>
              <ul>
                <li>Maintains video aspect ratios (16:9, 4:3, etc.)</li>
                <li>Responsive video players</li>
                <li>Prevents horizontal overflow on mobile</li>
                <li>Supports custom video controls</li>
              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="success" onClick={handleClose} size="small">
            Close
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

// Compound component with trigger
VideoModal.Trigger = function VideoModalTrigger() {
  return (
    <Modal.Trigger target="video-modal" asChild>
      <button className="modal-body-content-types-demo__trigger-button modal-body-content-types-demo__trigger-button--video">
        <span className="modal-body-content-types-demo__trigger-title">🎥 Video Content</span>
        <small className="modal-body-content-types-demo__trigger-description">Embedded video, aspect ratios</small>
      </button>
    </Modal.Trigger>
  );
};