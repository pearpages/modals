import { Modal } from '@pearpages/modals'

export default function HeaderAnatomy() {
  return (
    <>
      <Modal.Trigger target="header-anatomy" asChild>
        <Modal.Button>Open</Modal.Button>
      </Modal.Trigger>

      <Modal id="header-anatomy">
        <Modal.Content>
          {/* Header lays out its content and lifts any Modal.Close out to the
              corner, whatever order you write them in. */}
          <Modal.Header>
            <Modal.Title>Move to trash</Modal.Title>
            <Modal.Description>
              Title becomes aria-labelledby and description becomes
              aria-describedby, automatically.
            </Modal.Description>
            <Modal.Close />
          </Modal.Header>

          <Modal.Body>The dialog announces both to screen readers.</Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}
