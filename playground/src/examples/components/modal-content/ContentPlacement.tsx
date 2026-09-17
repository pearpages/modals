import { Modal } from '@pearpages/modals'

const PLACEMENTS = ['start', 'end', 'top', 'bottom'] as const

export default function ContentPlacement() {
  return (
    <>
      {PLACEMENTS.map((placement) => (
        <Modal.Trigger key={placement} target={`placement-${placement}`} asChild>
          <Modal.Button>placement=&quot;{placement}&quot;</Modal.Button>
        </Modal.Trigger>
      ))}

      {PLACEMENTS.map((placement) => (
        <Modal key={placement} id={`placement-${placement}`}>
          <Modal.Content placement={placement}>
            <Modal.Header>
              <Modal.Title>placement=&quot;{placement}&quot;</Modal.Title>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <p>
                A docked dialog is a sheet: it sits on its edge and slides in from it.{' '}
                <code>start</code> and <code>end</code> take <code>--modal-width-sheet</code>{' '}
                and the full height; <code>top</code> and <code>bottom</code> take the full
                width and <code>--modal-height-sheet</code>. Focus trap, stacking and
                dismissal are unchanged.
              </p>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      ))}
    </>
  )
}
