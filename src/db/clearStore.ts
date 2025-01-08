import { openDB } from './openDB.ts'
import type { OpenDBResponse, clearStoreResponse } from './types'

export const clearStore = (storeName: string): Promise<clearStoreResponse> =>
  new Promise(async (resolve) => {
    const { status, result: db, error } = (await openDB()) as OpenDBResponse
    if (status !== 200 || !db) {
      return { status, result: null, error }
    }

    const store = db.transaction([storeName], 'readwrite').objectStore(storeName)
    Object.assign(store.clear, {
      onsuccess: () => {
        resolve({ status: 200, result: store, error: null })
      },

      onerror: (event: DOMException) => {
        resolve({ status: 500, result: null, error: event })
      },
    })
  })
