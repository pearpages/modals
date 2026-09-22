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
        Under <code>prefers-reduced-motion: reduce</code> the stylesheet zeroes its
        motion tokens, so dialogs, sheets and backdrops appear at once with no fade,
        scale or slide, and the × button no longer scales on hover. The{' '}
        <code>Modal.Button</code> loading spinner keeps turning, because it is what tells
        the user something is happening.
      </p>
      <p>
        It is done with the same custom properties you theme with, so you can choose a
        gentler reduction, such as a short fade with no movement, by setting them in your
        own block. Guard transitions you write the same way:
      </p>
      <CodeBlock
        language="css"
        code={`@media (prefers-reduced-motion: reduce) {
  :root {
    --modal-transition-duration: 120ms; /* keep a quick fade */
  }
  .slide-up {
    transform: none;
  }
}`}
      />
    </Page>
  )
}
