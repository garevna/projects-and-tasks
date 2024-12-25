import {
  tableHandler,
  tableContainerHandler,
  tableHeaderCellsHandler,
} from '@/composables/handlers'

const observerOptions = {
  attributes: false,
  childList: true,
  subtree: false,
}

function mutationsCallback(mutations: MutationRecord[]): void {
  const mutation: MutationRecord | undefined = mutations.find(
    (mutation) => mutation.target.nodeName === 'TABLE',
  )
  if (mutation) {
    const table = mutation.target as HTMLTableElement
    tableContainerHandler(table)
    tableHeaderCellsHandler(table)
  }
}

const observer = new MutationObserver(mutationsCallback)

export function resizeDirectiveCallback(sourceTable: HTMLTableElement) {
  if (!sourceTable || !sourceTable.parentElement) return

  const table = tableHandler(sourceTable) as HTMLTableElement
  observer.observe(table, observerOptions)
  tableContainerHandler(table)
  tableHeaderCellsHandler(table)
}
