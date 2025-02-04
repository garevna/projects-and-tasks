import { openDB } from './openDB'

export async function getRecordsByKey(
  storeName: string,
  indexName: string,
  indexValue: string,
): Promise<{ data: [] | null; error: DOMException | null }> {
  const { db, error } = await openDB()
  if (!db) return { data: [], error }

  const store = db.transaction([storeName], 'readwrite').objectStore(storeName)
  const index = store.index(indexName)

  return new Promise((resolve) => {
    const request: IDBRequest = index.getAll(IDBKeyRange.only(indexValue))
    Object.assign(request, {
      onsuccess: () => {
        resolve({
          data: request.result,
          error: request.result
            ? null
            : new DOMException(
                `The data ${indexName} = ${indexValue} not found in db store ${storeName}`,
              ),
        })
      },
      onerror: (error: DOMException) => resolve({ data: null, error }),
    })
  })
}
