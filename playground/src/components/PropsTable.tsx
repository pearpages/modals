import type { ReactNode } from 'react'

export type PropRow = {
  name: string
  type: string
  default?: string
  required?: boolean
  description: ReactNode
}

export type PropsTableProps = {
  rows: PropRow[]
  caption?: string
}

export function PropsTable({ rows, caption }: PropsTableProps) {
  return (
    <table className="props">
      {caption && <caption>{caption}</caption>}
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name}>
            <td className="props__name" data-label="Prop">
              <code>{row.name}</code>
              {row.required && (
                <abbr className="props__required" title="required">
                  *
                </abbr>
              )}
            </td>
            <td className="props__type" data-label="Type">
              {row.type}
            </td>
            <td className="props__default" data-label="Default">
              {row.default ?? '—'}
            </td>
            <td data-label="Description">{row.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
