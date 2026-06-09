<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { PlayIcon, PauseIcon } from '@lucide/vue'
import { invoke } from '@tauri-apps/api/core'

const props = defineProps({
    src: { type: String, required: true },
})

const playing = ref(false)
const progressBarWidth = ref(0)
const currentDurationString = ref('0:00')
const totalDurationString = ref('-:--')
const isLoading = ref(false)

const progressBarRef = ref(null)
let audio = null
let currentBlobUrl = null

onMounted(() => {
    audio = new Audio()
    audio.addEventListener('playing', () => { playing.value = true })
    audio.addEventListener('ended', () => { playing.value = false; progressBarWidth.value = 100 })
    audio.addEventListener('timeupdate', onProgress)
    audio.addEventListener('durationchange', () => {
        if (isFinite(audio.duration)) totalDurationString.value = formatTime(audio.duration)
    })
    if (props.src) loadAndPlay(props.src)
})

onUnmounted(() => {
    if (audio) { audio.pause(); audio.src = '' }
    revokeBlobUrl()
})

watch(() => props.src, (src) => { if (src) loadAndPlay(src) })

function revokeBlobUrl() {
    if (currentBlobUrl) { URL.revokeObjectURL(currentBlobUrl); currentBlobUrl = null }
}

async function loadAndPlay(src) {
    isLoading.value = true
    playing.value = false
    progressBarWidth.value = 0
    currentDurationString.value = '0:00'
    totalDurationString.value = '-:--'
    revokeBlobUrl()

    try {
        const bytes = await invoke('download_speech', { url: src })
        currentBlobUrl = URL.createObjectURL(new Blob([new Uint8Array(bytes)], { type: 'audio/mpeg' }))
        audio.src = currentBlobUrl
        audio.currentTime = 0
        audio.play()
    } catch (err) {
        console.error('[AudioPlayer] failed to load audio:', err)
    } finally {
        isLoading.value = false
    }
}

function onProgress() {
    if (!audio?.duration || !isFinite(audio.duration)) return
    progressBarWidth.value = (audio.currentTime / audio.duration) * 100
    currentDurationString.value = formatTime(audio.currentTime)
    playing.value = audio.currentTime < audio.duration
}

function togglePlay() {
    if (!audio || isLoading.value) return
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
    <div class="rounded-md border border-border bg-background overflow-hidden">
        <!-- Seekable progress bar -->
        <div ref="progressBarRef" class="h-1.5 bg-muted cursor-pointer" @click="seek">
            <div class="h-full bg-primary transition-none" :style="{ width: progressBarWidth + '%' }" />
        </div>
        <!-- Controls -->
        <div class="flex items-center gap-3 px-3 py-2">
            <button :aria-label="playing ? 'Pause' : 'Play'" :disabled="isLoading"
                class="text-foreground hover:text-primary disabled:opacity-40 transition-colors focus:outline-none"
                @click="togglePlay">
                <PauseIcon v-if="playing" class="h-4 w-4" />
                <PlayIcon v-else class="h-4 w-4" />
            </button>
            <span class="text-xs text-muted-foreground tabular-nums">
                {{ currentDurationString }} / {{ totalDurationString }}
            </span>
        </div>
    </div>
</template>
