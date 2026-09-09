import { Modal } from '@pearpages/modals'

export default function NestedModals() {
  return (
    <>
      <Modal.Trigger target="stack-parent" asChild>
        <Modal.Button variant="primary">Open first</Modal.Button>
      </Modal.Trigger>

      <Modal id="stack-parent">
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>First modal</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>
            <p>Each modal you open goes on top of the stack.</p>
            {/* A trigger inside a modal targets a sibling modal, never itself:
                a Modal renders nothing while closed, so a trigger nested in the
                modal it targets could never be clicked. */}
            <Modal.Trigger target="stack-child" asChild>
              <Modal.Button>Open second</Modal.Button>
            </Modal.Trigger>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      <Modal id="stack-child">
        <Modal.Content size="auto">
          <Modal.Header>
            <Modal.Title>Second modal</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>
            <p>
              Only this one has a backdrop and only this one answers Escape. Close it
              and the first is interactive again.
            </p>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}
