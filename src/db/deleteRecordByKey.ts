import { openDB } from './openDB'

export const deleteRecordByKey = async (storeName: string, recordKey: string) => {
  const { status, result: db } = await openDB()
  if (status !== 200 || !db) return { status, result: null }

  return new Promise((resolve) => {
    const store = db.transaction([storeName], 'readwrite').objectStore(storeName)
    const request = store.delete(recordKey)
    Object.assign(request, {
      onsuccess: () => resolve({ status: 200, result: null, error: null }),
      onerror: (error: DOMException) => resolve({ status: 400, result: null, error }),
    })
  })
}
