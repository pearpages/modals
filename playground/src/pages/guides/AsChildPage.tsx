import { Page } from '../../components/Page'
import { Showcase } from '../../components/Showcase'
import { CodeBlock } from '../../components/CodeBlock'
import { Callout } from '../../components/Callout'
import AsChildPatterns from '../../examples/guides/AsChildPatterns'
import asChildPatternsSource from '../../examples/guides/AsChildPatterns.tsx?raw'

export function AsChildPage() {
  return (
    <Page
      title="asChild"
      lead="Keep your element, take our behaviour. Every subcomponent supports it, and they all behave the same way."
    >
      <p>
        Without <code>asChild</code>, a subcomponent renders its own element around
        your content. With it, your element <em>becomes</em> that element — no extra
        wrapper, no nested button.
      </p>
      <CodeBlock
        code={`{/* renders <button> inside <button> */}
<Modal.Trigger>
  <Modal.Button>Open</Modal.Button>
</Modal.Trigger>

{/* renders one button, with trigger behaviour on it */}
<Modal.Trigger asChild>
  <Modal.Button>Open</Modal.Button>
</Modal.Trigger>`}
      />

      <h2>The contract</h2>
      <ul>
        <li>
          <strong>Exactly one element child.</strong> Text, fragments, arrays and{' '}
          <code>null</code> all throw a named error naming the component.
        </li>
        <li>
          <strong>className is appended.</strong> Yours first, then ours, so both apply.
        </li>
        <li>
          <strong>Handlers compose.</strong> Yours runs first; ours is skipped if you
          called <code>preventDefault()</code>. That is how you cancel an open or a
          close.
        </li>
        <li>
          <strong>Refs are merged.</strong> A ref on your child is kept alongside the
          component&apos;s own.
        </li>
      </ul>

      <Callout variant="info" title="Uniform as of 0.2.0">
        <p>
          Earlier versions had two implementations of this: some subcomponents composed
          your handlers, others silently replaced them, and only one merged refs. All
          nine now share one implementation.
        </p>
      </Callout>

      <Showcase
        code={asChildPatternsSource}
        fileName="AsChildPatterns.tsx"
        description="Header, Title, Description, Body, Footer and Close all replaced with elements of their own."
      >
        <AsChildPatterns />
      </Showcase>

      <h2>Where it earns its keep</h2>
      <ul>
        <li>
          <code>Modal.Trigger asChild</code> — avoid a button inside a button.
        </li>
        <li>
          <code>Modal.Content asChild</code> — make the dialog itself a{' '}
          <code>&lt;form&gt;</code>.
        </li>
        <li>
          <code>Modal.Title asChild</code> — use the heading level your page outline
          needs instead of the default <code>h2</code>.
        </li>
        <li>
          <code>Modal.Close asChild</code> — any element becomes a close button.
        </li>
      </ul>
    </Page>
  )
}
