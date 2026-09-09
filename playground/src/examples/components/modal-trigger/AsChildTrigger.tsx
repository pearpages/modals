import { Modal } from '@pearpages/modals'

export default function AsChildTrigger() {
  return (
    <>
      {/* asChild hands the trigger behaviour to your own element instead of
          rendering a second button around it. */}
      <Modal.Trigger target="trigger-as-child" asChild>
        <Modal.Button variant="danger">Delete account</Modal.Button>
      </Modal.Trigger>

      <Modal id="trigger-as-child">
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Delete account</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>This is where a confirmation would go.</Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}
