import { Modal } from '@pearpages/modals'

const SIZES = ['auto', 'md', 'full'] as const

export default function ContentSizes() {
  return (
    <>
      {SIZES.map((size) => (
        <Modal.Trigger key={size} target={`size-${size}`} asChild>
          <Modal.Button>size=&quot;{size}&quot;</Modal.Button>
        </Modal.Trigger>
      ))}

      {SIZES.map((size) => (
        <Modal key={size} id={`size-${size}`}>
          <Modal.Content size={size}>
            <Modal.Header>
              <Modal.Title>size=&quot;{size}&quot;</Modal.Title>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <p>
                <code>auto</code> fits its content, <code>md</code> is a fixed comfortable
                width, and <code>full</code> fills the viewport.
              </p>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      ))}
    </>
  )
}
