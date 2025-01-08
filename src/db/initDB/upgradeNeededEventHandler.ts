import { upgradeDB } from '.'

export function upgradeNeededEventHandler(event: IDBVersionChangeEvent) {
  const request = event.target as IDBOpenDBRequest
  return new Promise((resolve) => {
    const db = request.result

    db.onerror = db.onabort = () =>
      resolve({
        status: 500,
        result: null,
        errorType: 'Open DB',
        errorMessage: request.error?.message,
      })

    db.onversionchange = () =>
      resolve({
        status: 100,
        result: db,
        message: true,
        messageType: 'Open DB',
        messageText: 'DB version changed. You should refresh the browser window',
      })

    upgradeDB(db)
  })
}
