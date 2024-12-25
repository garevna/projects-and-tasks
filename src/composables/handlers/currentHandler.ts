import { tableHeaderCellsHandler } from './tableHeaderCellsHandler'

let current: HTMLElement | null = null

export function currentHandler(index?: number | null | undefined) {
  const tableHeaderCells = tableHeaderCellsHandler()
  if (!tableHeaderCells) return

  if (typeof index === 'number') {
    current = tableHeaderCells[index]
  } else {
    if (index === null) {
      current = null
    }
  }

  return current
}
