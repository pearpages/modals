import { Page } from '../../components/Page'
import { Showcase } from '../../components/Showcase'
import { CodeBlock } from '../../components/CodeBlock'
import ScrollLockDemo from '../../examples/guides/ScrollLockDemo'
import scrollLockSource from '../../examples/guides/ScrollLockDemo.tsx?raw'

export function ScrollLockPage() {
  return (
    <Page
      title="Scroll lock"
      lead="The page behind a modal does not move — and does not jump when the scrollbar goes away."
    >
      <p>
        Locking is automatic: it engages when the first modal opens and releases when
        the last one closes. Nesting does not unlock the page early.
      </p>

      <Showcase code={scrollLockSource} fileName="ScrollLockDemo.tsx">
        <ScrollLockDemo />
      </Showcase>

      <h2>The layout shift problem</h2>
      <p>
        Hiding the scrollbar returns its width to the page, and everything jumps
        sideways. The library measures that width and compensates with padding, so
        nothing moves. The measured value is also published as a custom property, in
        case your own fixed elements need it:
      </p>
      <CodeBlock
        language="css"
        code={`.my-fixed-header {
  padding-right: var(--scrollbar-compensation, 0px);
}`}
      />

      <h2>iOS</h2>
      <p>
        Mobile Safari ignores <code>overflow: hidden</code> on the body, so the
        library switches to <code>position: fixed</code> there, remembers the scroll
        offset, and restores it on close — which is why the page does not jump back to
        the top after you dismiss a modal.
      </p>

      <h2>Using it directly</h2>
      <p>
        <code>useBodyScrollLock(isLocked)</code> is exported if you need the same
        behaviour for a drawer or a menu of your own.
      </p>
    </Page>
  )
}
