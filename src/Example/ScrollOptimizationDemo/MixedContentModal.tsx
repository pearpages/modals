import { Modal } from "@/Modal";

interface MixedContentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MixedContentModal({
  open,
  onOpenChange,
}: MixedContentModalProps) {
  const generateLongContent = (paragraphs: number) => {
    return Array.from({ length: paragraphs }, (_, i) => (
      <p key={i} className="scroll-optimization-demo__paragraph">
        This is paragraph {i + 1} of the long content test. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur.
      </p>
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    console.log("Mixed content form submitted:", data);

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      alert("Please fill in all fields");
      return;
    }

    // Simulate successful submission
    alert("Form submitted successfully!");
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Modal id="mixed-content" open={open} onOpenChange={onOpenChange}>
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>Mixed Content Test</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <div className="scroll-optimization-demo__form-section">
            <h3 className="scroll-optimization-demo__section-title">
              Form Section
            </h3>
            <form
              onSubmit={handleSubmit}
              className="scroll-optimization-demo__form"
              id="mixed-content-form"
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="scroll-optimization-demo__input"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="scroll-optimization-demo__input"
                required
              />
              <textarea
                name="message"
                placeholder="Message"
                rows={4}
                className="scroll-optimization-demo__textarea"
                required
              />
            </form>
          </div>

          <div className="scroll-optimization-demo__image-section">
            <h3 className="scroll-optimization-demo__section-title">
              Image Section
            </h3>
            <div className="scroll-optimization-demo__placeholder-image">
              Placeholder Image (200px height)
            </div>
          </div>

          {generateLongContent(8)}
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Modal.Button>
          <Modal.Button
            variant="success"
            type="submit"
            form="mixed-content-form"
          >
            Submit & Close
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

// Compound component with trigger
MixedContentModal.Trigger = function MixedContentModalTrigger({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Modal.Button variant="success" onClick={() => onOpenChange(true)}>
      Test Mixed Content
    </Modal.Button>
  );
};
