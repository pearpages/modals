import { Page } from '../../components/Page'
import { Showcase } from '../../components/Showcase'
import { CodeBlock } from '../../components/CodeBlock'
import { Callout } from '../../components/Callout'
import AnimationToggle from '../../examples/guides/AnimationToggle'
import animationToggleSource from '../../examples/guides/AnimationToggle.tsx?raw'

export function AnimationPage() {
  return (
    <Page
      title="Animation"
      lead="One entrance, done in CSS, driven by a data attribute."
    >
      <p>
        There is no animation library and no JavaScript timing loop. The dialog carries
        a <code>data-state</code> that moves through <code>opening</code> →{' '}
        <code>open</code> → <code>closing</code>, and the stylesheet transitions
        opacity and transform between them: a centred dialog fades and scales in, a docked
        sheet slides in from its edge.
      </p>

      <Showcase code={animationToggleSource} fileName="AnimationToggle.tsx">
        <AnimationToggle />
      </Showcase>

      <Callout variant="warning" title="Closing is not animated yet">
        <p>
          Only the entrance animates. When a modal closes it is unmounted in the same
          render, so the <code>closing</code> state and its styles never reach the
          screen. An exit animation is planned; until then, do not rely on the dialog
          still being in the DOM after it closes.
        </p>
      </Callout>

      <h2>Replacing the animation</h2>
      <p>
        Target <code>data-state</code> yourself. Your rules land on the same element,
        so no extra specificity is needed beyond your own class:
      </p>
      <CodeBlock
        language="css"
        code={`.slide-up {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 200ms ease, transform 200ms ease;
}

.slide-up[data-state='open'] {
  opacity: 1;
  transform: translateY(0);
}`}
      />
      <CodeBlock code={`<Modal.Content className="slide-up">{/* ... */}</Modal.Content>`} />

      <h2>Reduced motion</h2>
      <p>
        The built-in transitions do not yet respond to{' '}
        <code>prefers-reduced-motion</code>. Until they do, add the guard yourself; the
        same rule covers transitions you write:
      </p>
      <CodeBlock
        language="css"
        code={`@media (prefers-reduced-motion: reduce) {
  .modal,
  .modalBackdrop {
    transition: none;
    animation: none;
  }
}`}
      />
    </Page>
  )
}
