import { Link } from 'react-router-dom'
import { Page } from '../../components/Page'
import { Showcase } from '../../components/Showcase'
import { Callout } from '../../components/Callout'
import ContentAsForm from '../../examples/components/modal-content/ContentAsForm'
import contentAsFormSource from '../../examples/components/modal-content/ContentAsForm.tsx?raw'
import AsyncConfirmation from '../../examples/guides/AsyncConfirmation'
import asyncConfirmationSource from '../../examples/guides/AsyncConfirmation.tsx?raw'

export function FormsAsyncPage() {
  return (
    <Page
      title="Forms & async work"
      lead="Two patterns that come up constantly: a modal that is a form, and a modal that waits."
    >
      <h2>Make the dialog the form</h2>
      <p>
        The awkward part of a form in a modal is that the submit button lives in the
        footer, outside the <code>&lt;form&gt;</code>. The usual fixes are a{' '}
        <code>form</code> attribute with a matching id, or lifting the submit handler
        out by hand.
      </p>
      <p>
        <code>Modal.Content asChild</code> avoids the problem: the dialog{' '}
        <em>is</em> the form, so the footer is inside it and{' '}
        <code>type="submit"</code> just works.
      </p>

      <Showcase code={contentAsFormSource} fileName="ContentAsForm.tsx">
        <ContentAsForm />
      </Showcase>

      <h2>While something is in flight</h2>
      <p>
        Close off the exits for as long as the work runs, and no longer: turn off{' '}
        <code>closeOnBackdrop</code> and <code>closeOnEscape</code>, hide the close
        button, and put the button into its <code>loading</code> state.
      </p>

      <Showcase code={asyncConfirmationSource} fileName="AsyncConfirmation.tsx">
        <AsyncConfirmation />
      </Showcase>

      <Callout variant="info" title="Announce state changes">
        <p>
          A spinner is invisible to a screen reader. Put the status text in an{' '}
          <code>aria-live="polite"</code> region, as the example does, so
          &ldquo;Deleting…&rdquo; is actually announced.
        </p>
      </Callout>

      <h2>Resetting between opens</h2>
      <p>
        A closed modal unmounts its children, so form state is discarded and the next
        open starts clean — no reset logic needed. If you deliberately want a
        half-filled form to survive, hold that state in the component that renders the
        modal instead.
      </p>

      <Callout variant="warning" title="Validation that blocks closing">
        <p>
          To refuse to close while a form is dirty, make the modal{' '}
          <Link to="/guides/controlled">controlled</Link> — then Escape and backdrop
          clicks become requests you can decline — or intercept them with{' '}
          <Link to="/guides/dismiss">
            <code>onInteractOutside</code>
          </Link>
          .
        </p>
      </Callout>
    </Page>
  )
}
