import { Modal } from '@pearpages/modals'

const VARIANTS = ['primary', 'secondary', 'danger', 'success', 'warning'] as const

export default function ButtonVariants() {
  return (
    <>
      {VARIANTS.map((variant) => (
        <Modal.Button key={variant} variant={variant}>
          {variant}
        </Modal.Button>
      ))}
    </>
  )
}
