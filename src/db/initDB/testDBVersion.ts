import { dbName, dbVersionHandler, upgradeDB, correctVersionNumber } from './'

import './initDemo'

export const testDBVersion = () =>
  new Promise((resolve) =>
    Object.assign(indexedDB.open(dbName), {
      onupgradeneeded: (event: IDBVersionChangeEvent) => {
        if (!event || !event.target) return
        const request = event.target as IDBOpenDBRequest
        const { result: db } = request

        upgradeDB(db)

        resolve({ status: 200 })
      },

      onsuccess: (event: Event) => {
        const target = event.target as IDBOpenDBRequest
        const { result: db } = target

        correctVersionNumber(db)

        db.close()

        resolve({ status: 200, result: { version: dbVersionHandler() } })
      },

      onerror: (event: Event) => {
        const { error } = event.target as IDBOpenDBRequest
        console.warn({
          errorTarget: 'TEST DB VERSION',
          errorName: error?.name,
          message: error?.message,
          version: dbVersionHandler(),
        })

        resolve({ status: 500, result: error?.message || 'Open DB error.' })
      },
    }),
  )
