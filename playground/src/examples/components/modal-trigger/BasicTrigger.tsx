import { Modal } from '@pearpages/modals'

export default function BasicTrigger() {
  return (
    <>
      {/* Renders a real <button type="button"> with aria-haspopup="dialog". */}
      <Modal.Trigger target="trigger-basic">Open</Modal.Trigger>

      <Modal id="trigger-basic">
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Opened by a trigger</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>Closing returns focus to the button you came from.</Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}
