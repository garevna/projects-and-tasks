import { tableHeaderCellsHandler, resizeBarsHandler, tableHandler } from '@/composables/handlers'
import { buildObject } from '@/utils/buildObject'

export function updateResizeBars() {
  const [table, tableHeaderCells, resizeBars] = [
    tableHandler(),
    tableHeaderCellsHandler(),
    resizeBarsHandler(),
  ]

  if (!table || !tableHeaderCells || !resizeBars) return

  let offsetLeft = table.offsetLeft || 0
  let index = 0
  for (const cell of tableHeaderCells) {
    const bar = resizeBars[index++]
    offsetLeft += cell.offsetWidth
    Object.assign(bar.style, {
      height: cell.offsetHeight + 'px',
      left: offsetLeft - 3 + 'px',
    })
  }

  localStorage.setItem(
    table.id || 'table-columns-width',
    JSON.stringify(
      Array.from(tableHeaderCells)
        .map((cell: HTMLElement) => buildObject(cell, 'innerText', cell.offsetWidth))
        .reduce((res, object) => Object.assign(res, object), {}),
    ),
  )
}
