import { tableHeaderCellsHandler, tableContainerHandler, tableHandler } from './handlers'
import { mouseDownCallback } from './mouseDownCallback'
import { mouseUpCallback } from './mouseUpCallback'

let resizeBars: Array<HTMLDivElement> | null = null

export function createResizeBars() {
  const [table, tableContainer, tableHeaderCells] = [
    tableHandler(),
    tableContainerHandler(),
    tableHeaderCellsHandler(),
  ]

  if (!table || !tableContainer || !tableHeaderCells) return null

  resizeBars = []
  let offsetLeft = table.offsetLeft || 0
  let index = 0

  for (const cell of tableHeaderCells) {
    const bar: HTMLDivElement = tableContainer.appendChild(document.createElement('div'))
    bar.setAttribute('data-resizecol', (index++).toString())
    offsetLeft = offsetLeft + cell.offsetWidth
    Object.assign(bar.style, {
      position: 'absolute',
      top: `${table.offsetTop || 0}px`,
      width: '8px',
      background: 'transparent',
      left: `${offsetLeft - 3}px`,
      cursor: 'col-resize',
      height: `${cell.offsetHeight || 0}px`,
    })

    bar.onmousedown = mouseDownCallback
    bar.onmouseup = mouseUpCallback

    resizeBars.push(bar)
  }

  return resizeBars
}
