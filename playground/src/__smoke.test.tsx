import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { NotFound } from './pages/NotFound'
import { ALL_ROUTES } from './routes'
import './app.scss'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<Layout />}>
          {ALL_ROUTES.map((r) => (
            <Route key={r.path} path={r.path} element={r.element} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

describe('docs site', () => {
  it.each(ALL_ROUTES.map((r) => [r.path, r.title] as const))(
    'renders %s without crashing',
    (path, title) => {
      const { unmount } = renderAt(path)
      expect(screen.getAllByText(title).length).toBeGreaterThan(0)
      unmount()
    },
  )

  it('opens a modal from a rendered example', async () => {
    renderAt('/components/modal-trigger')
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    })
    expect(await screen.findByRole('dialog')).toBeTruthy()
  })

  it('falls back to NotFound for unknown paths', () => {
    renderAt('/nope')
    expect(screen.getByText('That page does not exist.')).toBeTruthy()
  })
})
