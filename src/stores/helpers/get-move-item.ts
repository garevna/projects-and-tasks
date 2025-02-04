import type { Moved, Record } from '@/types'

export function getMoveItemMethod(records: Array<Record>) {
  return function (moved: { moved: Moved }, subroute: string) {
    const {
      moved: { oldIndex, newIndex },
    } = moved

    if (newIndex === oldIndex) return

    records.splice(newIndex, 1, records.splice(oldIndex, 1)[0])

    records.forEach((record, index) => {
      Object.assign(record, { order: index + 1 })
      if (!record.chain) {
        Object.assign(record, { chain: {} })
      }
      Object.assign(record.chain, { [subroute]: index + 1 })
    })
  }
}
