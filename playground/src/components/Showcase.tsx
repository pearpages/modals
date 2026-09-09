import type { ReactNode } from 'react'
import { CodeBlock } from './CodeBlock'

export type ShowcaseProps = {
  /** Raw source of the example, imported with ?raw so it cannot drift. */
  code: string
  title?: string
  description?: ReactNode
  fileName?: string
  /** How the live demo area lays its children out. */
  layout?: 'row' | 'grid' | 'column'
  children: ReactNode
}

/**
 * The unit every docs page is built from: the code that produces the demo,
 * then the demo itself. Code first is deliberate — you read what a modal is
 * made of before you press the button that opens it.
 */
export function Showcase({ code, title, description, fileName, layout = 'row', children }: ShowcaseProps) {
  const demoClass = ['showcase__demo', layout !== 'row' && `showcase__demo--${layout}`]
    .filter(Boolean)
    .join(' ')

  return (
    <section className="showcase">
      {title && <h3 className="showcase__title">{title}</h3>}
      {description && <p className="showcase__description">{description}</p>}
      <CodeBlock code={code} title={fileName} />
      <div className={demoClass}>{children}</div>
    </section>
  )
}
