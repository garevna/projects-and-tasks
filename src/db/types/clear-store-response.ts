export type clearStoreResponse = {
  status: number
  result: IDBObjectStore | null
  error: DOMException | null
}
