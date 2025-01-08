import { storeNames, dbKeys } from '../db-configs'

export function upgradeDB(db: IDBDatabase) {
  const objectStoreNames = Array.from(db.objectStoreNames)
  for (const storeName of storeNames) {
    if (objectStoreNames.includes(storeName)) db.deleteObjectStore(storeName)

    const store = db.createObjectStore(storeName, { keyPath: 'id' })

    const stn = storeName as keyof typeof dbKeys

    const storeIndexes = dbKeys[stn]

    if (storeIndexes) {
      storeIndexes.forEach((key) => {
        store.createIndex(key, key, { multiEntry: true })
      })
    }
  }
}
