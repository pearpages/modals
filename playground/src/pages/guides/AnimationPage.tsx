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
      lead="One fade, done in CSS, driven by a data attribute."
    >
      <p>
        There is no animation library and no JavaScript timing loop. The dialog carries
        a <code>data-state</code> that moves through <code>opening</code> →{' '}
        <code>open</code> → <code>closing</code>, and the stylesheet transitions
        opacity and transform between them.
      </p>

      <Showcase code={animationToggleSource} fileName="AnimationToggle.tsx">
        <AnimationToggle />
      </Showcase>

      <Callout variant="warning" title="Animated modals outlive their close by ~250ms">
        <p>
          With <code>animated</code> on, the dialog stays mounted while it fades out.
          If a test asserts that closing removes the content immediately, or you need
          teardown to be synchronous, use <code>animated={'{false}'}</code>.
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
        The built-in transitions are disabled under{' '}
        <code>prefers-reduced-motion: reduce</code>. If you write your own, guard them
        the same way.
      </p>
    </Page>
  )
}
