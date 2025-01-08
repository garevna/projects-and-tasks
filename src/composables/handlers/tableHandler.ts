import { beforeUnmount } from '@/utils/resize-directive'
import { updateResizeBars } from '../updateResizeBars'
import { dragStartHandler } from './dragStartHandler'
import { tableHeaderCellsHandler } from './tableHeaderCellsHandler'

let table: HTMLTableElement | null | undefined = null

const config = { attributes: true, childList: true, subtree: true }

const mutationObserverCallback = (mutationList: MutationRecord[]) => {
  const tableChanged: HTMLTableElement | null | undefined = mutationList.find(
    (mutation) => mutation.type === 'attributes' && mutation.attributeName === 'id',
  )?.target as HTMLTableElement
  if (tableChanged) {
    tableHeaderCellsHandler(table)
  }

  if (!dragStartHandler()) updateResizeBars()
}

export function tableHandler(sourceTable?: HTMLTableElement | null) {
  if (sourceTable) {
    table = sourceTable
    Object.assign(table.style, {
      tableLayout: 'fixed',
      borderCollapse: 'collapse',
    })
    table.addEventListener('before-unmount', beforeUnmount)
    const observer = new MutationObserver(mutationObserverCallback)
    observer.observe(table, config)
  }

  return table
}
