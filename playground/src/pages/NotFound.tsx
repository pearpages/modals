import { Link } from 'react-router-dom'
import { Page } from '../components/Page'

export function NotFound() {
  return (
    <Page title="Not found" lead="That page does not exist.">
      <p>
        <Link to="/">Back to the overview</Link>
      </p>
    </Page>
  )
}
