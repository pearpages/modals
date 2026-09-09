import { Modal } from '@pearpages/modals'

export default function DisabledTrigger() {
  return (
    <>
      <Modal.Trigger target="trigger-disabled" disabled>
        Disabled trigger
      </Modal.Trigger>

      {/* A disabled trigger ignores clicks and Enter/Space alike. When you pass
          asChild, a child that is already disabled stays disabled. */}
      <Modal.Trigger target="trigger-disabled" asChild>
        <Modal.Button disabled>Disabled child</Modal.Button>
      </Modal.Trigger>

      <Modal id="trigger-disabled">
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>You should not see this</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>Both triggers above are disabled.</Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}
