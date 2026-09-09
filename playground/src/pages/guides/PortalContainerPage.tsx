import { Link } from 'react-router-dom'
import { Page } from '../../components/Page'
import { Showcase } from '../../components/Showcase'
import { Callout } from '../../components/Callout'
import PortalContainer from '../../examples/guides/PortalContainer'
import portalContainerSource from '../../examples/guides/PortalContainer.tsx?raw'

export function PortalContainerPage() {
  return (
    <Page
      title="Portal container"
      lead="Modals render into document.body by default. Sometimes they should not."
    >
      <p>
        Rendering to <code>document.body</code> is what lets a modal escape{' '}
        <code>overflow: hidden</code> and transformed ancestors. Point{' '}
        <code>container</code> somewhere else when you need the modal scoped to a
        region — inside a widget you embed in someone else&apos;s page, or a shadow
        root, or a specific element in a test.
      </p>

      <Showcase
        code={portalContainerSource}
        fileName="PortalContainer.tsx"
        layout="column"
        description="This modal mounts inside the dashed box. Inspect it to confirm."
      >
        <PortalContainer />
      </Showcase>

      <Callout variant="warning" title="A custom container is a new stacking context">
        <p>
          Once the modal renders inside your element, it is subject to that
          element&apos;s <code>overflow</code>, <code>transform</code> and{' '}
          <code>z-index</code>. A high <code>baseZIndex</code> cannot lift it out of
          an ancestor stacking context — that is the trade you are making. See{' '}
          <Link to="/guides/stacking">Stacking</Link>.
        </p>
      </Callout>

      <h2>The container must exist first</h2>
      <p>
        <code>ModalRoot</code> renders into the element you hand it, so read the ref in
        an effect rather than during render — on the first render it is still{' '}
        <code>null</code>.
      </p>

      <h2>One provider per stack</h2>
      <p>
        The example above nests a second <code>ModalProvider</code>. A modal belongs to
        exactly one provider, and the stack, z-index range and scroll lock are all
        per-provider — so modals in different providers do not know about each other and
        will not stack against one another.
      </p>
    </Page>
  )
}
