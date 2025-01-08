import { openDB } from './openDB'

export async function getRecord(
  storeName: string,
  recordId: string,
): Promise<{ data: [] | null; error: DOMException | null }> {
  const { db, error } = await openDB()
  if (!db) return { data: [], error }

  const store = db.transaction([storeName], 'readwrite').objectStore(storeName)

  return new Promise((resolve) => {
    const request: IDBRequest = store.get(recordId)
    Object.assign(request, {
      onsuccess: () => {
        console.log(request.result)
        resolve({
          data: request.result,
          error: request.result
            ? null
            : new DOMException(`The data ${recordId} not found in db store ${storeName}`),
        })
      },
      onerror: (error: DOMException) => resolve({ data: null, error }),
    })
  })
}
