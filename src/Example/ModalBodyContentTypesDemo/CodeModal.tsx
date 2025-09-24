import { Modal } from '@/Modal';

export function CodeModal() {
  const codeExample = `// This is a very long line of code that should trigger horizontal scrolling within the code block
function createVeryLongFunctionNameThatExceedsTheModalWidth(parameterOne, parameterTwo, parameterThree) {
  const veryLongVariableName = "This is a string that is intentionally very long to test horizontal scrolling";

  return {
    result: processComplexDataStructureWithManyProperties(parameterOne, parameterTwo, parameterThree),
    metadata: {
      timestamp: new Date().toISOString(),
      processingTime: performance.now() - startTime,
      configuration: { enableOptimization: true, cacheResults: false, debugMode: true }
    }
  };
}`;

  const jsonExample = `{
  "user": {
    "id": 12345,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "preferences": {
      "notifications": { "email": true, "push": false, "sms": true },
      "privacy": { "profileVisible": true, "dataSharing": false },
      "theme": "dark",
      "language": "en-US"
    },
    "metadata": {
      "createdAt": "2024-01-15T10:30:00Z",
      "lastLogin": "2024-01-22T14:45:22Z",
      "loginCount": 142,
      "ipAddress": "192.168.1.100"
    }
  }
}`;

  const handleClose = () => {
    console.log('Code modal closed');
  };

  return (
    <Modal id="code-modal">
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>💻 Code & Preformatted Content</Modal.Title>
          <Modal.Description>
            Testing code blocks and horizontal scrolling
          </Modal.Description>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-content-types-demo__modal-content">
            <div className="content-section">
              <h4>Code Block Handling</h4>
              <p>Testing how Modal.Body handles code blocks with horizontal overflow.</p>
            </div>

            <pre className="modal-body-content-types-demo__code-block">
              {codeExample}
            </pre>

            <div className="modal-body-content-types-demo__json-example">
              <h5>JSON Data Example:</h5>
              <pre>{jsonExample}</pre>
            </div>

            <div className="modal-body-content-types-demo__features-box modal-body-content-types-demo__features-box--info">
              <strong>💾 Code Content Features:</strong>
              <ul>
                <li>Horizontal scrolling within code blocks</li>
                <li>Preserved formatting and indentation</li>
                <li>Syntax highlighting support ready</li>
                <li>Responsive font sizing</li>
                <li>No horizontal overflow outside modal bounds</li>
              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="secondary" onClick={handleClose} size="small">
            Close
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

// Compound component with trigger
CodeModal.Trigger = function CodeModalTrigger() {
  return (
    <Modal.Trigger target="code-modal" asChild>
      <button className="modal-body-content-types-demo__trigger-button modal-body-content-types-demo__trigger-button--code">
        <span className="modal-body-content-types-demo__trigger-title">💻 Code & Preformatted</span>
        <small className="modal-body-content-types-demo__trigger-description">Code blocks, horizontal scroll</small>
      </button>
    </Modal.Trigger>
  );
};