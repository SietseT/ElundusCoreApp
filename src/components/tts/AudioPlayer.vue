<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { PlayIcon, PauseIcon } from '@lucide/vue'

const props = defineProps({
  // Raw MP3 bytes. The parent re-keys this component per entry, so it mounts once per clip.
  bytes: { type: ArrayBuffer, required: true },
})

const playing = ref(false)
const progressBarWidth = ref(0)
const currentDurationString = ref('0:00')
const totalDurationString = ref('-:--')

const progressBarRef = ref(null)
let audio = null
let currentBlobUrl = null

onMounted(() => {
  audio = new Audio()
  audio.addEventListener('playing', () => {
    playing.value = true
  })
  audio.addEventListener('ended', () => {
    playing.value = false
    progressBarWidth.value = 100
  })
  audio.addEventListener('timeupdate', onProgress)
  audio.addEventListener('durationchange', () => {
    if (isFinite(audio.duration)) totalDurationString.value = formatTime(audio.duration)
  })
  loadAndPlay(props.bytes)
})

onUnmounted(() => {
  if (audio) {
    audio.pause()
    audio.src = ''
  }
  revokeBlobUrl()
})

watch(
  () => props.bytes,
  bytes => loadAndPlay(bytes)
)

function revokeBlobUrl() {
  if (currentBlobUrl) {
    URL.revokeObjectURL(currentBlobUrl)
    currentBlobUrl = null
  }
}

function loadAndPlay(bytes) {
  playing.value = false
  progressBarWidth.value = 0
  currentDurationString.value = '0:00'
  totalDurationString.value = '-:--'
  revokeBlobUrl()

  currentBlobUrl = URL.createObjectURL(new Blob([bytes], { type: 'audio/mpeg' }))
  audio.src = currentBlobUrl
  audio.currentTime = 0
  audio.play().catch(err => console.error('[AudioPlayer] playback failed:', err))
}

function onProgress() {
  if (!audio?.duration || !isFinite(audio.duration)) return
  progressBarWidth.value = (audio.currentTime / audio.duration) * 100
  currentDurationString.value = formatTime(audio.currentTime)
  playing.value = audio.currentTime < audio.duration
}

function togglePlay() {
  if (!audio) return
  playing.value ? audio.pause() : audio.play()
  playing.value = !playing.value
}

function seek(e) {
  if (!audio?.duration || !isFinite(audio.duration) || !progressBarRef.value) return
  const { left, width } = progressBarRef.value.getBoundingClientRect()
  audio.currentTime = ((e.clientX - left) / width) * audio.duration
}

function formatTime(num) {
  if (!isFinite(num) || isNaN(num)) return '-:--'
  const s = Math.round(num)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}
</script>

<template>
  <div class="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
    <!-- Seekable progress bar -->
    <div ref="progressBarRef" class="h-2 bg-muted/50 cursor-pointer relative group" @click="seek">
      <div
        class="h-full bg-primary transition-all duration-100 ease-out relative"
        :style="{ width: progressBarWidth + '%' }"
      >
        <div
          class="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>
    </div>
    <!-- Controls -->
    <div class="flex items-center gap-3 px-4 py-3 bg-card">
      <button
        :aria-label="playing ? 'Pause' : 'Play'"
        class="h-8 w-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:hover:bg-primary transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer disabled:cursor-not-allowed"
        @click="togglePlay"
      >
        <PauseIcon v-if="playing" class="h-4 w-4" />
        <PlayIcon v-else class="h-4 w-4 ml-0.5" />
      </button>
      <div class="flex-1 flex items-center gap-2">
        <span class="text-xs font-medium text-foreground tabular-nums min-w-[2.5rem]">
          {{ currentDurationString }}
        </span>
        <span class="text-xs text-muted-foreground">/</span>
        <span class="text-xs text-muted-foreground tabular-nums">
          {{ totalDurationString }}
        </span>
      </div>
    </div>
  </div>
</template>
