import { openDB } from './openDB'

export async function countRecords(storeName: string, key: string): Promise<{ data: number | null, error: DOMException | null }> {
  const { db, error } = await openDB()
  if (!db) return { data: null, error }

  return new Promise((resolve) => {
    const store = db.transaction([storeName], 'readonly').objectStore(storeName)
    const request = store.count(key)
    Object.assign(request, {
      onsuccess: () => resolve({ data: request.result, error: null }),
      onerror: (error: DOMException) => resolve({ data: null, error }),
    })
  })
}
