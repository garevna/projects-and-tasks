export function updateOrder<T extends { chain: { [key: string]: number }; order: number }>(
  records: Array<T>,
  subroute: string,
): void {
  records.forEach((record: T) => {
    if (!record.chain) {
      Object.assign(record, { chain: {} })
    }
    Object.assign(record.chain, { [subroute]: record.order })
  })
}
