import { Modal } from '@pearpages/modals'

export default function HeaderCustomIds() {
  return (
    <>
      <Modal.Trigger target="header-ids" asChild>
        <Modal.Button>Open</Modal.Button>
      </Modal.Trigger>

      <Modal id="header-ids">
        <Modal.Content>
          <Modal.Header>
            {/* IDs are generated for you. Pass your own when something outside
                the modal needs to reference them. */}
            <Modal.Title id="billing-title">Billing</Modal.Title>
            <Modal.Description id="billing-description">
              Your plan renews on the 1st.
            </Modal.Description>
            <Modal.Close />
          </Modal.Header>

          <Modal.Body>
            The dialog now points at <code>billing-title</code> and{' '}
            <code>billing-description</code>.
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}
