import { storeNames, dbKeys } from '../db-configs'

import { dbVersionHandler } from './dbVersionHandler.ts'

export function correctVersionNumber(db: IDBDatabase) {
  for (const storeName of storeNames) {
    if (!db.objectStoreNames.contains(storeName)) {
      console.log('New store should be created: ', storeName)
      return dbVersionHandler(db.version + 1)
    }

    const store: IDBObjectStore = db.transaction([storeName], 'readwrite').objectStore(storeName)

    const storeIndexes: Array<string> = Array.from(store.indexNames)

    const stn = storeName as keyof typeof dbKeys

    const newIndexes = dbKeys[stn]

    for (const index of newIndexes) {
      if (!storeIndexes.includes(index)) {
        console.log(`New index ${index} should be added to store ${storeName}`)
        return dbVersionHandler(db.version + 1)
      }
    }

    return dbVersionHandler(db.version)
  }
}
