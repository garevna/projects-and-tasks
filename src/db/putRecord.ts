import { openDB } from './openDB'

export async function putRecord<T>(
  storeName: string,
  payload: T,
): Promise<{ result: T | null; error: DOMException | null }> {
  return new Promise(async (resolve) => {
    const { db, error } = await openDB()
    if (!db) {
      resolve({ result: null, error })
      return
    }

    const store = db?.transaction([storeName], 'readwrite').objectStore(storeName)
    if (!store) {
      resolve({
        result: null,
        error: new DOMException(`Store ${storeName} does not exist or has been damaged.`),
      })
    } else {
      const request: IDBRequest = store.put(payload)
      Object.assign(request, {
        onsuccess: () => resolve({ result: request.result, error: null }),
        onerror: (error: DOMException) => resolve({ result: null, error }),
      })
    }
  })
}
