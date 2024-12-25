import { resizeBarsHandler } from './resizeBarsHandler'

let tableContainer: HTMLDivElement | null = null

export function tableContainerHandler(table?: HTMLTableElement | null | undefined) {
  if (table instanceof HTMLTableElement) {
    tableContainer = table.parentElement as HTMLDivElement
    Object.assign(tableContainer.style, {
      position: 'relative',
      tableLayout: 'fixed',
    })

    resizeBarsHandler(true)
  }
  return tableContainer
}
