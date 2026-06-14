<script setup>
import { computed } from 'vue'
import { useTtsStore } from '../../stores/tts'
import Alert from '../ui/Alert.vue'

const store = useTtsStore()

const title = computed(() => store.error?.error ?? '')
const message = computed(() => {
  if (!store.error) return ''
  return store.error.details?.[0]?.message ?? store.error.message ?? ''
})
</script>

<template>
  <Alert v-if="store.error" variant="destructive" class="shadow-md">
    <div class="flex items-start gap-3">
      <div class="flex-1">
        <p class="font-semibold text-sm">{{ title }}</p>
        <p class="text-sm mt-1 opacity-90">{{ message }}</p>
      </div>
    </div>
  </Alert>
</template>
