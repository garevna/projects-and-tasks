/* eslint-disable @typescript-eslint/no-explicit-any */

export function updateObjectProp<T>(object: T, key: keyof T, value: any): void {
  if (!object) return
  object[key] = value
}
