import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  clearEntries,
  deleteEntries,
  loadEntries,
  putEntry,
  type HistoryEntry,
} from '../lib/historyDb'

export type { HistoryEntry }

const HISTORY_LIMIT = 20

export const useTtsStore = defineStore('tts', () => {
  const current = ref<HistoryEntry | null>(null)
  const history = ref<HistoryEntry[]>([])
  const error = ref<null | { error: string; message: string }>(null)
  const rateLimitedUntil = ref(0)

  async function loadHistory() {
    history.value = await loadEntries()
  }

  async function addResult(voice: string, text: string, audio: ArrayBuffer) {
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      text,
      voice,
      createdAt: Date.now(),
      audio,
    }
    current.value = entry
    error.value = null

    const overflow = history.value.slice(HISTORY_LIMIT - 1)
    history.value = [entry, ...history.value.slice(0, HISTORY_LIMIT - 1)]
    await putEntry(entry)
    await deleteEntries(overflow.map(e => e.id))
  }

  function select(id: string) {
    const entry = history.value.find(e => e.id === id)
    if (entry) {
      current.value = entry
      error.value = null
    }
  }

  async function remove(id: string) {
    history.value = history.value.filter(e => e.id !== id)
    if (current.value?.id === id) current.value = null
    await deleteEntries([id])
  }

  async function clearHistory() {
    history.value = []
    current.value = null
    await clearEntries()
  }

  function setError(err: { error: string; message: string }) {
    error.value = err
    current.value = null
  }

  function setRateLimited(seconds: number) {
    rateLimitedUntil.value = Date.now() + seconds * 1000
  }

  return {
    current,
    history,
    error,
    rateLimitedUntil,
    loadHistory,
    addResult,
    select,
    remove,
    clearHistory,
    setError,
    setRateLimited,
  }
})
