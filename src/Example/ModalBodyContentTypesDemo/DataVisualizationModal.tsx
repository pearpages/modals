import { Modal } from '@/Modal';

export function DataVisualizationModal() {
  return (
    <Modal id="data-viz">
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>📊 Data Visualization</Modal.Title>
          <Modal.Description>Testing SVG, Canvas, and chart content</Modal.Description>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-content-types-demo__modal-content">
            <div className="content-section">
              <h4>SVG and Canvas Content</h4>
              <p>Testing how Modal.Body handles vector graphics and data visualizations.</p>
            </div>

            <svg className="modal-body-content-types-demo__chart-svg">
              <rect width="100%" height="100%" fill="#f8f9fa" />
              {[30, 80, 45, 90, 65, 75, 55].map((height, i) => (
                <rect key={i} x={40 + i * 60} y={180 - height} width="40" height={height} fill={`hsl(${i * 50}, 70%, 60%)`} />
              ))}
              <text x="50%" y="25" textAnchor="middle" fill="#333" fontSize="16" fontWeight="bold">📈 Sample Bar Chart</text>
              <text x="30" y="60" textAnchor="end" fill="#666" fontSize="12">100</text>
              <text x="30" y="120" textAnchor="end" fill="#666" fontSize="12">50</text>
              <text x="30" y="180" textAnchor="end" fill="#666" fontSize="12">0</text>
            </svg>

            <div className="modal-body-content-types-demo__canvas-viz">
              {Array.from({ length: 50 }, (_, i) => (
                <div
                  key={i}
                  className="modal-body-content-types-demo__data-point"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${4 + Math.random() * 6}px`,
                    height: `${4 + Math.random() * 6}px`,
                    background: `hsl(${Math.random() * 360}, 70%, 60%)`,
                    animationDuration: `${1 + Math.random() * 2}s`
                  }}
                />
              ))}
              <div className="modal-body-content-types-demo__viz-label">✨ Simulated Data Visualization</div>
            </div>

            <div className="modal-body-content-types-demo__features-box modal-body-content-types-demo__features-box--info">
              <strong>📊 Visualization Features:</strong>
              <ul>
                <li>Responsive SVG graphics that scale with modal</li>
                <li>Canvas-like visualizations with proper containment</li>
                <li>Chart libraries integration ready</li>
                <li>Performance optimized for complex graphics</li>
                <li>Animation support without affecting modal animations</li>
              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="warning" size="small">Close</Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

DataVisualizationModal.Trigger = function DataVisualizationModalTrigger() {
  return (
    <Modal.Trigger target="data-viz" asChild>
      <button className="modal-body-content-types-demo__trigger-button modal-body-content-types-demo__trigger-button--data-viz">
        <span className="modal-body-content-types-demo__trigger-title">📊 Data Visualization</span>
        <small className="modal-body-content-types-demo__trigger-description">SVG, Canvas, Charts</small>
      </button>
    </Modal.Trigger>
  );
};