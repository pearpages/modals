import { useEffect, useState } from 'react'

type Scheme = 'auto' | 'light' | 'dark'

const OPTIONS: Scheme[] = ['auto', 'light', 'dark']
const STORAGE_KEY = 'modals-docs-appearance'

export function AppearanceSwitcher() {
  const [scheme, setScheme] = useState<Scheme>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'light' || stored === 'dark' || stored === 'auto') return stored
    } catch {
      // Private windows and blocked site data both throw here.
    }
    return 'auto'
  })

  useEffect(() => {
    const root = document.documentElement
    // "auto" must REMOVE the attribute. Setting data-theme="auto" matches
    // neither selector in app.scss and strands the page on the light palette.
    if (scheme === 'auto') {
      root.removeAttribute('data-theme')
    } else {
      root.dataset.theme = scheme
    }
    try {
      localStorage.setItem(STORAGE_KEY, scheme)
    } catch {
      // Persisting the choice is a nicety, not a requirement.
    }
  }, [scheme])

  return (
    <div className="choice" role="group" aria-label="Appearance">
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          className={`choice__option${option === scheme ? ' choice__option--active' : ''}`}
          aria-pressed={option === scheme}
          onClick={() => setScheme(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
