import { openDB } from './openDB'

type Response = {
  data: string | null
  error: DOMException | null
}

export async function postRecord<T>(storeName: string, payload: T): Promise<Response> {
  const id = Date.now().toString()
  const record = Object.assign({}, payload, { id })

  return new Promise(async (resolve) => {
    const { db, error } = await openDB()
    if (!db) {
      resolve({ data: null, error })
      return
    }

    const store = db?.transaction([storeName], 'readwrite').objectStore(storeName)
    if (!store) {
      console.error(`Store ${storeName} does not exist or has been damaged.`)
      resolve({
        data: null,
        error: new DOMException(`Store ${storeName} does not exist or has been damaged.`),
      })
    } else {
      const request: IDBRequest = store.put(record)
      console.log(request)
      Object.assign(request, {
        onsuccess: () => {
          resolve({ data: request.result, error: null })
        },
        onerror: (error: DOMException) => {
          resolve({ data: null, error })
        },
      })
    }
  })
}
