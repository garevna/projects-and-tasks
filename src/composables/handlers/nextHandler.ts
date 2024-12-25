import { tableHeaderCellsHandler } from './tableHeaderCellsHandler'

let next: HTMLElement | null = null

export function nextHandler(index?: number | null | undefined) {
  const tableHeaderCells = tableHeaderCellsHandler()
  if (!tableHeaderCells) return

  if (typeof index === 'number') {
    next = tableHeaderCells[index]
  } else {
    if (index === null) {
      next = null
    }
  }

  return next
}
