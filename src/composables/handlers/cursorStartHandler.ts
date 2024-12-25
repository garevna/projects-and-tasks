let cursorStart = 0

export function cursorStartHandler(value?: number | undefined) {
  if (typeof value === 'number') {
    cursorStart = value
  }
  return cursorStart
}
