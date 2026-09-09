import type { ReactNode } from 'react'

export type CalloutProps = {
  variant?: 'info' | 'success' | 'warning' | 'danger'
  title?: string
  children: ReactNode
}

export function Callout({ variant = 'info', title, children }: CalloutProps) {
  return (
    <aside className={`callout callout--${variant}`}>
      {title && <p className="callout__title">{title}</p>}
      {children}
    </aside>
  )
}
