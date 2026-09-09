import { Link } from 'react-router-dom'
import { Page } from '../../components/Page'
import { Showcase } from '../../components/Showcase'
import { PropsTable } from '../../components/PropsTable'
import FooterActions from '../../examples/components/modal-footer/FooterActions'
import footerActionsSource from '../../examples/components/modal-footer/FooterActions.tsx?raw'

export function FooterPage() {
  return (
    <Page title="Modal.Footer" lead="Where the actions go.">
      <PropsTable
        rows={[
          { name: 'asChild', type: 'boolean', default: 'false', description: 'Render your own element.' },
          { name: 'className', type: 'string', description: 'Appended to the component class.' },
          { name: 'children', type: 'ReactNode', description: 'Usually buttons. An empty footer is valid.' },
        ]}
      />

      <Showcase
        title="One action, or several"
        code={footerActionsSource}
        fileName="FooterActions.tsx"
        description="A row on desktop; stacked on narrow screens, with the primary action nearest the thumb."
      >
        <FooterActions />
      </Showcase>

      <h2>On phones</h2>
      <p>
        Below 768px the footer stacks its buttons, gives them a 44px minimum height,
        and adds the iOS bottom safe-area inset so the last button clears the home
        indicator. See <Link to="/guides/mobile">Mobile</Link>.
      </p>
    </Page>
  )
}
