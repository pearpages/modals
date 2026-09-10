import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { ModalSystem } from '@pearpages/modals'
import { Credit } from '@pearpages/credit/react'
import { SECTIONS } from '../routes'
import { Nav } from './Nav'
import { AppearanceSwitcher } from './AppearanceSwitcher'
import pkg from '../../../package.json'

export function Layout() {
  const [navOpen, setNavOpen] = useState(false)
  const location = useLocation()

  return (
    // One ModalSystem for the whole site, so no example has to repeat it.
    <ModalSystem>
      <div className="app">
        <header className="topbar">
          <div className="topbar__inner">
            <Link className="topbar__brand" to="/">
              @pearpages/modals
            </Link>
            <span className="topbar__version">v{pkg.version}</span>
            <span className="topbar__spacer" />
            <div className="topbar__links">
              <a
                className="topbar__link"
                href="https://github.com/pearpages/modals"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                className="topbar__link"
                href="https://www.npmjs.com/package/@pearpages/modals"
                target="_blank"
                rel="noreferrer"
              >
                npm
              </a>
            </div>
            <AppearanceSwitcher />
            <button
              type="button"
              className="topbar__menu"
              aria-expanded={navOpen}
              onClick={() => setNavOpen((v) => !v)}
            >
              Menu
            </button>
          </div>
        </header>

        <div className="app__body">
          <Nav sections={SECTIONS} open={navOpen} onNavigate={() => setNavOpen(false)} />
          <main className="app__main" key={location.pathname}>
            <Outlet />
          </main>
        </div>

        <footer className="footer">
          <div className="footer__links">
            <a href="https://github.com/pearpages/modals">GitHub</a>
            <a href="https://www.npmjs.com/package/@pearpages/modals">npm</a>
          </div>
          {/* as="div": we are already inside a <footer>; nesting another is
              invalid HTML and adds a second contentinfo landmark. */}
          <Credit as="div" />
        </footer>
      </div>
    </ModalSystem>
  )
}
