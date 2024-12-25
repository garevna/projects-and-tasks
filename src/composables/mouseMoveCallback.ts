import {
  tableHandler,
  activeResizeBarHandler,
  currentHandler,
  nextHandler,
  dragStartHandler,
  cursorStartHandler,
} from './handlers'

export function mouseMoveCallback(event: MouseEvent) {
  const [table, current, next, activeResizeBar, dragStart, cursorStart] = [
    tableHandler(),
    currentHandler(),
    nextHandler(),
    activeResizeBarHandler(),
    dragStartHandler(),
    cursorStartHandler(),
  ]

  if (!current || !activeResizeBar || !table) return

  if (dragStart) {
    let mouseMoved = event.pageX - cursorStart

    if (mouseMoved < 0) {
      if (current.offsetWidth - mouseMoved < 48) {
        mouseMoved = -(current.offsetWidth - 48)
      }
    } else {
      if (next && next.offsetWidth - mouseMoved < 48) {
        mouseMoved = next.offsetWidth - 48
      }
    }

    cursorStartHandler(event.pageX)

    current.style.width = current.offsetWidth + mouseMoved + 'px'

    if (next) {
      next.style.width = next.offsetWidth - mouseMoved + 'px'
    } else {
      table.style.width = table.offsetWidth + mouseMoved + 'px'
    }

    activeResizeBar.style.left = activeResizeBar.offsetLeft + mouseMoved + 'px'
  }
}
