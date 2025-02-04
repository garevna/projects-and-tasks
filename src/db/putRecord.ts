import { openDB } from './openDB'

export async function putRecord<T>(
  storeName: string,
  payload: T,
): Promise<{ data: T | null; error: DOMException | null }> {
  return new Promise(async (resolve) => {
    const { db, error } = await openDB()
    if (!db) {
      resolve({ data: null, error })
      return
    }

    const store = db?.transaction([storeName], 'readwrite').objectStore(storeName)
    if (!store) {
      resolve({
        data: null,
        error: new DOMException(`Store ${storeName} does not exist or has been damaged.`),
      })
    } else {
      const request: IDBRequest = store.put(payload)
      Object.assign(request, {
        onsuccess: () => resolve({ data: request.result, error: null }),
        onerror: (error: DOMException) => resolve({ data: null, error }),
      })
    }
  })
}
