import { validateProp } from './validateProp'

/* eslint-disable @typescript-eslint/no-explicit-any */

export function getPropValue<T extends object, K extends keyof T>(object: T, propName: K): any {
  if (!object || !validateProp(object, propName)) return null
  return object[propName]
}
