import { Modal, ModalProvider, ModalRoot } from '@pearpages/modals'
import '@pearpages/modals/styles.css'

// The same thing, composed by hand. Reach for this when you need the portal to
// render somewhere other than document.body, or when the provider and the root
// have to sit at different points in your tree.
//
// baseZIndex belongs on the provider: ModalRoot and Modal.Content both read it
// from context, so setting it in one place keeps them in the same layer band.
export default function App() {
  return (
    <ModalProvider baseZIndex={2000}>
      <Modal.Trigger target="manual">Open</Modal.Trigger>

      <Modal id="manual">
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Manual composition</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>Provider and root are mounted separately.</Modal.Body>
        </Modal.Content>
      </Modal>

      <ModalRoot />
    </ModalProvider>
  )
}
