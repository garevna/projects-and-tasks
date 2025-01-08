import {
  tableHandler,
  activeResizeBarHandler,
  dragStartHandler,
  currentHandler,
  nextHandler,
} from './handlers'

import { updateResizeBars } from './updateResizeBars'
import { mouseMoveCallback } from './mouseMoveCallback'

export function mouseUpCallback() {
  const [table, dragStart, activeResizeBar] = [
    tableHandler(),
    dragStartHandler(),
    activeResizeBarHandler(),
  ]

  updateResizeBars()

  if (dragStart && table && activeResizeBar) {
    document.body.removeEventListener('mousemove', mouseMoveCallback)
    dragStartHandler(false)
    table.style.userSelect = 'auto'

    activeResizeBarHandler(null)
    currentHandler(null)
    nextHandler(null)
  }
}
