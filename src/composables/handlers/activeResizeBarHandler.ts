let activeResizeBar: HTMLDivElement | null = null

export function activeResizeBarHandler(data?: HTMLDivElement | null | undefined) {
  if (data) {
    activeResizeBar = data
  }
  return activeResizeBar
}
