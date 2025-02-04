import type { Performer, Project, Task } from '@/types'

export function updateRecords(
  records: Array<Project | Task | Performer>,
  refreshRecords:
    | ((data: Array<Project>) => void)
    | ((data: Array<Task>) => void)
    | ((data: Array<Performer>) => void),
  subroute: string,
) {
  // const key = subroute.startsWith('?') ? subroute.slice(1) : subroute

  records.forEach((record, index) => {
    if (!record.chain) {
      Object.assign(record, { chain: {} })
    }
    if (!record.chain[subroute]) {
      Object.assign(record.chain, {
        [subroute]: index + 1,
      })
    }
    Object.assign(record, { order: record.chain[subroute] })
  })

  const result = records.sort((a: Project | Task | Performer, b: Project | Task | Performer) =>
    a.order < b.order ? -1 : a.order > b.order ? 1 : 0,
  )

  refreshRecords(result as Project[] & Task[] & Performer[])
}
