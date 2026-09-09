import { useEffect, useRef, useState } from 'react'
import { Modal, ModalProvider, ModalRoot } from '@pearpages/modals'

export default function PortalContainer() {
  const hostRef = useRef<HTMLDivElement>(null)
  const [host, setHost] = useState<HTMLElement | null>(null)

  // The container has to exist before ModalRoot renders into it, so it is
  // captured in an effect rather than read during render.
  useEffect(() => setHost(hostRef.current), [])

  return (
    <>
      <div
        ref={hostRef}
        style={{ position: 'relative', border: '1px dashed currentColor', padding: 12, minHeight: 80, width: '100%' }}
      >
        This box is the portal container.
      </div>

      {/* A nested provider with its own root: these modals mount inside the box
          above instead of document.body. Note the separate provider — a modal
          belongs to exactly one stack. */}
      {host && (
        <ModalProvider>
          <Modal.Trigger target="portal-scoped" asChild>
            <button type="button">Open inside the box</button>
          </Modal.Trigger>

          <Modal id="portal-scoped">
            <Modal.Content size="auto">
              <Modal.Header>
                <Modal.Title>Scoped portal</Modal.Title>
                <Modal.Close />
              </Modal.Header>
              <Modal.Body>
                Inspect this element: it is a child of the dashed box, not of body.
              </Modal.Body>
            </Modal.Content>
          </Modal>

          <ModalRoot container={host} />
        </ModalProvider>
      )}
    </>
  )
}
