<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { Trash2Icon, XIcon } from '@lucide/vue'
import { useTtsStore } from '../../stores/tts'
import Card from '../ui/Card.vue'
import CardHeader from '../ui/CardHeader.vue'
import CardContent from '../ui/CardContent.vue'

const store = useTtsStore()

onMounted(() => store.loadHistory())

const timeFormat = new Intl.DateTimeFormat(undefined, { dateStyle: 'short', timeStyle: 'short' })

// Two-step clear: first click arms it, second click within 3s confirms.
const confirmingClear = ref(false)
let confirmTimer = null

function clearAll() {
  if (confirmingClear.value) {
    clearTimeout(confirmTimer)
    confirmingClear.value = false
    store.clearHistory()
    return
  }
  confirmingClear.value = true
  confirmTimer = setTimeout(() => (confirmingClear.value = false), 3000)
}

onUnmounted(() => clearTimeout(confirmTimer))
</script>

<template>
  <Card v-if="store.history.length">
    <CardHeader class="flex-row items-center justify-between space-y-0">
      <div>
        <h3 class="text-base font-semibold">History</h3>
        <p class="text-xs text-muted-foreground mt-1">Replay without generating again</p>
      </div>
      <button
        class="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
        :class="{ 'text-red-500 hover:text-red-500': confirmingClear }"
        @click="clearAll"
      >
        <Trash2Icon class="h-3.5 w-3.5" /> {{ confirmingClear ? 'Click again to clear' : 'Clear' }}
      </button>
    </CardHeader>
    <CardContent>
      <ul class="flex flex-col gap-1 max-h-80 overflow-y-auto -mx-2">
        <li v-for="entry in store.history" :key="entry.id" class="group flex items-center gap-1">
          <button
            class="flex-1 min-w-0 text-left rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer transition-colors"
            :class="{ 'bg-accent': store.current?.id === entry.id }"
            :title="entry.text"
            @click="store.select(entry.id)"
          >
            <p class="text-sm truncate">{{ entry.text }}</p>
            <p class="text-xs text-muted-foreground">
              {{ entry.voice }} • {{ timeFormat.format(entry.createdAt) }}
            </p>
          </button>
          <button
            class="shrink-0 p-1.5 rounded-md text-muted-foreground opacity-0 group-hover:opacity-100 focus:opacity-100 hover:text-foreground hover:bg-accent cursor-pointer transition-opacity"
            aria-label="Remove from history"
            @click="store.remove(entry.id)"
          >
            <XIcon class="h-3.5 w-3.5" />
          </button>
        </li>
      </ul>
    </CardContent>
  </Card>
</template>
