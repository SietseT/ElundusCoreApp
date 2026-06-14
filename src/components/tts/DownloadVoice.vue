<script setup>
import { ref } from 'vue'
import { invoke } from '@tauri-apps/api/core'
import { DownloadIcon } from '@lucide/vue'
import Button from '../ui/Button.vue'

const props = defineProps({
  src: { type: String, required: true },
})

const downloading = ref(false)

async function handleDownload() {
  if (downloading.value) return
  downloading.value = true
  try {
    const bytes = await invoke('download_speech', { url: props.src })
    const blob = new Blob([new Uint8Array(bytes)], { type: 'audio/mpeg' })
    const blobUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = 'tts.mp3'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(blobUrl)
  } catch (err) {
    console.error('[download_speech] error:', err)
  } finally {
    downloading.value = false
  }
}
</script>

<template>
  <Button variant="outline" :disabled="downloading" class="w-full" @click="handleDownload">
    <DownloadIcon class="h-4 w-4 mr-2" />
    {{ downloading ? 'Downloading...' : 'Download MP3' }}
  </Button>
</template>
