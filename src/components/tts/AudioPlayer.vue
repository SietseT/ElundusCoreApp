<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
})

const playing = ref(false)
const currentDurationString = ref('-:--')
const progressBarWidth = ref(0)

let audio = null

onMounted(() => {
  audio = new Audio()
  audio.addEventListener('playing', () => { playing.value = true })
  audio.addEventListener('ended', () => {
    playing.value = false
    progressBarWidth.value = 100
  })
  audio.addEventListener('timeupdate', onProgress)

  if (props.src) {
    loadAndPlay(props.src)
  }
})

onUnmounted(() => {
  if (audio) {
    audio.pause()
    audio.src = ''
  }
})

watch(() => props.src, (newSrc) => {
  if (newSrc) loadAndPlay(newSrc)
})

function loadAndPlay(src) {
  audio.src = src
  audio.currentTime = 0
  progressBarWidth.value = 0
  currentDurationString.value = '-:--'
  audio.play()
}

function onProgress() {
  if (!audio || !audio.duration) return
  progressBarWidth.value = (audio.currentTime / audio.duration) * 100
  currentDurationString.value = formatTime(audio.currentTime)
  playing.value = audio.currentTime < audio.duration
}

function togglePlay() {
  if (!audio) return
  if (playing.value) {
    audio.pause()
    playing.value = false
  } else {
    audio.play()
    playing.value = true
  }
}

function formatTime(num) {
  const seconds = Math.round(num)
  const minutes = Math.floor(seconds / 60)
  return `${minutes}:${String(seconds % 60).padStart(2, '0')}`
}
</script>

<template>
  <div class="audio-player">
    <div class="timeline">
      <div class="progress" :style="{ width: progressBarWidth + '%' }" />
    </div>
    <div class="controls">
      <div class="play-container">
        <div
          :class="['toggle-play', playing ? 'pause' : 'play']"
          @click="togglePlay"
        />
      </div>
      <div class="time">
        <div class="current">{{ currentDurationString }}</div>
      </div>
    </div>
  </div>
</template>
