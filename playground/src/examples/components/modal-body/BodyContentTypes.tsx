import { Modal } from '@pearpages/modals'

export default function BodyContentTypes() {
  return (
    <>
      <Modal.Trigger target="body-image" asChild>
        <Modal.Button>Image</Modal.Button>
      </Modal.Trigger>
      <Modal.Trigger target="body-table" asChild>
        <Modal.Button>Wide table</Modal.Button>
      </Modal.Trigger>

      <Modal id="body-image">
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Media</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>
            {/* Images, video and iframes are capped at the body width. */}
            <img
              src="https://placehold.co/1200x600/0969da/ffffff/png?text=1200x600"
              alt="A placeholder that is wider than the modal"
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>

      <Modal id="body-table">
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Wide content</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>
            {/* Content too wide to wrap scrolls sideways inside the body rather
                than stretching the modal. */}
            <table>
              <thead>
                <tr>
                  {Array.from({ length: 8 }, (_, i) => (
                    <th key={i}>Column {i + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 4 }, (_, row) => (
                  <tr key={row}>
                    {Array.from({ length: 8 }, (_, col) => (
                      <td key={col}>r{row + 1}c{col + 1}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}
