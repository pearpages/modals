import { Modal } from '@pearpages/modals'

export default function InAGrid() {
  return (
    <div className="in-a-grid">
      <div className="in-a-grid__cell">
        <Modal.Trigger target="in-a-grid">Open from the first cell</Modal.Trigger>
      </div>

      {/* Written between two grid items, and it never takes a cell: Modal
          renders no element, and Modal.Content portals to the body. */}
      <Modal id="in-a-grid">
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>The grid behind me did not move</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>Close me and check: cell two is still next to cell one.</Modal.Body>
        </Modal.Content>
      </Modal>

      <div className="in-a-grid__cell">Cell two</div>
      <div className="in-a-grid__cell">Cell three</div>
      <div className="in-a-grid__cell">Cell four</div>
    </div>
  )
}
