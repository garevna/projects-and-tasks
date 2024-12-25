import { isKeyOf } from './isKeyOf'

export function validateProp<T extends object, K extends keyof T>(data: T, key: K): key is K {
  if (data === null || typeof data !== 'object') return false
  if (!isKeyOf(data, key)) return false
  return true
}
