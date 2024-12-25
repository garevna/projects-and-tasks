import {
  tableHandler,
  tableHeaderCellsHandler,
  activeResizeBarHandler,
  currentHandler,
  nextHandler,
  dragStartHandler,
  cursorStartHandler,
} from './handlers'

import { mouseMoveCallback } from './mouseMoveCallback.ts'
import { mouseUpCallback } from './mouseUpCallback.ts'

export function mouseDownCallback(event: MouseEvent) {
  const [table, tableHeaderCells] = [tableHandler(), tableHeaderCellsHandler()]
  if (!table || !tableHeaderCells) return

  table.style.userSelect = 'none'

  const activeResizeBar = activeResizeBarHandler(event.target as HTMLDivElement)

  if (!activeResizeBar) return

  const index = parseInt(activeResizeBar.getAttribute('data-resizecol') || '-1')
  if (index === -1) return

  currentHandler(index)
  nextHandler(index + 1)

  dragStartHandler(true)

  document.body.addEventListener('mousemove', mouseMoveCallback)

  activeResizeBar.onmouseup = mouseUpCallback

  cursorStartHandler(event.pageX)
}
