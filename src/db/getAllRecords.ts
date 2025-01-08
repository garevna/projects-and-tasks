import { openDB } from './openDB'

export function getAllRecords<T>(
  storeName: string,
): Promise<{ data: Array<T> | null; error: DOMException | null }> {
  return new Promise(async (resolve) => {
    const { db, error } = await openDB()
    if (!db) {
      resolve({ data: null, error })
      return
    }

    const store = db.transaction([storeName]).objectStore(storeName)
    const request = store.getAll()
    Object.assign(request, {
      onsuccess: () =>
        resolve({
          data: request.result as Array<T>,
          error: new DOMException(`The data was not found in db store ${storeName}`),
        }),
      onerror: (error: DOMException) => resolve({ data: null, error }),
    })
  })
}
