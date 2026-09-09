import { Modal } from '@pearpages/modals'

export default function AnimationToggle() {
  return (
    <>
      <Modal.Trigger target="anim-on" asChild>
        <Modal.Button variant="primary">Animated</Modal.Button>
      </Modal.Trigger>
      <Modal.Trigger target="anim-off" asChild>
        <Modal.Button>Instant</Modal.Button>
      </Modal.Trigger>

      <Modal id="anim-on">
        {/* The default. The modal stays mounted briefly while it fades out. */}
        <Modal.Content animated>
          <Modal.Header>
            <Modal.Title>Animated</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>Fades and scales in, then out.</Modal.Body>
        </Modal.Content>
      </Modal>

      <Modal id="anim-off">
        {/* Unmounts the instant it closes. Worth choosing when a test needs
            "closed means gone" to be true immediately. */}
        <Modal.Content animated={false}>
          <Modal.Header>
            <Modal.Title>Instant</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>Appears and disappears with no transition.</Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}
