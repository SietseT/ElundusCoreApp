<script setup>
import { ref } from 'vue'
import { invoke } from '@tauri-apps/api/core'

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
    <button :disabled="downloading"
        class="w-full inline-flex items-center justify-center rounded-md border border-primary text-primary font-medium px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground disabled:opacity-50 disabled:pointer-events-none transition-colors"
        @click="handleDownload">
        {{ downloading ? 'Downloading...' : 'Download' }}
    </button>
</template>