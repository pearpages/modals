import { Modal, ModalSystem } from '@pearpages/modals'
import '@pearpages/modals/styles.css'

// ModalSystem is ModalProvider + ModalRoot in one. Mount it once, near the
// root of your app, and every Modal below it works.
export default function App() {
  return (
    <ModalSystem>
      <Modal.Trigger target="hello">Say hello</Modal.Trigger>

      <Modal id="hello">
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Hello</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>This modal is inside a ModalSystem.</Modal.Body>
        </Modal.Content>
      </Modal>
    </ModalSystem>
  )
}
