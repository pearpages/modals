import { Modal } from '@pearpages/modals'

export default function AsChildPatterns() {
  return (
    <>
      <Modal.Trigger target="as-child-tour" asChild>
        <Modal.Button variant="primary">Open</Modal.Button>
      </Modal.Trigger>

      <Modal id="as-child-tour">
        <Modal.Content>
          {/* Every subcomponent takes asChild and behaves the same way: your
              element is kept, our className is appended after yours, and our
              handlers run after yours unless you call preventDefault(). */}
          <Modal.Header asChild>
            <header>
              <Modal.Title asChild>
                <h1>A real h1</h1>
              </Modal.Title>
              <Modal.Close />
            </header>
          </Modal.Header>

          <Modal.Body asChild>
            <section>
              <Modal.Description asChild>
                <p>Title, description and body are all your own elements here.</p>
              </Modal.Description>
            </section>
          </Modal.Body>

          <Modal.Footer asChild>
            <nav>
              <Modal.Close asChild>
                <Modal.Button variant="primary">Close</Modal.Button>
              </Modal.Close>
            </nav>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}
