import { useEffect } from 'react'
import type { ReactNode } from 'react'

export type PageProps = {
  title: string
  lead?: ReactNode
  children: ReactNode
}

export function Page({ title, lead, children }: PageProps) {
  useEffect(() => {
    document.title = `${title} · @pearpages/modals`
  }, [title])

  return (
    <article className="page">
      <h1 className="page__title">{title}</h1>
      {lead && <p className="page__lead">{lead}</p>}
      {children}
    </article>
  )
}
