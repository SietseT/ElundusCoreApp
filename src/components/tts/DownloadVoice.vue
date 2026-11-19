<script setup>
import { ref, watch } from 'vue'
import { invoke } from '@tauri-apps/api/core'
import { DownloadIcon, CheckIcon } from '@lucide/vue'
import Button from '../ui/Button.vue'
import { speechFileName } from '../../lib/fileName'

const props = defineProps({
  entry: { type: Object, required: true },
})

const saving = ref(false)
const saved = ref(false)
const errorMessage = ref('')

watch(
  () => props.entry.id,
  () => {
    saved.value = false
    errorMessage.value = ''
  }
)

async function handleDownload() {
  if (saving.value) return
  saving.value = true
  saved.value = false
  errorMessage.value = ''
  try {
    saved.value = await invoke('save_speech', {
      fileName: speechFileName(props.entry.voice, props.entry.text),
      bytes: Array.from(new Uint8Array(props.entry.audio)),
    })
  } catch (err) {
    console.error('[save_speech] error:', err)
    errorMessage.value = `Could not save the file: ${err}`
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <Button variant="outline" :disabled="saving" class="w-full" @click="handleDownload">
      <CheckIcon v-if="saved" class="h-4 w-4 mr-2" />
      <DownloadIcon v-else class="h-4 w-4 mr-2" />
      {{ saving ? 'Saving...' : saved ? 'Saved' : 'Download MP3' }}
    </Button>
    <p v-if="errorMessage" class="text-xs text-red-500">{{ errorMessage }}</p>
  </div>
</template>
