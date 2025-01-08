import { openDB } from './openDB'

export const getLastKey = (
  storeName: string,
): Promise<{ data: IDBValidKey | null | undefined; error: DOMException | null }> =>
  new Promise((resolve) => {
    openDB().then((response) => {
      const { db, error } = response
      if (!db) {
        resolve({ data: null, error })
        return
      }
      const store = db.transaction([storeName]).objectStore(storeName)
      const request = store.getAllKeys()
      Object.assign(request, {
        onsuccess: () =>
          resolve({
            data: request.result ? request.result.pop() : null,
            error: new DOMException(`The data was not found in db store ${storeName}`),
          }),
        onerror: (error: DOMException) => resolve({ data: null, error }),
      })
    })
  })
