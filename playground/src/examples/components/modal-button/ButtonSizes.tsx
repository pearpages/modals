import { Modal } from '@pearpages/modals'

const SIZES = ['small', 'medium', 'large'] as const

export default function ButtonSizes() {
  return (
    <>
      {SIZES.map((size) => (
        <Modal.Button key={size} variant="primary" size={size}>
          {size}
        </Modal.Button>
      ))}
    </>
  )
}
