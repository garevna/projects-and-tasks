import { tableContainerHandler, resizeBarsHandler, tableHandler } from '@/composables/handlers'

export function beforeUnmount() {
  const table = tableHandler()
  const resizeBars = resizeBarsHandler()
  const tableContainer = tableContainerHandler()

  if (!table || !resizeBars || !tableContainer) return

  table.removeEventListener('clear-all', beforeUnmount)
  resizeBars.forEach((bar) => bar.remove())
}
