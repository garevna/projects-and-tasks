import { dbName } from './db-configs'
import { dbVersionHandler, upgradeNeededEventHandler } from './initDB'

export function openDB(): Promise<{ db: IDBDatabase | null; error: DOMException | null }> {
  return new Promise((resolve) => {
    const request = indexedDB.open(dbName, dbVersionHandler())

    Object.assign(request, {
      onversionchange: (event: IDBVersionChangeEvent) => {
        console.warn({
          message: 'OPEN DB: version change event',
          oldVersion: event.oldVersion,
          newVersion: event.newVersion,
        })

        resolve({ db: request.result, error: null })
      },

      onblocked: () => {
        resolve({ db: null, error: new DOMException('Failed to open DB. Blocked.') })
      },

      onupgradeneeded: upgradeNeededEventHandler,

      onsuccess: () => {
        resolve({ db: request.result, error: null })
      },

      onerror: () => {
        console.error({
          errorType: 'OPEN DB ERROR',
          errorName: `${request.error?.name}: DB ver ${dbVersionHandler()}`,
          errorMessage: request.error?.message,
        })
        resolve({ db: null, error: request.error || new DOMException('Failed to open DB.') })
      },
    })
  })
}
