import { useState } from 'react'
import { Modal } from '@pearpages/modals'

export default function ContentAsForm() {
  const [saved, setSaved] = useState('')

  return (
    <>
      <Modal.Trigger target="content-form" asChild>
        <Modal.Button variant="primary">Rename project</Modal.Button>
      </Modal.Trigger>
      {saved && <span>saved: {saved}</span>}

      <Modal id="content-form">
        {/* asChild makes the dialog itself a <form>, so the footer's submit
            button works without wiring anything up by hand. The dialog role,
            ARIA wiring, sizing and focus trap all move onto the form. */}
        <Modal.Content
          asChild
          onSubmit={(event) => {
            event.preventDefault()
            const form = event.currentTarget as unknown as HTMLFormElement
            const data = new FormData(form)
            setSaved(String(data.get('name') ?? ''))
          }}
        >
          <form>
            <Modal.Header>
              <Modal.Title>Rename project</Modal.Title>
              <Modal.Close />
            </Modal.Header>

            <Modal.Body>
              <label htmlFor="project-name">Project name</label>
              <input id="project-name" name="name" defaultValue="untitled" />
            </Modal.Body>

            <Modal.Footer>
              <Modal.Close asChild>
                <Modal.Button type="button">Cancel</Modal.Button>
              </Modal.Close>
              <Modal.Close asChild>
                <Modal.Button type="submit" variant="primary">
                  Save
                </Modal.Button>
              </Modal.Close>
            </Modal.Footer>
          </form>
        </Modal.Content>
      </Modal>
    </>
  )
}
