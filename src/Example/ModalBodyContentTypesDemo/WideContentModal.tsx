import { Modal } from '@/Modal';

export function WideContentModal() {
  return (
    <Modal id="wide-content">
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>📏 Wide Content Handling</Modal.Title>
          <Modal.Description>Testing horizontal overflow prevention</Modal.Description>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-content-types-demo__modal-content">
            <div className="content-section">
              <h4>Horizontal Overflow Prevention</h4>
              <p>Testing how Modal.Body handles content wider than the modal.</p>
            </div>

            <div className="modal-body-content-types-demo__wide-table">
              <table>
                <thead>
                  <tr>
                    <th>Column 1</th><th>Column 2</th><th>Column 3</th><th>Column 4</th><th>Column 5</th><th>Column 6</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }, (_, i) => (
                    <tr key={i}>
                      <td>Row {i + 1} Data 1</td><td>Row {i + 1} Data 2</td><td>Row {i + 1} Data 3</td>
                      <td>Row {i + 1} Data 4</td><td>Row {i + 1} Data 5</td><td>Row {i + 1} Data 6</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="modal-body-content-types-demo__wide-element">
              🌈 Wide Gradient Element (1200px → constrained)
            </div>

            <div className="modal-body-content-types-demo__features-box modal-body-content-types-demo__features-box--success">
              <strong>📐 Wide Content Features:</strong>
              <ul>
                <li>Tables with horizontal scroll containers</li>
                <li>max-width constraints prevent modal overflow</li>
                <li>CSS overflow-x: hidden on modal body</li>
                <li>Proper scrollbar styling for horizontal scroll</li>
                <li>Content adapts to modal bounds</li>
              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="success" size="small">Close</Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

WideContentModal.Trigger = function WideContentModalTrigger() {
  return (
    <Modal.Trigger target="wide-content" asChild>
      <button className="modal-body-content-types-demo__trigger-button modal-body-content-types-demo__trigger-button--wide">
        <span className="modal-body-content-types-demo__trigger-title">📏 Wide Content</span>
        <small className="modal-body-content-types-demo__trigger-description">Horizontal overflow handling</small>
      </button>
    </Modal.Trigger>
  );
};