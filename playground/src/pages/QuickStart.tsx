import { Link } from 'react-router-dom'
import { Page } from '../components/Page'
import { CodeBlock } from '../components/CodeBlock'
import { Showcase } from '../components/Showcase'
import FirstModal from '../examples/quick-start/FirstModal'
import firstModalSource from '../examples/quick-start/FirstModal.tsx?raw'

export function QuickStart() {
  return (
    <Page
      title="Your first modal"
      lead="The anatomy of a dialog, one piece at a time."
    >
      <h2>1. An id, and something to open it</h2>
      <p>
        Every modal has an <code>id</code> that is unique within its provider. A{' '}
        <code>Modal.Trigger</code> opens the modal with a matching{' '}
        <code>target</code>, and returns focus to itself when the modal closes.
      </p>
      <CodeBlock
        code={`<Modal.Trigger target="publish">Open modal</Modal.Trigger>

<Modal id="publish">{/* ... */}</Modal>`}
      />

      <h2>2. Content is the dialog</h2>
      <p>
        <code>Modal.Content</code> is the element that carries{' '}
        <code>role="dialog"</code>, the size, the animation and the focus trap. A modal
        without it renders nothing visible.
      </p>
      <CodeBlock
        code={`<Modal id="publish">
  <Modal.Content>{/* ... */}</Modal.Content>
</Modal>`}
      />

      <h2>3. Header, body, footer</h2>
      <p>
        These three are layout slots, and they are optional. Using{' '}
        <code>Modal.Title</code> and <code>Modal.Description</code> inside the header
        is what gives the dialog its accessible name and description — you do not
        write <code>aria-labelledby</code> yourself.
      </p>
      <CodeBlock
        code={`<Modal.Content>
  <Modal.Header>
    <Modal.Title>Publish this page?</Modal.Title>
    <Modal.Close />
  </Modal.Header>

  <Modal.Body>{/* the part that scrolls */}</Modal.Body>

  <Modal.Footer>{/* actions */}</Modal.Footer>
</Modal.Content>`}
      />

      <h2>All together</h2>
      <Showcase code={firstModalSource} fileName="FirstModal.tsx">
        <FirstModal />
      </Showcase>

      <h2>Then what</h2>
      <p>
        That covers the declarative path. If the thing that opens a modal is not a
        button — a failed request, a timer, a route change — reach for{' '}
        <Link to="/guides/programmatic">programmatic control</Link>. If the modal&apos;s
        open state belongs to your own component, use{' '}
        <Link to="/guides/controlled">controlled mode</Link> instead.
      </p>
    </Page>
  )
}
