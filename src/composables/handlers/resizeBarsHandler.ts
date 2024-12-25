import { createResizeBars } from '@/composables/createResizeBars'

let resizeBars: Array<HTMLDivElement> | null | undefined = null

export function resizeBarsHandler(arg?: string | number | boolean) {
  if (!resizeBars || arg) {
    resizeBars = createResizeBars()
  }
  return resizeBars
}
