export function* statusValuesGenerator<T>(obj: T) {
  for (const propName in obj) {
    if (!Number.isNaN(parseInt(propName))) yield obj[propName]
  }
}
