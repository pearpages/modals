import { Modal } from "@/Modal";
import "./MixedContentModal.scss";

const generateLongContent = (paragraphs: number) => {
  return Array.from({ length: paragraphs }, (_, i) => (
    <p key={i}>
      This is paragraph {i + 1} of the long content test. Lorem ipsum dolor sit
      amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
      aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
      fugiat nulla pariatur.
    </p>
  ));
};

const Form = ({
  id,
  onSubmit,
}: {
  id: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <div className="form-section">
      <h3 className="section-title">Form Section</h3>
      <form id={id} className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="input"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input"
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          rows={4}
          className="textarea"
          required
        />
      </form>
    </div>
  );
};

interface MixedContentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MixedContentModal({
  open,
  onOpenChange,
}: MixedContentModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
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
    <Modal id={MixedContentModal.id} open={open} onOpenChange={onOpenChange}>
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>Mixed Content Test</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <Form id="mixed-content-form" onSubmit={handleSubmit} />
          <div className="image-section">
            <h3 className="scroll-optimization-demo__section-title">
              Image Section
            </h3>
            <div className="placeholder-image">
              Placeholder Image (200px height)
            </div>
          </div>

          <div className="long-text">{generateLongContent(8)}</div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Modal.Button>
          <Modal.Button
            type="submit"
            form="mixed-content-form"
            variant="success"
          >
            Submit & Close
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

MixedContentModal.id = "mixed-content";
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
