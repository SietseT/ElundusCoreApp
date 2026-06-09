import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTtsStore = defineStore('tts', () => {
  const voiceBlobUrl = ref('')
  const voiceBlob = ref(null)
  const text = ref('')
  const voice = ref('')
  const error = ref(null)

  function setResult(speakUrl, blob, voiceVal, textVal) {
    voiceBlobUrl.value = speakUrl
    voiceBlob.value = blob
    voice.value = voiceVal
    text.value = textVal
    error.value = null
  }

  function setError(err) {
    error.value = err
    voiceBlobUrl.value = ''
  }

  return { voiceBlobUrl, voiceBlob, text, voice, error, setResult, setError }
})
