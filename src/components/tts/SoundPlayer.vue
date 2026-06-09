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
  <Card v-if="store.voiceBlobUrl">
    <CardHeader>
      <h3 class="text-sm font-semibold text-card-foreground">Result</h3>
    </CardHeader>
    <CardContent class="flex flex-col gap-3">
      <AudioPlayer :src="store.voiceBlobUrl" />
      <DownloadVoice :src="store.voiceBlobUrl" />
    </CardContent>
  </Card>
</template>
