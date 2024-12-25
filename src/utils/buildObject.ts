import { getPropValue } from './getPropValue'

/* eslint-disable @typescript-eslint/no-explicit-any */

export function buildObject<T extends object, K extends keyof T>(
  object: T,
  propName: K,
  value: any,
): any {
  if (object === null) return null
  const key: string = getPropValue(object, propName) as string
  return { [key]: value }
}
