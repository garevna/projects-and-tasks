import { openDB } from './openDB'

export async function putRecords<T>(
  storeName: string,
  records: Array<T>,
): Promise<{ data: Array<T> | null; error: DOMException | null }> {
  return new Promise(async (resolve) => {
    const { db, error } = await openDB()
    if (!db) {
      resolve({ data: null, error })
    } else {
      const transaction: IDBTransaction = Object.assign(db.transaction([storeName], 'readwrite'), {
        oncomplete: () => resolve({ data: records, error: null }),
        onerror: (error: DOMException) => resolve({ data: null, error }),
      })

      records.forEach((record) => transaction.objectStore(storeName).put(record))
    }
  })
}
