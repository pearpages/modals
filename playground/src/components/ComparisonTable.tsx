import type { ReactNode } from 'react'

export type ComparisonColumn = {
  key: string
  label: string
}

export type ComparisonRow = {
  key: string
  /** The row for this library, drawn so it stands out from the others. */
  self?: boolean
  cells: Record<string, ReactNode>
}

export type ComparisonTableProps = {
  columns: ComparisonColumn[]
  rows: ComparisonRow[]
  caption?: string
}

/**
 * A free-form table. PropsTable has fixed columns; this one takes its columns
 * as data. Every cell carries a data-label so the phone layout, which stacks
 * cells into a definition list, can name them.
 */
export function ComparisonTable({ columns, rows, caption }: ComparisonTableProps) {
  const [first, ...rest] = columns
  return (
    <div className="compare-wrap">
      <table className="compare">
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key} className={row.self ? 'compare__row compare__row--self' : 'compare__row'}>
              <th scope="row" className="compare__name" data-label={first.label}>
                {row.cells[first.key]}
              </th>
              {rest.map((column) => (
                <td key={column.key} data-label={column.label}>
                  {row.cells[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
