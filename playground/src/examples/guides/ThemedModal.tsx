import { Modal } from '@pearpages/modals'

export default function ThemedModal() {
  return (
    <>
      <Modal.Trigger target="themed" asChild>
        <Modal.Button variant="primary">Open themed modal</Modal.Button>
      </Modal.Trigger>

      <Modal id="themed">
        {/* Every visual choice is a CSS custom property, so a style prop, a
            className or a :root override all work. Nothing here is !important. */}
        <Modal.Content
          style={{
            '--modal-bg': '#1b1035',
            '--modal-color': '#f2e9ff',
            '--modal-radius': '20px',
            '--modal-shadow': '0 24px 60px rgba(80, 20, 160, 0.45)',
          } as React.CSSProperties}
        >
          <Modal.Header>
            <Modal.Title>Themed with variables</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>
            <p>
              Set the same properties on <code>:root</code> to restyle every modal in
              the app at once.
            </p>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}
