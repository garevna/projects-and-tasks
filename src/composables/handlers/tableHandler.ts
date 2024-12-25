import { beforeUnmount } from '@/utils/resize-directive'
import { updateResizeBars } from '../updateResizeBars'
import { dragStartHandler } from './dragStartHandler'

let table: HTMLTableElement | null | undefined = null

const config = { attributes: true, childList: true, subtree: true }

const mutationObserverCallback = (mutationList: MutationRecord[]) => {
  const tableMutation = mutationList.find((mutation) => mutation.target instanceof HTMLTableElement)
  if (!tableMutation) return

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
