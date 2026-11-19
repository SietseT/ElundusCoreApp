// Small IndexedDB wrapper for persisting generated speech between sessions.
// Audio is stored as an ArrayBuffer (more reliable than Blob in WebKit's IndexedDB).
// Every call fails soft: if IndexedDB is unavailable, history simply isn't persisted.

export interface HistoryEntry {
  id: string
  text: string
  voice: string
  createdAt: number
  audio: ArrayBuffer
}

const DB_NAME = 'elundus-core'
const STORE = 'history'

let dbPromise: Promise<IDBDatabase> | null = null

function openDb(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1)
      req.onupgradeneeded = () => {
        req.result.createObjectStore(STORE, { keyPath: 'id' })
      }
      req.onsuccess = () => resolve(req.result)
      req.onerror = () => reject(req.error)
    })
    dbPromise.catch(() => {
      dbPromise = null
    })
  }
  return dbPromise
}

async function run<T>(
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => IDBRequest<T> | void
): Promise<T | undefined> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode)
    const req = fn(tx.objectStore(STORE))
    tx.oncomplete = () => resolve(req ? req.result : undefined)
    tx.onerror = () => reject(tx.error)
    tx.onabort = () => reject(tx.error)
  })
}

export async function loadEntries(): Promise<HistoryEntry[]> {
  try {
    const all = (await run<HistoryEntry[]>('readonly', s => s.getAll())) ?? []
    return all.sort((a, b) => b.createdAt - a.createdAt)
  } catch (err) {
    console.error('[history] load failed:', err)
    return []
  }
}

export async function putEntry(entry: HistoryEntry) {
  try {
    await run('readwrite', s => s.put(entry))
  } catch (err) {
    console.error('[history] save failed:', err)
  }
}

export async function deleteEntries(ids: string[]) {
  if (!ids.length) return
  try {
    await run('readwrite', s => {
      ids.forEach(id => s.delete(id))
    })
  } catch (err) {
    console.error('[history] delete failed:', err)
  }
}

export async function clearEntries() {
  try {
    await run('readwrite', s => s.clear())
  } catch (err) {
    console.error('[history] clear failed:', err)
  }
}
