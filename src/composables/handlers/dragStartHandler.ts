let dragStart = false

export function dragStartHandler(value?: boolean) {
  if (typeof value === 'boolean') {
    dragStart = value
  }
  return dragStart
}
