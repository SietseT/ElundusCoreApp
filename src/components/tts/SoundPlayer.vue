<script setup>
import { useTtsStore } from '../../stores/tts'
import Card from '../ui/Card.vue'
import CardHeader from '../ui/CardHeader.vue'
import CardContent from '../ui/CardContent.vue'
import AudioPlayer from './AudioPlayer.vue'
import DownloadVoice from './DownloadVoice.vue'

const store = useTtsStore()
</script>

<template>
  <Card v-if="store.voiceBlobUrl" class="border-primary/20">
    <CardHeader>
      <h3 class="text-base font-semibold">Generated speech</h3>
      <p class="text-xs text-muted-foreground mt-1">
        Voice: {{ store.voice }} • Text: "{{ store.text.slice(0, 50) }}{{
          store.text.length > 50 ? '...' : ''
        }}"
      </p>
    </CardHeader>
    <CardContent class="flex flex-col gap-3">
      <AudioPlayer :src="store.voiceBlobUrl" />
      <DownloadVoice :src="store.voiceBlobUrl" />
    </CardContent>
  </Card>
</template>
