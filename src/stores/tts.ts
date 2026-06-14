import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTtsStore = defineStore('tts', () => {
  const voiceBlobUrl = ref('')
  const voiceBlob = ref<null | Blob>(null)
  const text = ref('')
  const voice = ref('')
  const error = ref<null | { error: string; message: string }>(null)

  function setResult(speakUrl: string, blob: Blob, voiceVal: string, textVal: string) {
    voiceBlobUrl.value = speakUrl
    voiceBlob.value = blob
    voice.value = voiceVal
    text.value = textVal
    error.value = null
  }

  function setError(err: { error: string; message: string }) {
    error.value = err
    voiceBlobUrl.value = ''
    voiceBlob.value = null
  }

  return { voiceBlobUrl, voiceBlob, text, voice, error, setResult, setError }
})
