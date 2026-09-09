import { NavLink } from 'react-router-dom'
import type { DocSection } from '../routes'

export type NavProps = {
  sections: DocSection[]
  open?: boolean
  onNavigate?: () => void
}

export function Nav({ sections, open = false, onNavigate }: NavProps) {
  return (
    <nav className={`nav${open ? ' nav--open' : ''}`} aria-label="Documentation">
      {sections.map((section) => (
        <div className="nav__section" key={section.label}>
          <h2 className="nav__heading">{section.label}</h2>
          <ul className="nav__list">
            {section.routes.map((route) => (
              <li key={route.path}>
                {/* NavLink sets aria-current="page" for us, which app.scss styles. */}
                <NavLink className="nav__link" to={route.path} end onClick={onNavigate}>
                  {route.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
