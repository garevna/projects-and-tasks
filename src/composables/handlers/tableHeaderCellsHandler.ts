// import { createResizeBars } from '@/composables/createResizeBars'
import { getPropValue } from '@/utils/getPropValue'
import { resizeBarsHandler } from './resizeBarsHandler'
import { getTableOptionsFromLocalStorage } from '../getTableOptionsFromLocalStorage'

let tableHeaderCells: NodeListOf<HTMLElement> | null

export function tableHeaderCellsHandler(table?: HTMLTableElement | null) {
  if (table) {
    tableHeaderCells = table.querySelectorAll('th')
    tableHeaderCells.forEach((cell) => Object.assign(cell.style, { maxWidth: 'unset' }))

    const id = table.id || 'table-columns-width'

    const columns = getTableOptionsFromLocalStorage(id)

    if (columns) {
      tableHeaderCells.forEach((cell) => {
        const key = getPropValue(cell, 'innerText') as keyof typeof columns
        if (typeof key === 'string') {
          const value = getPropValue(columns, key)
          Object.assign(cell.style, { width: value + 'px' })
        }
      })

      resizeBarsHandler(true)
    }
  }
  return tableHeaderCells
}
